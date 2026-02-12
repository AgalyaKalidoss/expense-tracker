// ---------- LOGIN ----------
async function login() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const res = await fetch("http://localhost:3000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!res.ok) {
      showToast("Login failed", "error");
        
      return;
    }

    // ✅ Store token & username
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.name || "");

    // ✅ Redirect to dashboard
    window.location.replace("dashboard.html");

  } catch (err) {
    console.error("Login error:", err);
    showToast("An error occurred during login", "error");
  }
}

// ---------- AUTH CHECK ----------
function authCheck() {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.replace("login.html");
  }
}

// ---------- LOGOUT ----------
function logout() {
  localStorage.clear(); // clears token + username safely
  window.location.replace("login.html");
}
