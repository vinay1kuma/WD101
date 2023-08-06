document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("terms").checked;

    // Validate email and age
    // (Implement your email and age validation logic here)
    const validAge = calculateAge(dob) >= 18 && calculateAge(dob) <= 55;
    const validEmail = validateEmail(email);

    if (validAge && validEmail) {
        addEntry(name, email, dob, acceptedTerms);
        form.reset();
    } else {
        alert('Invalid email address or age must be between 18 and 55.');
    }

function calculateAge(dateString) {
    const today = new Date();
    const dob = new Date(dateString);
    let age = today.getFullYear() - dob.getFullYear();
    const monthDifference = today.getMonth() - dob.getMonth();

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < dob.getDate())) {
        age--;
    }

    return age;
}

function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}






    // Create an object to store the user data
    const user = {
      name: name,
      email: email,
      password: password,
      dob: dob,
      acceptedTerms: acceptedTerms
    };

    // Retrieve existing data from localStorage or initialize an empty array
    const storedData = JSON.parse(localStorage.getItem("userData")) || [];

    // Add the new user to the data array
    storedData.push(user);

    // Save the updated data back to localStorage
    localStorage.setItem("userData", JSON.stringify(storedData));

    // Update the table with the new user entry
    updateTable(storedData);
  });

  function updateTable(data) {
    const tableBody = document.querySelector("#userTable tbody");
    tableBody.innerHTML = "";

    data.forEach(user => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.acceptedTerms ? "Yes" : "No"}</td>
      `;
      tableBody.appendChild(row);
    });
  }

  // Load the existing data from localStorage on page load
  const storedData = JSON.parse(localStorage.getItem("userData")) || [];
  updateTable(storedData);
  
 
