
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

    message.textContent = "Exercise added successfully!";
    setTimeout(()=>{
      message.textContent = "";
    }, 2000)

    document.getElementById("exercise").value = "";
    document.getElementById("reps").value = ""; 
}

function render(){
    let logDiv = document.getElementById("log")
    logDiv.innerHTML = "";
    
    let total = 0

    exercise.forEach((ex, index) =>{
        total += ex.reps;
        logDiv.innerHTML += `
        <div class="card">
        <p><strong>Exercise:</strong> ${ex.name}</p>
        <p><strong>Reps:</strong> ${ex.reps}</p>
        <button class="btn btn-sm btn-outline-danger" onclick="removeExercise(${index})">Remove</button>
      </div>`
    });

 document.getElementById("total").textContent = "Total reps: " + total;
}

function removeExercise(index) {
  exercise.splice(index, 1);  
  saveData();                 
  render();                   
}

function saveData() {
  localStorage.setItem("exercise_" + currentUser, JSON.stringify(exercise));
}

function clearAll() {
  document.getElementById('clearConfirmation').style.display = 'flex';
}

document.getElementById('clearForm').addEventListener('submit', function(event){
  event.preventDefault()

  exercise = []
  saveData();
  render();

  document.getElementById('clearConfirmation').style.display = 'none';
})

function cancelClear(){
  document.getElementById('clearConfirmation').style.display = 'none';
}

//function logout() {
 // localStorage.removeItem("currentUser");
//  window.location.href = "index.html";
//}

render();