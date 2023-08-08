document.getElementById("registrationForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const dob = document.getElementById("dob").value;
    const acceptedTerms = document.getElementById("terms").checked;
    registrationForm.reset();

    // Validate email and age
    // (Implement your email and age validation logic here)
     
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

   //  Update the table with the new user entry
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


  // Load the existing data from localStorage on page load
  const storedData = JSON.parse(localStorage.getItem("userData")) || [];
  updateTable(storedData);
  localStorage.clear();
