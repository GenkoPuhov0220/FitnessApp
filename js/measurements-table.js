let currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "login.html";
}

document.getElementById("welcome").textContent = `Welcome, ${currentUser}!`;


async function loadMeasurements() {
  try {

    const userId = localStorage.getItem("id") 

    const res = await fetch(`http://localhost:5000/api/measurements/${userId}`);  // Call backend to get measurements
    const measurements = await res.json();

    const tableBody = document.getElementById("measurementsTableBody");
    tableBody.innerHTML = "";  // Clear previous table data

    measurements.forEach(measurement => {
      const row = `
        <tr>
          <td>${new Date(measurement.date).toLocaleDateString()}</td>
          <td>${measurement.chest}</td>
          <td>${measurement.stomachNavel}</td>
          <td>${measurement.leftArm}</td>
          <td>${measurement.rightArm}</td>
          <td>${measurement.leftLeg}</td>
          <td>${measurement.rightLeg}</td>
          <td>
            <button class="btn btn-warning btn-sm" onclick="editMeasurement('${measurement._id}')">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="deleteMeasurement('${measurement._id}')">Delete</button>
          </td>
        </tr>
      `;
      tableBody.insertAdjacentHTML('beforeend', row);  // Add new row to the table
    });
  } catch (error) {
    console.error("Error loading measurements:", error);
  }
}

// Call this function on page load to display existing measurements
loadMeasurements();

// Delete measurement function
async function deleteMeasurement(measurementId) {
  try {
    const res = await fetch(`/api/measurements/${userId}/${measurementId}`, {
      method: 'DELETE',
    });
    const data = await res.json();
    loadMeasurements();  // Refresh the table
  } catch (error) {
    console.error("Error deleting measurement:", error);
  }
}

// Edit measurement function
function editMeasurement(measurementId) {
  // Optionally, redirect to an edit page with measurementId in the URL or use a modal for editing
  console.log(`Editing measurement with ID: ${measurementId}`);
}