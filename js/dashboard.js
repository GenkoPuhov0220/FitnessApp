let currentUser = localStorage.getItem("currentUser");
if(!currentUser){
  window.location.href ="login.html"
}
document.getElementById("welcome").textContent = `Welcome, ${currentUser}!`;


document.addEventListener('DOMContentLoaded', () => {
  const user = localStorage.getItem("currentUser");

  if (!user) {
    window.location.href = "login.html";
  } else {
    const userSpan = document.getElementById("user-name");
    if (userSpan) {
      userSpan.textContent = user;
    }
  }
});

//function logout() {
  //localStorage.removeItem("currentUser");
 // window.location.href = "index.html";
//}
