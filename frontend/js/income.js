function addIncome() {
  const source = document.getElementById("source").value.trim();
  const amount = document.getElementById("amount").value;
  const date = document.getElementById("date").value;

  if (!source || !amount || !date) {
    showToast("All fields are required", "error");
    return;
  }

  axios.post(
    "http://localhost:3000/income",
    {
      source,
      amount: Number(amount),
      date
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
  )
  .then(() => {
    showToast("Income added successfully");
    window.location.href = "dashboard.html";
  })
  .catch(err => {
    console.error(err);
    showToast("Failed to add income", "error");
  });
}
