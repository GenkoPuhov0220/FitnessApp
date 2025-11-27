
// Calculator
const openCalorieModalBtn = document.getElementById('openCalorieModal');
const calorieModalEl = document.getElementById('calorieModal');
const calorieModal = new bootstrap.Modal(calorieModalEl);
const calorieTableModalEl = document.getElementById('calorieTableModal');
const calorieTableModal = new bootstrap.Modal(calorieTableModalEl);

openCalorieModalBtn.addEventListener('click', () => {
    calorieModal.show();
});

// table
const toggleTableBtn = document.getElementById('toggleTableBtn');
const tableContainer = document.getElementById('tableContainer');
const calorieTableBody = document.getElementById('calorieTableBody');
const calculateForm = document.getElementById('calorieForm');


toggleTableBtn.addEventListener('click', () => {
    loadEntries();
    calorieTableModal.show();
});
let currentUser = localStorage.getItem('currentUser');
if (!currentUser) {
    window.location.href = 'login.html';
}

//const API = "https://fitnessapp-backend-80fh.onrender.com"
//const LOCAL_API = "http://localhost:5000"

// Load entries from server
async function loadEntries() {
    if (!currentUser) return;

    try {
        // ✅ Коригиран път към API
        const response = await fetch(`${API}/api/calories/${currentUser}`);
        const data = await response.json();

        calorieTableBody.innerHTML = '';

        data.forEach(entry => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${entry.age}</td>
                <td>${entry.gender}</td>
                <td>${entry.height}</td>
                <td>${entry.weight}</td>
                <td>${entry.activityLevel}</td>
                <td>${entry.goal}</td>
                <td>${entry.dailyCalorieIntake}</td>
                <td>
                    <button class="btn btn-sm btn-primary editBtn" data-id="${entry._id}">Edit</button>
                    <button class="btn btn-sm btn-danger deleteBtn" data-id="${entry._id}">Delete</button>
                </td>
            `;
            calorieTableBody.appendChild(row);
        });

        document.querySelectorAll('.editBtn').forEach(button => {
            button.addEventListener('click', () => editEntry(button.getAttribute('data-id')));
        });

        document.querySelectorAll('.deleteBtn').forEach(button => {
            button.addEventListener('click', () => deleteEntry(button.getAttribute('data-id')));
        });
    } catch (error) {
        console.error('Error loading entries:', error);
    }
}

// Add new entry
async function addEntry(entry) {
    try {
        const response = await fetch(`${API}/api/calories`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: currentUser,
                age: Number(entry.age),
                gender: entry.gender.toLowerCase(),               
                height: Number(entry.height),
                weight: Number(entry.weight),
                activityLevel: entry.activityLevel.toLowerCase(), 
                goal: entry.goal.toLowerCase(),                  
            })
        });

        if (response.ok) {
            loadEntries();
        } else {
            console.error('Failed to add entry');
        }
    } catch (error) {
        console.error('Error adding entry:', error);
    }
}

// Edit entry
async function editEntry(id) {
    const row = calorieTableBody.querySelector(`button[data-id="${id}"]`).closest('tr');

    const age = prompt('Enter Age:', row.children[0].textContent);
    const gender = prompt('Enter Gender (male/female):', row.children[1].textContent);
    const height = prompt('Enter Height (cm):', row.children[2].textContent);
    const weight = prompt('Enter Weight (kg):', row.children[3].textContent);
    const activityLevel = prompt('Enter Activity Level (sedentary, lightly active, moderately active, very active, extra active):', row.children[4].textContent);
    const goal = prompt('Enter Goal (lose weight, maintain weight, gain weight):', row.children[5].textContent);

    if (!age || !gender || !height || !weight || !activityLevel || !goal) return;

    try {
        const response = await fetch(`${API}/api/calories/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                age: Number(age),
                gender: gender.toLowerCase(),               
                height: Number(height),
                weight: Number(weight),
                activityLevel: activityLevel.toLowerCase(), 
                goal: goal.toLowerCase(),  
             })
        });
        if (response.ok) {
            loadEntries();
        } else {
            console.error('Failed to update entry');
        }
    } catch (error) {
        console.error('Error updating entry:', error);
    }
}

// Delete entry
async function deleteEntry(id) {
    if (!confirm('Are you sure you want to delete this entry?')) return;

    try {
        const response = await fetch(`${API}/api/calories/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            loadEntries();
        }
    } catch (error) {
        console.error('Error deleting entry:', error);
    }
}

// Calculate calories (client-side)
function calculateCalories({ age, gender, height, weight, activityLevel, goal }) {
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    const activityMultipliers = {
        sedentary: 1.2,
        'lightly active': 1.375,
        'moderately active': 1.55,
        'very active': 1.725,
        'extra active': 1.9
    };

    let calories = bmr * (activityMultipliers[activityLevel] || 1.2);

    if (goal === 'lose weight') calories -= 500;
    if (goal === 'gain weight') calories += 500;

    return Math.round(calories);
}

// Form submission
if (calculateForm) {
    calculateForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const entryData = {
            age: Number(calculateForm.age.value),
            gender: calculateForm.gender.value.toLowerCase(),
            height: Number(calculateForm.height.value),
            weight: Number(calculateForm.weight.value),
            activityLevel: calculateForm.activityLevel.value.toLowerCase(),
            goal: calculateForm.goal.value.toLowerCase()
        };

        const calories = calculateCalories(entryData);
        document.getElementById('calorieResult').textContent = 
            `Your daily calories: ${calories} kcal`;

        addEntry(entryData);
        calculateForm.reset();
    });
}
