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
      beginnerNutritionWomen : {
        title: "Beginner Muscle Gain Nutrition Plan for Women",
        content: `
        <ul>
           <li><strong>Calories:</strong> +200–300 kcal above maintenance</li>
           <li><strong>Macros:</strong> 45% carbs / 30% protein / 25% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Breakfast:</strong> Oats + banana + 2 eggs</li>
            <li><strong>🥗Lunch:</strong> Grilled chicken breast, quinoa, vegetables</li>
            <li><strong>🥗Snack:</strong> Greek yogurt + berries</li>
            <li><strong>🥗Dinner:</strong> Salmon + brown rice + salad</li> 
          </ul>
          <p>
            🍽️ <strong>Goal:</strong> Perfect for women looking to build muscle steadily while staying healthy.<br>
          </p>
        `
      },
      intermediateNutritionWomen : {
        title: "Intermediate Muscle Gain Nutrition Plan for Women",
        content: `
        <ul>
            <li><strong>Calories:</strong> +350–450 kcal above maintenance</li>
            <li><strong>Macros:</strong> 45% carbs / 30% protein / 25% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Breakfast:</strong> Omelette with spinach, oats, and berries</li>
            <li><strong>🥗Snack:</strong> Protein shake + mixed nuts</li>
            <li><strong>🥗Lunch:</strong> Grilled chicken or tofu, brown rice, veggies</li>
            <li><strong>🥗Pre-workout:</strong> Apple + almond butter</li>
            <li><strong>🥗Post-workout:</strong> Whey protein + banana</li>
            <li><strong>🥗Dinner:</strong> Grilled salmon + quinoa + greens</li>
        </ul>
        <p>
            🍽️ <strong>Goal:</strong> Ideal for women who have some fitness experience and want to increase muscle mass.<br>
        </p>
        `
      },
      advancedBulkWomen : {
        title: "Advanced Muscle Gain Nutrition Plan for Women",
        content: `
          <ul>
            <li><strong>Calories:</strong> +500–700 kcal above maintenance</li>
            <li><strong>Macros:</strong> 45% carbs / 30% protein / 25% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Meal 1:</strong> Oats + protein powder + berries</li>
            <li><strong>🥗Meal 2:</strong> Whole grain pasta + chicken breast + vegetables</li>
            <li><strong>🥗Meal 3 (Pre-workout):</strong> Banana + peanut butter</li>
            <li><strong>🥗Meal 4 (Post-workout):</strong> Whey protein + rice cakes</li>
            <li><strong>🥗Meal 5:</strong> Beef + sweet potatoes + broccoli</li>
            <li><strong>🥗Meal 6:</strong> Greek yogurt + almonds + fruit</li>
        </ul>
        <p>
            🍽️ <strong>Goal:</strong> Designed for advanced female athletes aiming to maximize muscle growth and recovery.<br>
        </p>
        `
      },
      beginnerCutWomen :{
        title:"Beginner Cut Plan for Women",
        content:`
        <ul>
            <li><strong>Calories:</strong> -200–300 kcal below maintenance</li>
            <li><strong>Macros:</strong> 45% carbs / 30% protein / 25% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Breakfast:</strong> Oats + berries + almond butter</li>
            <li><strong>🥗Lunch:</strong> Grilled chicken breast, quinoa, vegetables</li>
            <li><strong>🥗Snack:</strong> Greek yogurt + almonds</li>
            <li><strong>🥗Dinner:</strong> Salmon + sweet potatoes + salad</li>
        </ul>
        <p>
            🍽️ <strong>Goal:</strong> A beginner-friendly plan for steady fat loss while maintaining muscle.<br>
        </p>
        `
      },
      intermediateCutWomen :{
        title: "Intermediate Cut Plan for Women",
        content:`
       <ul>
            <li><strong>Calories:</strong> -300–400 kcal below maintenance</li>
            <li><strong>Macros:</strong> 45% carbs / 30% protein / 25% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Breakfast:</strong> Omelette with spinach, oats, and avocado</li>
            <li><strong>🥗Snack:</strong> Protein shake + mixed nuts</li>
            <li><strong>🥗Lunch:</strong> Chicken or tofu, quinoa, veggies</li>
            <li><strong>🥗Pre-workout:</strong> Apple + almond butter</li>
            <li><strong>🥗Post-workout:</strong> Whey protein + banana</li>
            <li><strong>🥗Dinner:</strong> Grilled fish + salad</li>
        </ul>
        <p>
            🍽️ <strong>Goal:</strong> For intermediate athletes looking to lose fat while building lean muscle.<br>
        </p>
        `
      },
      advancedCutWomen :{
        title: "Advanced Cut Plan for Women",
        content:`
        <ul>
            <li><strong>Calories:</strong> -400–500 kcal below maintenance</li>
            <li><strong>Macros:</strong> 40% carbs / 35% protein / 25% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Meal 1:</strong> Oats + protein powder + berries</li>
            <li><strong>🥗Meal 2:</strong> Quinoa + grilled chicken + vegetables</li>
            <li><strong>🥗Meal 3 (Pre-workout):</strong> Banana + peanut butter</li>
            <li><strong>🥗Meal 4 (Post-workout):</strong> Whey protein + rice cakes</li>
            <li><strong>🥗Meal 5:</strong> Salmon + sweet potatoes + broccoli</li>
            <li><strong>🥗Meal 6:</strong> Greek yogurt + nuts + fruit</li>
        </ul>
        <p>
            🍽️ <strong>Goal:</strong> A more aggressive fat loss program with a higher protein intake and more cardio.<br>
        </p>
        `
      },
      beginnerMaintenanceWomen : {
        title: "Beginner Maintenance Plan for Women",
        content: `
        <ul>
            <li><strong>Calories:</strong> Maintain weight at current levels</li>
            <li><strong>Macros:</strong> 40% carbs / 30% protein / 30% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Breakfast:</strong> Oats with almond butter and berries</li>
            <li><strong>🥗Lunch:</strong> Chicken breast, quinoa, salad</li>
            <li><strong>🥗Snack:</strong> Greek yogurt with mixed nuts</li>
            <li><strong>🥗Dinner:</strong> Grilled fish with sweet potatoes and steamed vegetables</li>
        </ul>
        <p>
            🍽️ <strong>Goal:</strong> Perfect for women looking to maintain their weight while ensuring balanced nutrition.<br>
        </p>
        `
      },
      intermediateMaintenanceWomen : {
        title: "Intermediate Maintenance Plan for Women",
        content: `
        <ul>
            <li><strong>Calories:</strong> Maintain weight with slight calorie adjustments</li>
            <li><strong>Macros:</strong> 40% carbs / 35% protein / 25% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Breakfast:</strong> Omelette with spinach, oats, and avocado</li>
            <li><strong>🥗Snack:</strong> Protein shake + almonds</li>
            <li><strong>🥗Lunch:</strong> Grilled salmon, quinoa, and mixed greens</li>
            <li><strong>🥗Pre-workout:</strong> Banana + peanut butter</li>
            <li><strong>🥗Post-workout:</strong> Whey protein + berries</li>
            <li><strong>🥗Dinner:</strong> Chicken or tofu, brown rice, and vegetables</li>
        </ul>
        <p>
            🍽️ <strong>Goal:</strong> Ideal for women who are active and want to maintain a balanced lifestyle with a higher protein intake.<br>
        </p>
        `
      },
      advancedMaintenanceWomen : {
        title: "Advanced Maintenance Plan for Women",
        content: `
        <ul>
            <li><strong>Calories:</strong> Maintain muscle mass with precise calorie control</li>
            <li><strong>Macros:</strong> 40% carbs / 40% protein / 20% fats</li>
        </ul>
        <ul>
            <li><strong>🥗Meal 1:</strong> Oats + protein powder + almond butter</li>
            <li><strong>🥗Meal 2:</strong> Grilled chicken + quinoa + vegetables</li>
            <li><strong>🥗Meal 3 (Pre-workout):</strong> Apple + almond butter</li>
            <li><strong>🥗Meal 4 (Post-workout):</strong> Whey protein + rice cakes</li>
            <li><strong>🥗Meal 5:</strong> Fish + sweet potatoes + salad</li>
            <li><strong>🥗Meal 6:</strong> Greek yogurt + almonds + fruit</li>
        </ul>
        <p>
            🍽️ <strong>Goal:</strong> Designed for women aiming to maintain a lean physique while sustaining muscle growth and energy.<br>
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
