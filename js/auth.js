// --- REGISTER ---
async function register(event) {
  event.preventDefault();

  const username = document.getElementById("reg-username").value.trim();
  const email = document.getElementById("reg-email")?.value.trim(); // optional if you have email field
  const password = document.getElementById("reg-password").value;
  const message = document.getElementById("reg-message");

  message.textContent = "";

  // Validation
  if (!username || !password || (!email && document.getElementById("reg-email"))) {
    message.textContent = "Please fill in all fields!";
    message.style.color = "#ff4d4d";
    return;
  }

  try {
    // Send data to backend
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      message.textContent = "✅ Registration successful! Redirecting...";
      message.style.color = "green";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      message.textContent = data.message || "❌ Error registering.";
      message.style.color = "#ff4d4d";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "⚠️ Server error. Please try again later.";
    message.style.color = "#ff4d4d";
  }
}

// --- LOGIN ---
async function login(event) {
  event.preventDefault();

  const username = document.getElementById("login-username").value.trim();
  const password = document.getElementById("login-password").value;
  const message = document.getElementById("log-message");

  message.textContent = "";

  if (!username || !password) {
    message.textContent = "Please fill in all fields!";
    message.style.color = "#ff4d4d";
    return;
  }

  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      message.textContent = "✅ Login successful!";
      message.style.color = "green";

      // Optionally save logged-in user (or token)
      localStorage.setItem("currentUser", username);

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1000);
    } else {
      message.textContent = data.message || "❌ Invalid credentials.";
      message.style.color = "#ff4d4d";
    }
  } catch (err) {
    console.error(err);
    message.textContent = "⚠️ Server error. Please try again later.";
    message.style.color = "#ff4d4d";
  }
}
