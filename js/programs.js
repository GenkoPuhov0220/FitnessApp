let currentUser = localStorage.getItem("currentUser");
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
            <li><strong>Monday:</strong> Full Body – Squat, Bench Press, Row, Plank</li>
            <li><strong>Wednesday:</strong> Full Body – Deadlift, Overhead Press, Lat Pulldown, Abs</li>
            <li><strong>Friday:</strong> Full Body – Front Squat, Dumbbell Bench, Cable Row, Plank</li>
          </ul>
          <p>Start with 3 sets of 8–12 reps. Increase weight gradually each week. Focus on form and rest properly.</p>
        `
      },
      intermediateBulk: {
        title: "Intermediate Program",
        content: `
          <ul>
            <li><strong>Monday:</strong> Upper Body – Bench Press, Pull Ups, Shoulder Press</li>
            <li><strong>Tuesday:</strong> Lower Body – Squats, Deadlifts, Lunges</li>
            <li><strong>Thursday:</strong> Upper Body – Rows, Dips, Bicep Curls</li>
            <li><strong>Friday:</strong> Lower Body – Leg Press, Romanian Deadlift, Calf Raises</li>
          </ul>
          <p>Focus on progressive overload with moderate reps (6-10). Add supersets for intensity.</p>
        `
      },
      advancedBulk: {
        title: "Advanced Program",
        content: `
          <ul>
            <li><strong>Mon/Wed/Fri:</strong> Push/Pull/Legs split – heavy compound lifts + isolation</li>
            <li><strong>Volume:</strong> 5-6 workouts per week</li>
            <li><strong>Intensity:</strong> High with periodization cycles</li>
          </ul>
          <p>Use periodized programming and track volume and intensity carefully. Include deload weeks.</p>
        `
      },
      beginnerCut:{
        title:"Beginners Program",
        content:`
        <ul>
            <li><strong>Monday:</strong> Full Body – Squat, Push-ups, Planks, Jumping Jacks</li>
            <li><strong>Wednesday:</strong> Full Body – Bodyweight Squats, Mountain Climbers, Bicycle Crunches</li>
            <li><strong>Friday:</strong> Full Body – Dumbbell Rows, Push-ups, Walking Lunges, Planks</li>
        </ul>
        <p>Focus on high reps and minimal rest between sets. Start with bodyweight exercises, then progress to weights as strength improves.</p>
       `
      },
      intermediateCut:{
        title: "Intermediate Program",
        content:`
        <ul>
          <li><strong>Monday:</strong> Upper Body – Bench Press, Pull-ups, Dumbbell Rows, Planks</li>
          <li><strong>Tuesday:</strong> Lower Body – Squats, Deadlifts, Walking Lunges</li>
          <li><strong>Thursday:</strong> Upper Body – Push-ups, Bicep Curls, Tricep Dips</li>
          <li><strong>Friday:</strong> Lower Body – Romanian Deadlift, Leg Press, Calf Raises</li>
        </ul>
        <p>Focus on fat loss with circuit training. Include short rest intervals (30-60 seconds). Combine strength training with cardio.</p>
        `
      },
      advancedCut:{
        title: "Advanced Program",
        content:`
        <ul>
          <li><strong>Mon/Wed/Fri:</strong> Push/Pull/Legs – High-intensity weight training + Metabolic Conditioning (HIIT)</li>
          <li><strong>Saturday:</strong> Full Body – Circuit Training (Kettlebells, Burpees, Jump Squats)</li>
          <li><strong>Intensity:</strong> Very High with minimal rest between exercises</li>
        </ul>
        <p>Advanced training with a focus on fat loss and muscle retention. Use HIIT and circuit training to maximize calorie burn.</p>
        `
      },
      beginnersMaintenance: {
      title: "Beginners Program (Maintenance/Recomp)",
      content: `
        <ul>
          <li><strong>Monday:</strong> Full Body – Squat, Push-ups, Row</li>
          <li><strong>Wednesday:</strong> Full Body – Deadlift, Dumbbell Bench Press, Lat Pulldown</li>
          <li><strong>Friday:</strong> Full Body – Front Squat, Overhead Press, Dumbbell Row</li>
        </ul>
        <p>Focus on moderate reps (8-12) and balanced training. Aim for muscle endurance while maintaining a lean physique.</p>
      `
      },
      intermediateMaintenance: {
      title: "Intermediate Program (Maintenance/Recomp)",
      content: `
        <ul>
          <li><strong>Monday:</strong> Upper Body – Bench Press, Pull Ups, Shoulder Press</li>
          <li><strong>Tuesday:</strong> Lower Body – Squats, Deadlifts, Lunges</li>
          <li><strong>Thursday:</strong> Upper Body – Rows, Dips, Bicep Curls</li>
          <li><strong>Friday:</strong> Lower Body – Leg Press, Romanian Deadlift, Calf Raises</li>
        </ul>
        <p>Focus on moderate volume with a balance of strength and hypertrophy.</p>
      `
      },
      advancedMaintenance: {
      title: "Advanced Program (Maintenance/Recomp)",
      content: `
        <ul>
          <li><strong>Mon/Wed/Fri:</strong> Push/Pull/Legs split – heavy compound lifts + isolation</li>
          <li><strong>Volume:</strong> 5-6 workouts per week</li>
          <li><strong>Intensity:</strong> High with periodized progression cycles</li>
        </ul>
        <p>Maintain muscle mass while focusing on performance, with high intensity and controlled progression.</p>
      `
    },
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
