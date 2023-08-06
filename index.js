document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("myForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!validateName(name)) {
            alert("Please enter a valid name.");
            return;
        }

        if (!validateEmail(email)) {
            alert("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(password)) {
            alert("Password must be at least 8 characters long.");
            return;
        }

        alert("Form submitted successfully!");
        form.reset();
    });

    function validateName(name) {
        return name.trim() !== "";
    }

    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function validatePassword(password) {
        return password.length >= 8;
    }
});