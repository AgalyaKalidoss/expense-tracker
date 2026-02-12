💼 Expense Tracker Web Application

A secure, full-stack expense tracking web application that allows users to manage income and expenses with real-time insights, interactive charts, and date-based filtering. Built with modern web technologies and JWT-based authentication.

🚀 Features

🔐 User Authentication (Register / Login / Logout)

👥 Multi-user expense isolation

➕ Add Income & Expenses

📊 Interactive Dashboard with weekly/monthly charts

📁 View, filter & delete expense records (date range)

💰 Automatic balance calculation

🌙 Dark-themed professional UI

🔔 Toast notifications (no alerts)

📱 Responsive design with Bootstrap

🛠️ Tech Stack

Frontend

HTML5, CSS3 (Custom + Bootstrap)

JavaScript (Axios, Chart.js)

Backend

Node.js

Express.js

JWT Authentication

bcrypt (Password Hashing)

Database

MongoDB (users, income, expenses collections)

📂 Folder Structure
expense-tracker/
│
├── backend/
│   ├── server.js
│   └── package.json
│
├── frontend/
│   ├── css/
│   ├── js/
│   ├── dashboard.html
│   ├── login.html
│   ├── register.html
│   └── view-records.html
│
└── README.md

⚙️ Installation & Setup
1️⃣ Clone the Repository
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker

2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Start MongoDB

Make sure MongoDB is running locally:

mongod

4️⃣ Run the Server
node server.js

5️⃣ Open Frontend

Open login.html in your browser.

🔑 API Endpoints
Method	Endpoint	Description
POST	/register	User registration
POST	/login	User login
POST	/income	Add income
POST	/expense	Add expense
GET	/expense	Get expenses (with filter)
DELETE	/expense/:id	Delete expense
GET	/dashboard	Dashboard summary
📈 Dashboard Overview

Total Income

Total Expenses

Remaining Balance

Weekly / Monthly expense visualization

Real-time UI updates

🔐 Security

Passwords hashed using bcrypt

Secure API access using JWT

User-specific data isolation

📌 Future Enhancements

Export reports (PDF / Excel)

Category-wise expense analysis

Email notifications

Cloud deployment

👤 Author

Agalya Kalidoss
Full Stack Developer | Node.js | MongoDB | JavaScript
