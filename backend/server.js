const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
app.use(cors());
app.use(express.json());

const SECRET = "expense_tracker_secret";
const client = new MongoClient("mongodb://127.0.0.1:27017");

let users, expenses, income;

/* ---------- DB CONNECT ---------- */
(async () => {
  await client.connect();
  const db = client.db("expenseDB");
  users = db.collection("users");
  expenses = db.collection("expenses");
  income = db.collection("income");
  console.log("MongoDB Connected");
})();

/* ---------- AUTH MIDDLEWARE ---------- */
function auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader)
    return res.status(401).json({ message: "Token missing" });

  // Expect: Bearer <token>
  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET);
    req.userId = new ObjectId(decoded.userId);
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid token" });
  }
}

/* ---------- REGISTER ---------- */
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await users.findOne({ email });
  if (existing)
    return res.status(400).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  await users.insertOne({
    name,
    email,
    password: hashedPassword
  });

  res.json({ message: "Registered successfully" });
});

/* ---------- LOGIN ---------- */
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await users.findOne({ email });
  if (!user)
    return res.status(401).json({ message: "Invalid email" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.status(401).json({ message: "Invalid password" });

  const token = jwt.sign(
    { userId: user._id },
    SECRET,
    { expiresIn: "2h" }
  );

  res.json({
    token,
    name: user.name
  });
});

/* ---------- EXPENSE ---------- */
app.post("/expense", auth, async (req, res) => {
  await expenses.insertOne({
    title: req.body.title,
    amount: Number(req.body.amount), // IMPORTANT
    date: req.body.date,
    userId: req.userId
  });

  res.json({ message: "Expense added" });
});

app.get("/expense", auth, async (req, res) => {
  const { from, to } = req.query;

  let filter = { userId: req.userId };

  if (from && to) {
    filter.date = { $gte: from, $lte: to };
  }

  const data = await expenses.find(filter).toArray();
  res.json(data);
});

/* ---------- INCOME ---------- */
app.post("/income", auth, async (req, res) => {
  await income.insertOne({
    amount: Number(req.body.amount), // IMPORTANT
    date: req.body.date,
    userId: req.userId
  });

  res.json({ message: "Income added" });
});

app.get("/income", auth, async (req, res) => {
  const data = await income.find({ userId: req.userId }).toArray();
  res.json(data);
});

/* ---------- DASHBOARD ---------- */
app.get("/dashboard", auth, async (req, res) => {
  const uid = req.userId;

  const exp = await expenses.aggregate([
    { $match: { userId: uid } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]).toArray();

  const inc = await income.aggregate([
    { $match: { userId: uid } },
    { $group: { _id: null, total: { $sum: "$amount" } } }
  ]).toArray();

  res.json({
    expense: exp[0]?.total || 0,
    income: inc[0]?.total || 0,
    balance: (inc[0]?.total || 0) - (exp[0]?.total || 0)
  });
});
app.delete("/expense/:id", auth, async (req, res) => {
  try {
    const result = await expenses.deleteOne({
      _id: new ObjectId(req.params.id),
      userId: req.userId
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Expense not found" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

/* ---------- SERVER ---------- */
app.listen(3000, () =>
  console.log("✅ Server running on http://localhost:3000")
);
