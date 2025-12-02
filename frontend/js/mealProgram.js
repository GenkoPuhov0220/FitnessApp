
document.addEventListener("DOMContentLoaded", () => {
  const openBtn = document.getElementById("openCreateWorkout");
  const modal = new bootstrap.Modal(document.getElementById("createProgramModal"));
  const form = document.getElementById("createProgramForm");

  const API = "https://fitnessapp-backend-80fh.onrender.com"
  //const LOCAL_API = "http://localhost:5000"

  let editMode = false;
  let editId = null;

  // Open modal for new program
  openBtn.addEventListener("click", () => {
    form.reset();
    editMode = false;
    editId = null;
    document.getElementById("createProgramLabel").innerText = "Create Your Meel Program";
    modal.show();
  });

  // Handle form submission (create or edit)
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("programTitle").value.trim();
    const description = document.getElementById("programDescription").value.trim();
    const username = localStorage.getItem("currentUser");

    if (!title || !description || !username) {
      document.getElementById("message").innerHTML = `<div class="alert alert-danger">Please fill all fields.</div>`;
      return;
    }

    try {
      const url = editMode
        ? `${API}/api/mealprograms/${editId}`
        : `${API}/api/mealprograms`;
      const method = editMode ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ title, description, username }),
      });

      const data = await response.json();
      if (response.ok) {
        //alert(data.message);
        document.getElementById("message").innerHTML = `<div class="alert alert-success">${data.message}</div>`;
        modal.hide();
        form.reset();
        loadMyPrograms();
      } else {
        document.getElementById("message").innerHTML = `<div class="alert alert-danger">Please enter valid numbers for all measurements.</div>`;
      }
    } catch (err) {
      console.error("Error:", err);
      document.getElementById("message").innerHTML = `<div class="alert alert-danger">An error occurred. Please try again.</div>`;
    }
  });

  // Load all programs
  async function loadMyPrograms() {
    const username = localStorage.getItem("currentUser");
    if (!username) return;

    try {
      const response = await fetch(`${API}/api/mealprograms/user/${username}`);
      const programs = await response.json();

      const list = document.getElementById("programList");
      list.innerHTML = "";

      if (!programs.length) {
        list.innerHTML = "<p>No custom programs yet.</p>";
        return;
      }

      programs.forEach((p) => {
        const card = document.createElement("div");
        card.classList.add("col-md-4", "mb-3");
        card.innerHTML = `
          <div class="card shadow-sm p-3 position-relative">
            <h5 class="fw-bold text-danger">${p.title}</h5>
            <p>${p.description}</p>
            <div class="d-flex justify-content-center gap-2 mt-2">
              <button class="btn btn-warning btn-sm edit-btn" data-id="${p._id}">Edit</button>
              <button class="btn btn-danger btn-sm delete-btn" data-id="${p._id}">Delete</button>
            </div>
          </div>
        `;
        list.appendChild(card);
      });

      // Attach event listeners for Edit and Delete
      document.querySelectorAll(".edit-btn").forEach((btn) =>
        btn.addEventListener("click", () => editProgram(btn.getAttribute("data-id"), programs))
      );
      document.querySelectorAll(".delete-btn").forEach((btn) =>
        btn.addEventListener("click", () => deleteProgram(btn.getAttribute("data-id")))
      );
    } catch (err) {
      console.error("Error loading programs:", err);
    }
  }

  // Edit program
  function editProgram(id, programs) {
    const program = programs.find((p) => p._id === id);
    if (!program) return;

    editMode = true;
    editId = id;
    document.getElementById("createProgramLabel").innerText = "Edit Meal Program";
    document.getElementById("programTitle").value = program.title;
    document.getElementById("programDescription").value = program.description;
    modal.show();
  }

  // Delete program
  async function deleteProgram(id) {
    try {
      const response = await fetch(`${API}/api/mealprograms/${id}`, { method: "DELETE" });
      loadMyPrograms();
      
    } catch (err) {
      console.error("Error deleting program:", err);
    }
  }
document.getElementById("viewWorkouts").addEventListener("click", async () => {
  const list = document.getElementById("programList");

  // If it's currently hidden, load and show it
  if (list.style.display === "none" || !list.style.display) {
    await loadMyPrograms();
    list.style.display = "flex";
    document.getElementById("viewWorkouts").innerText = "Hide My Meal Plans";
  } 
  // If it's visible, hide it
  else {
    list.style.display = "none";
    document.getElementById("viewWorkouts").innerText = "View My Meal Plans";
  }
});
});
