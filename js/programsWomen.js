let currentUser = localStorage.getItem("currentUser");
if (!currentUser) {
  window.location.href = "login.html"; // ако не е логнат
}
document.getElementById("welcome").textContent = `Welcome, ${currentUser}!`;

document.querySelectorAll(".see-program-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const key = btn.getAttribute("data-program");
    const modal = document.getElementById("programModal");
    const modalTitle = modal.querySelector("#programModalLabel");
    const modalBody = modal.querySelector("#programModalBody");
    const modalContent = modal.querySelector(".modal-content");
    const modalHeader = modal.querySelector(".modal-header");

    
    modalContent.classList.remove("beginners", "intermediate", "advanced");
    modalHeader.classList.remove("beginners", "intermediate", "advanced");

  
    const programs = {
        beginnersWomenBulk: {
            title: "Beginners Women's Bulking Program",
            content: `
            <ul>
                <li><strong>Monday:</strong> Full Body – Barbell Squat (3x10), Dumbbell Bench Press (3x10), Dumbbell Row (3x10), Glute Bridge (3x15)</li>
                <li><strong>Wednesday:</strong> Full Body – Romanian Deadlift (3x8), Shoulder Press (3x10), Lat Pulldown (3x10), Plank (3x30s)</li>
                <li><strong>Friday:</strong> Full Body – Goblet Squat (3x10), Incline Dumbbell Press (3x10), Seated Cable Row (3x10), Hip Thrust (3x12)</li>
            </ul>
            <p>
                🍑 <strong>Goal:</strong> Build foundational strength and muscle, especially in glutes, legs, and core.<br>
                🔁 Start with light to moderate weights, focus on proper form and gradual progression.<br>
                ⏱️ Rest 60–90 seconds between sets and track your lifts weekly.
            </p>
            `
        },
        intermediateWomenBulk: {
            title: "Intermediate Women's Bulking Program",
            content: `
            <ul>
                <li><strong>Monday (Lower 1):</strong> Back Squat (4x8), Romanian Deadlift (3x10), Walking Lunges (3x12), Standing Calf Raise (3x15)</li>
                <li><strong>Tuesday (Upper 1):</strong> Bench Press (4x8), Pull-Ups (3x8), Arnold Press (3x10), Cable Face Pulls (3x15)</li>
                <li><strong>Thursday (Lower 2):</strong> Hip Thrust (4x10), Bulgarian Split Squat (3x12), Leg Press (3x10), Glute Kickback (3x15)</li>
                <li><strong>Friday (Upper 2):</strong> Incline Dumbbell Press (4x8), Barbell Row (3x10), Lateral Raises (3x15), Tricep Dips (3x12)</li>
            </ul>
            <p>
                ⚡ <strong>Goal:</strong> Add lean muscle mass with a focus on glutes, legs, and shoulders.<br>
                🔁 Use progressive overload — increase weights weekly while maintaining good form.<br>
                ⏱️ Rest 90–120 seconds between compound lifts and 60 seconds for isolation work.
            </p>
            `
        },
        advancedWomenBulk: {
            title: "Advanced Women's Bulking Program",
            content: `
            <ul>
                <li><strong>Monday (Push):</strong> Bench Press (4x6), Overhead Press (4x8), Dumbbell Chest Fly (3x12), Tricep Pushdown (3x15)</li>
                <li><strong>Tuesday (Pull):</strong> Barbell Row (4x8), Pull-Ups (4x10), Face Pulls (3x15), Bicep Curls (3x12)</li>
                <li><strong>Wednesday (Legs):</strong> Back Squat (4x8), Romanian Deadlift (3x10), Walking Lunges (3x12), Standing Calf Raise (3x20)</li>
                <li><strong>Thursday (Glutes/Legs):</strong> Hip Thrust (4x10), Bulgarian Split Squat (3x12), Cable Kickback (3x15), Abductor Machine (3x20)</li>
                <li><strong>Friday (Upper 2):</strong> Incline Dumbbell Press (4x8), Lat Pulldown (3x10), Lateral Raises (3x15), Tricep Dips (3x12)</li>
                <li><strong>Saturday (Legs/Core):</strong> Front Squat (4x8), Step-Ups (3x12), Glute Bridge (3x15), Core Circuit (Plank + Russian Twist + Leg Raise)</li>
            </ul>
            <p>
                🔥 <strong>Goal:</strong> Maximize hypertrophy in lower body and enhance overall muscle balance.<br>
                🧠 Use advanced training principles like tempo control, supersets, and deload weeks every 5–6 weeks.<br>
                💪 Track lifts weekly and aim for small but consistent strength increases.
            </p>
            `
        },
        beginnersWomenCut: {
            title: "Beginners Women's Cutting Program",
            content: `
            <ul>
                <li><strong>Monday:</strong> Full Body – Bodyweight Squat (3x15), Dumbbell Shoulder Press (3x12), Glute Bridge (3x15), Plank (3x30s)</li>
                <li><strong>Wednesday:</strong> Full Body – Step Ups (3x12/leg), Dumbbell Row (3x12), Hip Thrust (3x15), Mountain Climbers (3x20s)</li>
                <li><strong>Friday:</strong> Full Body – Goblet Squat (3x12), Incline Push-Up (3x12), Romanian Deadlift (3x12), Side Plank (3x20s each)</li>
            </ul>
            <p>
                💃 <strong>Goal:</strong> Lose body fat and improve endurance while maintaining lean muscle.<br>
                🔥 Finish each session with 10–15 minutes of light cardio (walking, cycling, or jump rope).<br>
                ⏱️ Rest 30–60 seconds between sets to keep the heart rate up.
            </p>
            `
        },
        intermediateWomenCut: {
            title: "Intermediate Women's Cutting Program",
            content: `
            <ul>
                <li><strong>Monday (Lower 1):</strong> Back Squat (4x10), Romanian Deadlift (3x12), Walking Lunges (3x12/leg), Calf Raise (3x20)</li>
                <li><strong>Tuesday (Upper 1):</strong> Bench Press (3x10), Pull-Ups (3x8), Lateral Raise (3x15), Push-Up (3x15)</li>
                <li><strong>Thursday (Lower 2):</strong> Hip Thrust (4x12), Bulgarian Split Squat (3x12), Step Ups (3x10), Core Circuit (3 rounds)</li>
                <li><strong>Friday (Cardio/HIIT):</strong> 20s work / 40s rest x 6 rounds – Jump Squats, Mountain Climbers, Burpees, Plank Jacks</li>
            </ul>
            <p>
                ⚡ <strong>Goal:</strong> Burn fat, tone muscles, and improve cardiovascular endurance.<br>
                💦 Combine resistance training with short HIIT sessions.<br>
                ⏱️ Rest 45–90 seconds between sets, 2 minutes between exercises.
            </p>
            `
        },
        advancedWomenCut: {
            title: "Advanced Women's Cutting Program",
            content: `
            <ul>
                <li><strong>Monday (Push):</strong> Incline Dumbbell Press (4x10), Arnold Press (3x12), Tricep Dips (3x15), Jump Rope (3x1min)</li>
                <li><strong>Tuesday (Pull):</strong> Barbell Row (4x10), Pull-Ups (3x8), Rear Delt Fly (3x15), Kettlebell Swing (3x20)</li>
                <li><strong>Wednesday (Legs):</strong> Back Squat (4x10), Romanian Deadlift (3x12), Hip Thrust (3x15), Walking Lunges (3x12/leg)</li>
                <li><strong>Thursday (Cardio HIIT):</strong> 30s work / 30s rest x 8 – Burpees, High Knees, Jump Squats, Mountain Climbers</li>
                <li><strong>Friday (Upper/Core):</strong> Push-Ups (3x15), Cable Row (3x12), Lateral Raises (3x15), Ab Circuit (3 rounds)</li>
                <li><strong>Saturday (Active Recovery):</strong> 30–40 min brisk walk, yoga, or stretching session</li>
            </ul>
            <p>
                🔥 <strong>Goal:</strong> Achieve lean definition and preserve strength while cutting.<br>
                💪 Mix resistance, cardio, and HIIT strategically.<br>
                🧠 Maintain a slight calorie deficit with high protein intake.<br>
                ⏱️ Rest 30–60s for circuits, 90s for strength movements.
            </p>
            `
        },
        beginnersWomenRecomp: {
            title: "Beginners Women's Recomposition Program",
            content: `
            <ul>
                <li><strong>Monday:</strong> Full Body – Squat (3x10), Dumbbell Bench Press (3x10), Dumbbell Row (3x10), Plank (3x30s)</li>
                <li><strong>Wednesday:</strong> Full Body – Romanian Deadlift (3x10), Shoulder Press (3x12), Lat Pulldown (3x12), Glute Bridge (3x15)</li>
                <li><strong>Friday:</strong> Full Body – Front Squat (3x8), Incline Dumbbell Press (3x10), Seated Cable Row (3x10), Side Plank (3x30s each)</li>
            </ul>
            <p>
                ⚖️ <strong>Goal:</strong> Maintain your current weight while improving muscle tone and posture.<br>
                🔁 Mix strength and light cardio (20–30 min walk or cycling 2–3x/week).<br>
                ⏱️ Rest 60–90 seconds between sets and track progress slowly.
            </p>
            `
        },
        intermediateWomenRecomp: {
            title: "Intermediate Women's Recomposition Program",
            content: `
            <ul>
                <li><strong>Monday (Upper 1):</strong> Bench Press (4x8), Pull-Ups (3x8), Shoulder Press (3x10), Plank Row (3x12)</li>
                <li><strong>Tuesday (Lower 1):</strong> Back Squat (4x8), Romanian Deadlift (3x10), Glute Kickbacks (3x15), Calf Raises (3x15)</li>
                <li><strong>Thursday (Upper 2):</strong> Incline Dumbbell Press (3x10), Barbell Row (3x10), Lateral Raises (3x15), Hanging Leg Raises (3x12)</li>
                <li><strong>Friday (Lower 2):</strong> Hip Thrust (4x10), Bulgarian Split Squat (3x12), Step Ups (3x12), Ab Circuit (3 rounds)</li>
            </ul>
            <p>
                💪 <strong>Goal:</strong> Improve muscle tone and strength while maintaining weight and body shape.<br>
                🔁 Include 1–2 cardio sessions per week (running, cycling, or HIIT under 20 min).<br>
                ⏱️ Rest 60–120 seconds between compound lifts.
            </p>
            `
        },
        advancedWomenRecomp: {
            title: "Advanced Women's Recomposition Program",
            content: `
            <ul>
                <li><strong>Monday (Push):</strong> Bench Press (4x8), Overhead Press (3x10), Dumbbell Chest Fly (3x12), Tricep Extensions (3x12)</li>
                <li><strong>Tuesday (Pull):</strong> Barbell Row (4x8), Pull-Ups (4x10), Face Pulls (3x15), Bicep Curls (3x12)</li>
                <li><strong>Wednesday (Legs):</strong> Back Squat (4x8), Romanian Deadlift (3x10), Hip Thrust (3x12), Calf Raise (3x20)</li>
                <li><strong>Thursday (Active Cardio):</strong> 30–40 min steady-state cycling, brisk walking, or incline treadmill</li>
                <li><strong>Friday (Push/Pull Mix):</strong> Dumbbell Bench (3x10), Lat Pulldown (3x12), Lateral Raise (3x15), Plank (3x45s)</li>
                <li><strong>Saturday (Legs/Core):</strong> Front Squat (4x8), Step Ups (3x12), Glute Bridge (3x15), Core Circuit (Plank, Russian Twist, Leg Raise)</li>
            </ul>
            <p>
                🔥 <strong>Goal:</strong> Maintain muscle and body composition while increasing strength and conditioning.<br>
                ⚖️ Slight calorie balance — eat at maintenance or small surplus on training days.<br>
                💃 Balance strength, cardio, and recovery. Sleep and consistency are key!
            </p>
              `
        }
    };

    // Проверяваме дали има програма със съответния ключ и показваме съдържанието
    if (programs[key]) {
      modalTitle.innerText = programs[key].title;
      modalBody.innerHTML = programs[key].content;

      // Добавяме клас за типа на програмата
      modalContent.classList.add(key);
      modalHeader.classList.add(key);

      // Показваме модала (с помощта на Bootstrap JS)
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  });
});