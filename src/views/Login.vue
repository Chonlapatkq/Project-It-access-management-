<template>
  <div class="login-container">
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <h2>Login</h2>
        <label for="username" class="form-label">Username</label>
        <input type="text" id="username" class="form-control" v-model="username" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Password</label>
        <input type="password" id="password" class="form-control" v-model="password" required />
      </div>
      <div class="mb-3">
        <div class="form-check">
          <input type="checkbox" class="form-check-input" id="rememberMe" v-model="rememberMe" />
          <label class="form-check-label" for="rememberMe">Remember me</label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Login</button>
      <div class="mt-3">
        <p>Don't have an account? <a href="/register">Register here</a></p>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      correctUsername: 'admin', // Correct username
      correctPassword: '1234',  // Correct password
      rememberMe: false        // Store the "Remember me" value
    };
  },
  methods: {
    handleSubmit() {
      if (this.username === this.correctUsername && this.password === this.correctPassword) {
        // Save username and remember me option in localStorage
        localStorage.setItem('username', this.username);
        localStorage.setItem('rememberMe', this.rememberMe);
        
        // Redirect to home page
        this.$router.push('/').then(() => {
          window.location.reload(); // Reload after route change
        });
      } else {
        alert('Invalid username or password');
      }
    }
  },
  mounted() {
    // Add class to body when entering the page
    document.body.classList.add('login-page');
  },
  beforeDestroy() {
    // Remove class from body when leaving the page
    document.body.classList.remove('login-page');
  }
};
</script>

<style>
/* Global style for login background */
body.login-page {
  background: url('@/assets/bg.jpg') no-repeat center center fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  font-family: 'Arial', sans-serif;
  height: 100vh;
}
</style>

<style scoped>
/* Center the login form container */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  max-width: 400px; /* Reduce the max width */
  height: auto;
  backdrop-filter: blur(5px); /* Apply blur effect to the background */
  background-color: rgba(255, 255, 255, 0.3); /* More transparent background */
  padding: 20px; /* Reduce padding */
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

/* Form styles */
form {
  background-color: rgba(255, 255, 255, 0.3); /* Even more transparent with blur */
  padding: 2rem; /* Reduce padding */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 100%;
  max-width: 100%;
  backdrop-filter: blur(15px); /* Apply blur effect to the form background */
}

/* Title style */
h2 {
  text-align: center;
  margin-bottom: 1rem; /* Reduce margin */
  font-size: 1.8rem; /* Reduce font size */
  color: #333;
}

/* Input styles */
.form-control {
  width: 100%;
  padding: 1rem;
  margin-top: 0.5rem;
  margin-bottom: 1.2rem; /* Reduce margin */
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #007bff;
  outline: none;
}

/* Button styles - black with white text */
button {
  width: 100%;
  padding: 1rem;
  background-color: #000; /* Black background */
  color: #fff; /* White text */
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  text-transform: uppercase; /* Make text uppercase */
  transition: background-color 0.3s;
}

button:hover {
  background-color: #333; /* Darker black when hovered */
}

/* Label style */
.form-label {
  font-size: 1.1rem;
  color: #555;
}

/* Checkbox styles */
.form-check {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 8px; /* Space between checkbox and label */
}

/* Margin for spacing */
.mb-3 {
  margin-bottom: 1.5rem;
}

.mt-3 {
  margin-top: 1.5rem;
}

/* Link style for Register prompt */
a {
  color: #007bff;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>
