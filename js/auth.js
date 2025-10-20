let users = JSON.parse(localStorage.getItem("users")) || [];

function register(event){
    event.preventDefault();
    
    const message = document.getElementById("reg-message");
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;
    
    message.textContent = "";
    if(!username || !password){
        message.textContent = "Please fill in all fields!";
        message.style.color = "#ff4d4d";
        return;
    }
    if(users.find(u => u.username === username)){
        message.textContent = "Username already exists!";
        message.style.color = "#ff4d4d";
        return;
    }

    users.push({username, password});
    localStorage.setItem("users", JSON.stringify(users));
    message.textContent = "Registration successful! Log in.";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1500);
}

function login(event){
    event.preventDefault();

    const message = document.getElementById("log-message");
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    message.textContent = "";

    const user  = users.find(u => u.username === username && u.password === password)
    if(!user){ 
       message.textContent = "Wrong username or password!";
       message.style.color = "#ff4d4d";
        return;
    }

    localStorage.setItem("currentUser", username)
    setTimeout(() => {
        window.location.href = "dashboard.html";
    }, 500)
}