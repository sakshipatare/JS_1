let users = JSON.parse(localStorage.getItem("users")) || [];

// npx http-server

// REGISTER
function handleRegister(event) {

    event.preventDefault();

    const username = document.getElementById("regUsername").value;
    const password = document.getElementById("regPassword").value;
    const confirmPassword = document.getElementById("regConfirmPassword").value;
    const error = document.getElementById("registerError");

    console.log(document.getElementById("regUsername"));

    if (users.find(u => u.username === username)) {
        error.textContent = "Username already exists";
        return false;
    }

    if (password !== confirmPassword) {
        error.textContent = "Passwords do not match";
        return false;
    }

    users.push({username, password});

    localStorage.setItem("users", JSON.stringify(users));

    console.log("Registered users:", users);

    alert("Registration successful!");

    window.location.href = "index.html";

    return false;
}



// LOGIN
function handleLogin(event){

    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const error = document.getElementById("loginError");

    const user = users.find(u => u.username === username && u.password === password);

    if(user){

        localStorage.setItem("currentUser", username);

        console.log("Logged in:", username);

        window.location.href = "home.html";

    }else{

        error.textContent = "Invalid username or password";
    }

    return false;
}



// CHECK AUTH
function checkAuth(){

    const currentUser = localStorage.getItem("currentUser");

    const protectedDiv = document.getElementById("protectedContent");
    const loginPrompt = document.getElementById("loginPrompt");

    if(currentUser){

        if(protectedDiv){
            protectedDiv.style.display = "block";
        }

        if(loginPrompt){
            loginPrompt.style.display = "none";
        }
    }
}

// GENERATE RANDOM COLOR
function getRandomColor() {

    const letters = "0123456789ABCDEF";
    let color = "#";

    for(let i = 0; i < 6; i++){
        color += letters[Math.floor(Math.random() * 16)]; //round off
    }

    return color;
}



// START BUTTON
function startColor(){

    const boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {

        const randomColor = getRandomColor();

        box.style.backgroundColor = randomColor;

    });

}



// RESET BUTTON
function resetColor(){

    const boxes = document.querySelectorAll(".box");

    boxes.forEach(box => {

        box.style.backgroundColor = "white";

    });

}


// LOGOUT
function logout(){

    localStorage.removeItem("currentUser");
    localStorage.clear();
    window.location.href = "index.html";
}



// RUN ON PAGE LOAD
document.addEventListener("DOMContentLoaded", checkAuth); 
//DOMContentLoaded ensures that JavaScript runs only after the HTML DOM has fully loaded, 
// so we can safely access elements using getElementById or other DOM methods.