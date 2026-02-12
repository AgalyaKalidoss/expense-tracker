authCheck();

let chartInstance = null;

function loadDashboard() {
  axios.get("http://localhost:3000/dashboard", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  })
  .then(res => {
    // Update cards
    document.getElementById("income").innerText = "₹" + res.data.income;
    document.getElementById("expense").innerText = "₹" + res.data.expense;
    document.getElementById("balance").innerText =
      "₹" + (res.data.income - res.data.expense);

    // Chart
    const ctx = document.getElementById("chart");

    if (chartInstance) {
      chartInstance.destroy();
    }

    chartInstance = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
        datasets: [{
          data: res.data.weeklyData,
          borderColor: "#9cff00",
          backgroundColor: "rgba(156,255,0,0.1)",
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: { ticks: { color: "#ccc" } },
          y: { ticks: { color: "#ccc" } }
        }
      }
    });
  })
  .catch(err => {
    console.error(err);
    showToast("Failed to load dashboard data", "error");
  });
}

// Initial load
loadDashboard();

// Auto refresh every 5 seconds
setInterval(loadDashboard, 5000);
