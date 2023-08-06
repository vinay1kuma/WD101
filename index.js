const form = document.getElementById('registrationForm');
const entriesTable = document.getElementById('entriesTable');
let entries = [];

function addEntry(name, email, dob, acceptedTerms) {
    entries.push({ name, email, dob, acceptedTerms });
    updateTable();
}

function updateTable() {
    const tableRows = entries.map(entry => `
        <tr>
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.dob}</td>
            <td>${entry.acceptedTerms ? 'Yes' : 'No'}</td>
        </tr>
    `).join('');

    entriesTable.innerHTML = `
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Accepted Terms</th>
        </tr>
        ${tableRows}
    `;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const dob = document.getElementById('dob').value;
    const acceptedTerms = document.getElementById('acceptTerms').checked;

    // Add validation for age (between 18 and 55) and email format here
    const validAge = calculateAge(dob) >= 18 && calculateAge(dob) <= 55;
    const validEmail = validateEmail(email);

    if (validAge && validEmail) {
        addEntry(name, email, dob, acceptedTerms);
        form.reset();
    } else {
        alert('Invalid email address or age must be between 18 and 55.');
    }
});

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
