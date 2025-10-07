let users = JSON.parse(localStorage.getItem("users")) || [];

function register(){
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;

    if(!username || !password){
        alert("Fill in all fields!")
    }
    if(users.find(u => u.username === username)){
        alert("Username already exists!")
    }

    users.push({username, password});
    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful! Log in.")
    window.location.href = "login.html";
}

function login(){
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    const user  = users.find(u => u.username === username && u.password === password)

    if(!user){ 
        alert("Wrong username or password!");
        return;
    }

    localStorage.setItem("currentUser", username)
    window.location.href = "app.html";
}