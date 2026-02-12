function showToast(msg) {
  let toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = msg;

  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

function addExpense() {
  const title = document.getElementById("title");
  const amount = document.getElementById("amount");
  const date = document.getElementById("date");

  if (!title.value || !amount.value || !date.value) {
    showToast("⚠️ Fill all fields");
    return;
  }

  axios.post(
    "http://localhost:3000/expense",
    {
      title: title.value,
      amount: Number(amount.value),
      date: date.value
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
  )
  .then(() => {
    showToast("✅ Expense added");

    // ✅ Clear inputs
    title.value = "";
    amount.value = "";
    date.value = "";
  })
  .catch(err => {
    console.error(err);
    showToast("❌ Failed to add expense");
  });
}
