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
      beginnerNutrition: {
        title: "Beginner Muscle Gain Nutrition Plan",
        content: `
        <ul>
            <li><strong>Calories:</strong>+300–400 kcal above maintenance</li>
            <li><strong>Macros:</strong>40% carbs / 30% protein / 30% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Breakfast:</strong> Oats + banana + 2 eggs</li>
            <li><strong>🥗Lunch:</strong> Chicken breast, rice, vegetables</li>
            <li><strong>🥗Snack:</strong> Protein shake + peanut butter</li>
            <li><strong>🥗Dinner:</strong> Lean beef + potatoes + salad</li>  
          </ul>
          <p>
            🍽️ <strong>Goal:</strong>Perfect for beginners who want steady muscle growth.<br>
          </p>
        `
      },
      intermediateNutrition: {
        title: "Intermediate Muscle Gain Nutrition Plan",
        content: `
        <ul>
            <li><strong>Calories:</strong> +450–600 kcal above maintenance</li>
            <li><strong>Macros:</strong> 45% carbs / 30% protein / 25% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Breakfast:</strong> Omelet (4 eggs), oats, berries</li>
            <li><strong>🥗Snack:</strong> Yogurt + honey + nuts</li>
            <li><strong>🥗Lunch:</strong> Rice + salmon or chicken</li>
            <li><strong>🥗Pre-workout:</strong> Banana + rice cake</li>
            <li><strong>🥗Post-workout:</strong> Whey protein + banana</li>
            <li><strong>🥗Dinner:</strong> Pasta + beef + salad</li>
        </ul>
        <p>
            🍽️ <strong>Goal:</strong>Ideal for lifters with 1–2 years of consistent training.<br>
        </p>
        `
      },
      advancedBulk: {
        title: "Advanced Muscle Gain Nutrition Plan",
        content: `
          <ul>
            <li><strong>Calories:</strong> +600–800 kcal above maintenance</li>
            <li><strong>Macros:</strong> 45% carbs / 30% protein / 25% fats</li>
          </ul>
          <ul>
            <li><strong>🥗Meal 1:</strong> Oats + 40g whey + 2 bananas</li>
            <li><strong>🥗Meal 2:</strong> Pasta + chicken + parmesan</li>
            <li><strong>🥗Meal 3 (Pre-workout):</strong> Rice + honey + banana</li>
            <li><strong>🥗Meal 4 (Post-workout):</strong> Whey + rice flour</li>
            <li><strong>🥗Meal 5:</strong> Beef + potatoes</li>
            <li><strong>🥗Meal 6:</strong> Greek yogurt + nuts + fruit</li>
          </ul>
          <p>
            🍽️ <strong>Goal:</strong>Designed for advanced athletes focusing on maximum hypertrophy.<br>
          </p>
        `
      },
      beginnerCutMen:{
        title:"Beginner Fat Loss Nutrition Plan",
        content:`
        <ul>
           <li><strong>Calories:</strong> 300–400 kcal below maintenance</li>
           <li><strong>Macros:</strong> 40% protein / 35% carbs / 25% fats</li>
        </ul>
        <ul>
          <li><strong>🥗Breakfast:</strong> Oats + whey + blueberries</li>
          <li><strong>🥗Snack:</strong> Greek yogurt (low-fat)</li>
          <li><strong>🥗Lunch:</strong> Chicken breast + rice + vegetables</li>
          <li><strong>🥗Snack:</strong> Apple + almonds</li>
          <li><strong>🥗Dinner:</strong> White fish + salad</li>
        </ul>
        <p>
          🍽️ <strong>Goal:</strong>Perfect for beginners who want steady, safe fat loss.<br>
        </p>
       `
      },
      intermediateCutMen:{
        title: "Intermediate Fat Loss Nutrition Plan",
        content:`
        <ul>
          <li><strong>Calories:</strong> 450–600 kcal below maintenance</li>
          <li><strong>Macros:</strong> 45% protein / 30% carbs / 25% fats</li>
        </ul>
        <ul>
          <li><strong>🥗Breakfast:</strong> Omelet (3 eggs) + vegetables</li>
          <li><strong>🥗Snack:</strong> Cottage cheese + berries</li>
          <li><strong>🥗Lunch:</strong> Turkey or chicken + quinoa + broccoli</li>
          <li><strong>🥗Pre-workout:</strong> Rice cake + peanut butter (thin layer)</li>
          <li><strong>🥗Post-workout:</strong> Whey protein + water</li>
          <li><strong>🥗Dinner:</strong> Salmon (small portion) + green salad</li>
        </ul>
        <p>
          🍽️ <strong>Goal:</strong>Ideal for intermediate lifters wanting faster, visible fat loss.<br>
        </p>
        `
      },
      advancedCutMen:{
        title: "Advanced Fat Loss Nutrition Plan",
        content:`
        <ul>
          <li><strong>Calories:</strong> 600–800 kcal below maintenance</li>
          <li><strong>Macros:</strong> 50% protein / 30% carbs / 20% fats</li>
        </ul>
        <ul>
          <li><strong>🥗Meal 1:</strong> Egg whites + oats (small portion)</li>
          <li><strong>🥗Meal 2:</strong> Chicken + greens + avocado (small)</li>
          <li><strong>🥗Meal 3 (Pre-workout):</strong> Rice + tuna (light portion)</li>
          <li><strong>🥗Meal 4 (Post-workout):</strong> Whey isolate + berries</li>
          <li><strong>🥗Meal 5:</strong> Lean beef or turkey + vegetables</li>
          <li><strong>🥗Meal 6:</strong> Casein + nuts (very small handful)</li>
        </ul>
        <p>
          🍽️ <strong>Goal:</strong>Designed for advanced lifters targeting maximum definition and minimum body fat.<br>
        </p>
        `
      },
      beginnerMaintenanceMen: {
        title: "Beginner Maintenance Nutrition Plan",
        content: `
        <ul>
          <li><strong>Calories:</strong> TDEE ± 0 (exact maintenance)</li>
          <li><strong>Macros:</strong> 40% carbs / 30% protein / 30% fats</li>
        </ul>

        <ul>
          <li><strong>🥗Breakfast:</strong> Oats + banana + yogurt</li>
          <li><strong>🥗Snack:</strong> Nuts + apple</li>
          <li><strong>🥗Lunch:</strong> Chicken breast + rice + vegetables</li>
          <li><strong>🥗Snack:</strong> Protein shake</li>
          <li><strong>🥗Dinner:</strong> Fish or lean beef + salad</li>
        </ul>

        <p>
          🍽️ <strong>Goal:</strong>Perfect for beginners who want to maintain weight with clean eating.<br>
        </p>
        `
      },
      intermediateMaintenanceMen: {
        title: "Intermediate Maintenance Nutrition Plan",
        content: `
        <ul>
          <li><strong>Calories:</strong> TDEE ± 0 with stable daily intake</li>
          <li><strong>Macros:</strong> 45% carbs / 30% protein / 25% fats</li>
        </ul>

        <ul>
          <li><strong>🥗Breakfast:</strong> Omelet (3 eggs) + oats + berries</li>
          <li><strong>🥗Snack:</strong> Cottage cheese + honey</li>
          <li><strong>🥗Lunch:</strong> Turkey or chicken + quinoa + vegetables</li>
          <li><strong>🥗Pre-workout:</strong> Rice cake + peanut butter</li>
          <li><strong>🥗Post-workout:</strong> Whey protein + fruit</li>
          <li><strong>🥗Dinner:</strong> Salmon + potatoes + salad</li>
        </ul>

        <p>
          🍽️ <strong>Goal:</strong>Ideal for active men wanting stable energy and performance.<br>
        </p>
        `
      },
      advancedMaintenanceMen: {
        title: "Advanced Maintenance Nutrition Plan",
        content: `
        <ul>
          <li><strong>Calories:</strong> TDEE ± 0 but split precisely across all meals</li>
          <li><strong>Macros:</strong> 40% carbs / 35% protein / 25% fats</li>
        </ul>

        <ul>
          <li><strong>🥗Meal 1:</strong> Oats + whey + berries</li>
          <li><strong>🥗Meal 2:</strong> Chicken + rice + vegetables</li>
          <li><strong>🥗Meal 3:</strong> Greek yogurt + nuts</li>
          <li><strong>🥗Meal 4 (Pre-workout):</strong> Rice + banana</li>
          <li><strong>🥗Meal 5 (Post-workout):</strong> Whey isolate + honey</li>
          <li><strong>🥗Meal 6:</strong> Salmon or lean beef + salad</li>
        </ul>

        <p>
          🍽️ <strong>Goal:</strong>Designed for advanced lifters aiming to maintain muscle and performance year-round.<br>
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
