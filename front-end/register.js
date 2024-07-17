document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const registerForm = document.getElementById('registerForm');
  
    // Function to handle form submission
    const handleRegister = (event) => {
      event.preventDefault();
  
      // Gather form data
      const name = document.getElementById('registerName').value;
      const email = document.getElementById('registerEmail').value;
      const password = document.getElementById('registerPassword').value;
  
      // Basic validation (more sophisticated validation can be added)
      if (name === '' || email === '' || password === '') {
        alert('All fields are required.');
        return;
      }
  
      // Placeholder for server interaction
      // Replace this with an actual API call
      const mockRegisterApi = (name, email, password) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({ success: true, message: 'User registered successfully' });
          }, 1000);
        });
      };
  
      // Register user (simulate server call)
      mockRegisterApi(name, email, password)
        .then((response) => {
          if (response.success) {
            alert(response.message);
            // Redirect to login page or home page
            window.location.href = 'login.html';
          } else {
            alert('Registration failed: ' + response.message);
          }
        })
        .catch((error) => {
          alert('An error occurred: ' + error.message);
        });
    };
  
    // Event listener for form submission
    registerForm.addEventListener('submit', handleRegister);
  });
  