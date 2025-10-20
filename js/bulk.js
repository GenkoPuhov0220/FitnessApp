let currentUser = localStorage.getItem("currentUser");
document.getElementById("welcome").textContent = `Welcome, ${currentUser}!`;

document.querySelectorAll(".see-program-btn").forEach(btn => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();  // спирай нормалното поведение на линка
    const key = btn.getAttribute("data-program");  // вземи ключа за програмата от data атрибута
    const modal = document.getElementById("programModal");
    const modalTitle = modal.querySelector("#programModalLabel");
    const modalBody = modal.querySelector("#programModalBody");
    const modalContent = modal.querySelector(".modal-content");
    const modalHeader = modal.querySelector(".modal-header");

    // Премахваме всички класове за програми
    modalContent.classList.remove("beginners", "intermediate", "advanced");
    modalHeader.classList.remove("beginners", "intermediate", "advanced");

    // Примерни програми
    const programs = {
      beginners: {
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
      intermediate: {
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
      advanced: {
        title: "Advanced Program",
        content: `
          <ul>
            <li><strong>Mon/Wed/Fri:</strong> Push/Pull/Legs split – heavy compound lifts + isolation</li>
            <li><strong>Volume:</strong> 5-6 workouts per week</li>
            <li><strong>Intensity:</strong> High with periodization cycles</li>
          </ul>
          <p>Use periodized programming and track volume and intensity carefully. Include deload weeks.</p>
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
