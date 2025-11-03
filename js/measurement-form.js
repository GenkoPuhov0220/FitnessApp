 
let currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "login.html";
}

document.getElementById("welcome").textContent = `Welcome, ${currentUser}!`;

document.getElementById("measurements-form").addEventListener("submit", async (event) => {
  event.preventDefault();

  const userId = localStorage.getItem("id") // Assuming currentUser holds the userId

  const body = {
    chest: parseInt(document.getElementById("chest").value, 10),
    stomachNavel: parseInt(document.getElementById("stomach-navel").value, 10),
    leftArm: parseInt(document.getElementById("left-arm").value, 10),
    rightArm: parseInt(document.getElementById("right-arm").value, 10),
    leftLeg: parseInt(document.getElementById("left-leg").value, 10),
    rightLeg: parseInt(document.getElementById("right-leg").value, 10),
  };

  if (Object.values(body).some(value => isNaN(value))) {
    document.getElementById("message").innerHTML = `<div class="alert alert-danger">Please enter valid numbers for all measurements.</div>`;
    return;
  }
  
  try {
    const response = await fetch(`http://localhost:5000/api/measurements/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const data = await response.json();

    if (response.ok) {
      document.getElementById("message").innerHTML = `<div class="alert alert-success">Measurement saved successfully!</div>`;
      loadMeasurements();
      document.getElementById("measurements-form").reset();

    } else {
      throw new Error(data.message || 'Failed to save measurement.');
    }
  } catch (error) {
    document.getElementById("message").innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
});
