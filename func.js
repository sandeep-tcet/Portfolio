document.getElementById("registrationForm").addEventListener("submit", function (event) {
  event.preventDefault();

  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();
  let confirmPassword = document.getElementById("confirmPassword").value.trim();
  let age = document.getElementById("age").value.trim();
  let errorMessage = document.getElementById("error-message");

  // Basic validation
  if (name === "" || email === "" || password === "" || confirmPassword === "" || age === "") {
    errorMessage.textContent = "All fields are required.";
    return;
  }

  // Email format check
  let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (!email.match(emailPattern)) {
    errorMessage.textContent = "Please enter a valid email address.";
    return;
  }

  // Password length
  if (password.length < 6) {
    errorMessage.textContent = "Password must be at least 6 characters.";
    return;
  }

  // Password match
  if (password !== confirmPassword) {
    errorMessage.textContent = "Passwords do not match.";
    return;
  }

  // Age validation
  if (age < 18) {
    errorMessage.textContent = "You must be at least 18 years old.";
    return;
  }

  // If all good - Now send data to Google Sheets
  errorMessage.style.color = "green";
  errorMessage.textContent = "Submitting...";

  const scriptURL = "https://script.google.com/macros/s/AKfycbxeexK0DiQkvm3tqw8e1l3fNSDxm26ShqlbgfYmT5mBDHhJHPx3yAACwKB5MRfBB7Wt/exec";

  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  formData.append("age", age);

  fetch(scriptURL, { method: "POST", body: formData })
    .then(response => {
      errorMessage.textContent = "Registration successful!";
      document.getElementById("registrationForm").reset();
    })
    .catch(error => {
      errorMessage.style.color = "red";
      errorMessage.textContent = "Error submitting form!";
      console.error("Error!", error);
    });
});
