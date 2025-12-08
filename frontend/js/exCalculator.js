let currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "login.html";
}

document.getElementById("welcome").textContent = `Welcome, ${currentUser}!`;

let exercise = [];

const API_EX = "https://fitnessapp-backend-80fh.onrender.com"
//const LOCAL_API = "http://localhost:5000"

// Fetch all exercises from MongoDB when page loads
async function fetchExercises() {

  
  try {
    const res = await fetch(`${API_EX}/api/exercises/${currentUser}`);
    exercise = await res.json();
    render();
  } catch (err) {
    console.error("Error loading exercises:", err);
  }
}

async function addExercise(event) {
  event.preventDefault();

  const message = document.getElementById("log-message");
  const name = document.getElementById("exercise").value.trim();
  const series = parseInt(document.getElementById("series").value);
  const reps = parseInt(document.getElementById("reps").value);
  message.textContent = "";

  if (!name || isNaN(reps) || reps <= 0 || isNaN(series) || series <= 0) {
    message.textContent = "Please enter exercise, series and reps";
    return;
  }

console.log('Exercise:', name, 'Series:', series, 'Reps:', reps);

  try {
    const res = await fetch(`${API_EX}/api/exercises`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username: currentUser, name, series, reps }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message);

    message.textContent = "Exercise added successfully!";
    setTimeout(() => (message.textContent = ""), 2000);

    await fetchExercises(); // Refresh list
  } catch (err) {
    console.error(err);
    message.textContent = "Error adding exercise";
  }

  document.getElementById("exercise").value = "";
  document.getElementById("series").value = "";
  document.getElementById("reps").value = "";
}

function render() {
  const logDiv = document.getElementById("log");
  logDiv.innerHTML = "";

  let total = 0;

  exercise.forEach((ex) => {
    total += ex.reps;
    logDiv.innerHTML += `
      <div class="card">
      <p><strong>Exercise:</strong> ${ex.name}</p>
      <p><strong>Series:</strong> ${ex.series}</p>
      <p><strong>Reps:</strong> ${ex.reps}</p>
        <button class="btn btn-sm btn-outline-danger" onclick="removeExercise('${ex._id}')">Remove</button>
      </div>`;
  });

  document.getElementById("total").textContent = "Total reps: " + total;
}

async function removeExercise(id) {
  try {
    await fetch(`${API_EX}/api/exercises/${id}`, { method: "DELETE" });
    await fetchExercises();
  } catch (err) {
    console.error("Error deleting exercise:", err);
  }
}

async function clearAll() {
  if (confirm("Are you sure you want to delete all exercises?")) {
    try {
      await fetch(`${API_EX}/api/exercises/clear/${currentUser}`, { method: "DELETE" });
      await fetchExercises();
    } catch (err) {
      console.error("Error clearing exercises:", err);
    }
  }
}

// Initial load
fetchExercises();
