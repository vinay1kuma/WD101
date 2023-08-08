
const registrationForm = document.getElementById("registrationForm");
const userTable = document.getElementById("userTable");

registrationForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("acceptedTerms").checked;
    
    if (!isValidEmail(email)) {
        alert("Invalid email address.");
        return;
    }
    
    if (!isValidPassword(password)) {
        alert("Password must be at least 6 characters long.");
        return;
    }
    
    const age = calculateAge(dob);
    if (age < 18 || age > 55) {
        alert("Age must be between 18 and 55.");
        return;
    }
    
    const newRow = userTable.insertRow();
    newRow.insertCell(0).textContent = name;
    newRow.insertCell(1).textContent = email;
    newRow.insertCell(2).textContent = password;
    newRow.insertCell(3).textContent = dob;
    newRow.insertCell(4).textContent = acceptedTerms ? "Yes" : "No";
    
   registrationForm.reset();
    
    // Save data to local storage
    saveDataToLocalStorage(name, email, password, dob, acceptedTerms);
   
});

// Load and display data from local storage on page load
window.addEventListener("load", function() {
    const userData = loadDataFromLocalStorage();
    if (userData) {
        for (const data of userData) {
            const newRow = userTable.insertRow();
            for (const value of data) {
                const cell = newRow.insertCell();
                cell.textContent = value;
            }
        }
    }
});


function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPassword(password) {
    return password.length >= 6;
}

function calculateAge(dob) {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    return age;
}




// Save data to local storage
function saveDataToLocalStorage(name, email, password, dob, acceptedTerms) {
    const userData = JSON.parse(localStorage.getItem("userData")) || [];
    userData.push([name, email, password, dob, acceptedTerms ? "Yes" : "No"]);
    localStorage.setItem("userData", JSON.stringify(userData));
}

// Load data from local storage
function loadDataFromLocalStorage() {
    return JSON.parse(localStorage.getItem("userData"));
}






