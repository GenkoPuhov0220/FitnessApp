 
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
      document.getElementById("measurements-form").reset();
      fetchMeasurements(); // Refresh the measurements list
    } else {
      throw new Error(data.message || 'Failed to save measurement.');
    }
  } catch (error) {
    document.getElementById("message").innerHTML = `<div class="alert alert-danger">${error.message}</div>`;
  }
});

async function fetchMeasurements() {
    const userId = localStorage.getItem("id")
  try {
    const res = await fetch(`http://localhost:5000/api/measurements/${userId}`);
    const measurements = await res.json();
    
    // Render the list of measurements
    renderMeasurements(measurements);
  } catch (err) {
    console.error("Error fetching measurements:", err);
  }
}

function renderMeasurements(measurements) {
  const logDiv = document.getElementById("measurements-log");
  logDiv.innerHTML = "";

  measurements.forEach((measurement) => {
    logDiv.innerHTML += `
      <div class="card">
        <p><strong>Chest:</strong> ${measurement.chest} cm</p>
        <p><strong>Stomach (Navel):</strong> ${measurement.stomachNavel} cm</p>
        <p><strong>Left Arm:</strong> ${measurement.leftArm} cm</p>
        <p><strong>Right Arm:</strong> ${measurement.rightArm} cm</p>
        <p><strong>Left Leg:</strong> ${measurement.leftLeg} cm</p>
        <p><strong>Right Leg:</strong> ${measurement.rightLeg} cm</p>
        <button class="btn btn-danger btn-sm" onclick="removeMeasurement('${measurement._id}')">Remove</button>
      </div>
    `;
  });
}

async function removeMeasurement(measurementId) {
  const userId = localStorage.getItem("id"); 
  try {
    const response = await fetch(`http://localhost:5000/api/measurements/${userId}/${measurementId}`, { method: "DELETE" });
    
    if (response.ok) {
      console.log('Measurement deleted');
      await fetchMeasurements();  // Refresh the measurements list
    } else {
      const data = await response.json();
      console.error("Delete failed:", data.message);
    }
  } catch (err) {
    console.error("Error deleting measurement:", err);
  }
}

// Load measurements when the page is loaded
fetchMeasurements();