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
      beginnersBulk: {
        title: "Beginners Program",
        content: `
          <ul>
            <li><strong>Monday:</strong> Full Body – Squat (3x10), Bench Press (3x10), Barbell Row (3x10), Plank (3x30s)</li>
            <li><strong>Wednesday:</strong> Full Body – Deadlift (3x8), Overhead Press (3x10), Lat Pulldown (3x10), Hanging Knee Raise (3x12)</li>
            <li><strong>Friday:</strong> Full Body – Front Squat (3x8), Dumbbell Bench Press (3x10), Seated Cable Row (3x10), Side Plank (3x30s each)</li>
          </ul>
          <p>
          🏋️‍♂️ <strong>Goal:</strong> Build strength and coordination using core compound movements.<br>
          🔁 Start light, add small weight increases weekly.<br>
          ⏱️ Rest 60–90 seconds between sets and focus on perfect form.
          </p>
        `
      },
      intermediateBulk: {
        title: "Intermediate Program",
        content: `
          <ul>
            <li><strong>Monday (Upper 1):</strong> Bench Press (4x8), Pull Ups (3x8), Overhead Press (3x10), Bicep Curls (3x12)</li>
            <li><strong>Tuesday (Lower 1):</strong> Back Squat (4x8), Romanian Deadlift (3x10), Walking Lunges (3x12), Calf Raises (3x15)</li>
            <li><strong>Thursday (Upper 2):</strong> Incline Dumbbell Press (4x8), Barbell Row (3x10), Lateral Raises (3x15), Tricep Dips (3x12)</li>
            <li><strong>Friday (Lower 2):</strong> Deadlift (4x6), Leg Press (3x10), Bulgarian Split Squat (3x12), Abs Circuit (3 rounds)</li>
          </ul>
          <p>
           ⚡ <strong>Goal:</strong> Increase strength and muscle definition.<br>
           🔁 Focus on progressive overload, rest 90–120s between heavy sets.<br>
           💥 Add supersets or drop sets occasionally for intensity.
          </p>
        `
      },
      advancedBulk: {
        title: "Advanced Program",
        content: `
          <ul>
            <li><strong>Monday:</strong> Push – Bench Press (4x6), Incline Press (4x8), Overhead Press (3x10), Tricep Extensions (3x12)</li>
            <li><strong>Tuesday:</strong> Pull – Deadlift (4x5), Pull Ups (4x10), Barbell Row (3x10), Face Pulls (3x15)</li>
            <li><strong>Wednesday:</strong> Legs – Squat (4x6), Romanian Deadlift (3x8), Leg Press (3x10), Calf Raises (3x15)</li>
            <li><strong>Thursday:</strong> Push – Dumbbell Bench (4x8), Arnold Press (3x10), Chest Fly (3x12), Tricep Dips (3x12)</li>
            <li><strong>Friday:</strong> Pull – T-Bar Row (4x8), Chin Ups (3x10), Rear Delt Fly (3x15), Bicep Curls (3x12)</li>
            <li><strong>Saturday:</strong> Legs – Front Squat (4x6), Step Ups (3x12), Glute Bridge (3x15), Abs/Core Circuit</li>
          </ul>
          <p>
            🔥 <strong>Goal:</strong> Maximize hypertrophy, power, and muscular endurance.<br>
            🧠 Track volume, deload every 5–6 weeks, and use periodization (strength → hypertrophy → power).<br>
            💪 Push near failure safely — maintain perfect form.
          </p>
        `
      },
      beginnerCut:{
        title:"Beginners Program",
        content:`
        <ul>
          <li><strong>Monday:</strong> Full Body – Bodyweight Squat (3x15), Push-Ups (3x10), Dumbbell Row (3x12), Jumping Jacks (3x30s)</li>
          <li><strong>Wednesday:</strong> Full Body – Lunges (3x12/leg), Mountain Climbers (3x30s), Bicycle Crunches (3x20), Plank (3x30s)</li>
          <li><strong>Friday:</strong> Full Body – Dumbbell Deadlift (3x12), Shoulder Press (3x10), Step-Ups (3x12), Burpees (3x10)</li>
        </ul>
        <p>
          💡 <strong>Goal:</strong> Build endurance, improve movement, and jump-start fat loss.<br>
          🔁 Perform exercises in a circuit with 30–60s rest between rounds.<br>
          🕒 Aim for 3–4 rounds per workout and increase pace weekly.
        </p>
       `
      },
      intermediateCut:{
        title: "Intermediate Program",
        content:`
        <ul>
          <li><strong>Monday (Upper 1):</strong> Bench Press (4x10), Pull-Ups (3x8), Dumbbell Row (3x12), Plank (3x45s)</li>
          <li><strong>Tuesday (Lower 1):</strong> Back Squat (4x10), Romanian Deadlift (3x10), Walking Lunges (3x12/leg), HIIT Bike 10 min</li>
          <li><strong>Thursday (Upper 2):</strong> Incline Dumbbell Press (3x10), Shoulder Press (3x12), Bicep Curls (3x15), Jump Rope 5 min</li>
          <li><strong>Friday (Lower 2):</strong> Leg Press (4x10), Bulgarian Split Squat (3x12), Calf Raises (3x15), Row Machine Intervals 10 min</li>
        </ul>
        <p>
          ⚡ <strong>Goal:</strong> Burn fat efficiently while maintaining lean muscle.<br>
          🧠 Use a mix of strength and HIIT — short rest (30–45s) between sets.<br>
          🕐 Include 20–30 minutes of cardio post-workout 2–3 times per week.
        </p>
        `
      },
      advancedCut:{
        title: "Advanced Program",
        content:`
        <ul>
          <li><strong>Monday:</strong> Push – Bench Press (4x8), Incline Press (4x10), Dips (3x12), HIIT Sprints 10 min</li>
          <li><strong>Tuesday:</strong> Pull – Deadlift (4x6), Pull-Ups (4x10), Barbell Row (3x10), Battle Ropes 5x30s</li>
          <li><strong>Wednesday:</strong> Legs – Squat (4x8), Leg Press (3x12), Lunges (3x12/leg), Box Jumps (3x10)</li>
          <li><strong>Thursday:</strong> Active Recovery – 30 min Low-Intensity Cardio + Core Circuit</li>
          <li><strong>Friday:</strong> Full Body – Kettlebell Swings, Burpees, Push-Ups, Plank (4 Rounds)</li>
          <li><strong>Saturday:</strong> Conditioning – Sprint Intervals, Jump Rope, Weighted Carries (Farmer’s Walk)</li>
        </ul>
        <p>
          🔥 <strong>Goal:</strong> Maximize fat burn while maintaining power and muscle tone.<br>
          ⏱️ Alternate heavy lifts with short HIIT finishers.<br>
          🧩 Include one low-intensity recovery day to manage fatigue.
        </p>
        `
      },
      beginnersRecomp: {
        title: "Beginners Men's Recomposition Program",
        content: `
          <ul>
            <li><strong>Monday:</strong> Full Body – Squat (3x10), Bench Press (3x10), Dumbbell Row (3x10), Plank (3x30s)</li>
            <li><strong>Wednesday:</strong> Full Body – Deadlift (3x8), Overhead Press (3x10), Pull-Ups or Lat Pulldown (3x10), Hanging Leg Raise (3x12)</li>
            <li><strong>Friday:</strong> Full Body – Front Squat (3x8), Incline Dumbbell Press (3x10), Seated Row (3x10), Side Plank (3x30s each)</li>
          </ul>
          <p>
            ⚖️ <strong>Goal:</strong> Maintain your physique while improving strength and muscle tone.<br>
            🏃 Add 20–30 min light cardio 2x/week (walking, cycling, or rowing).<br>
            ⏱️ Rest 60–90 seconds between sets and maintain good form.
          </p>
        `
      },
      intermediateRecomp: {
        title: "Intermediate Men's Recomposition Program",
        content: `
          <ul>
            <li><strong>Monday (Upper 1):</strong> Bench Press (4x8), Pull-Ups (3x8), Overhead Press (3x10), Barbell Curl (3x12)</li>
            <li><strong>Tuesday (Lower 1):</strong> Back Squat (4x8), Romanian Deadlift (3x10), Lunges (3x12), Calf Raise (3x15)</li>
            <li><strong>Thursday (Upper 2):</strong> Incline Press (4x8), Barbell Row (3x10), Lateral Raise (3x15), Tricep Dips (3x12)</li>
            <li><strong>Friday (Lower 2):</strong> Deadlift (4x6), Leg Press (3x10), Bulgarian Split Squat (3x12), Core Circuit (3 rounds)</li>
          </ul>
          <p>
            💪 <strong>Goal:</strong> Enhance strength and definition while maintaining a lean body composition.<br>
            ⚙️ Include 1–2 cardio sessions (20–30 min) to improve conditioning.<br>
            ⏱️ Rest 90–120s between heavy sets.
          </p>
        `
      },
      advancedRecomp: {
        title: "Advanced Men's Recomposition Program",
        content: `
          <ul>
            <li><strong>Monday (Push):</strong> Bench Press (4x6), Incline Press (3x8), Overhead Press (3x10), Triceps Pushdown (3x12)</li>
            <li><strong>Tuesday (Pull):</strong> Deadlift (4x5), Pull-Ups (4x10), Barbell Row (3x10), Face Pulls (3x15)</li>
            <li><strong>Wednesday (Legs):</strong> Squat (4x6), Romanian Deadlift (3x10), Leg Press (3x12), Calf Raise (3x20)</li>
            <li><strong>Thursday (Active Recovery):</strong> 30–45 min steady-state cardio (cycling, rowing, or brisk walking)</li>
            <li><strong>Friday (Push/Pull):</strong> Dumbbell Bench Press (3x10), T-Bar Row (3x10), Lateral Raise (3x15), Hammer Curls (3x12)</li>
            <li><strong>Saturday (Legs/Core):</strong> Front Squat (4x8), Step Ups (3x12), Glute Bridge (3x15), Core Circuit (Plank, Leg Raises, Crunch)</li>
          </ul>
          <p>
            🔥 <strong>Goal:</strong> Maintain lean muscle and strength while improving conditioning and endurance.<br>
            ⚖️ Eat around maintenance calories, slight surplus on training days.<br>
            🧠 Focus on recovery, sleep, and consistency — key to recomposition success.
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
