
let currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "login.html"; // ако не е логнат
}

document.getElementById("welcome").textContent = `Welcome, ${currentUser}!`;

let exercise = JSON.parse(localStorage.getItem("exercises_" + currentUser)) || [];

function addExercise(event){
    event.preventDefault();

    const message = document.getElementById("log-message")

    const name = document.getElementById("exercise").value.trim();
    const reps = parseInt(document.getElementById("reps").value);

    message.textContent = "";

    if(!name || isNaN(reps) || reps <= 0){
        message.textContent = "Please enter exercise and reps"
        return
    }
    exercise.push({name, reps});
    saveData();
    render();

    document.getElementById("exercise").value = "";
    document.getElementById("reps").value = ""; 
}

function render(){
    let logDiv = document.getElementById("log")
    logDiv.innerHTML = "";
    
    let total = 0
    exercise.forEach((ex) =>{
        total += ex.reps;
        logDiv.innerHTML += `
        <div class="card">
        <p><strong>Exercise:</strong> ${ex.name}</p>
        <p><strong>Reps:</strong> ${ex.reps}</p>
      </div>`
    });
 document.getElementById("total").textContent = "Total reps: " + total;
}

function saveData() {
  localStorage.setItem("exercise" + currentUser, JSON.stringify(exercise));
}

function clearAll() {
  if (confirm("Are you sure you want to delete all exercises??")) {
    exercise = [];
    saveData();
    render();
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

render();