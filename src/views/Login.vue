<template>
  <div class="background-image">
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
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      correctUsername: 'admin',
      correctPassword: '1234',
      rememberMe: false
    };
  },
  methods: {
  handleSubmit() {
    if (this.username === this.correctUsername && this.password === this.correctPassword) {
      localStorage.setItem('username', this.username);
      localStorage.setItem('rememberMe', this.rememberMe);
      this.$router.push('/').then(() => {
        window.location.reload(); // รีเฟรชหน้าหลังจากการเปลี่ยนเส้นทาง
      });
    } else {
      alert('Invalid username or password');
    }
  }
}

};
</script>

<style scoped>
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/bd.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.2); /* โปร่งใส */
  color: #fff; /* ทำให้ตัวหนังสือเป็นสีขาว */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
}

button {
  width: 100%;
  padding: 1rem;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 1.1rem;
  cursor: pointer;
  text-transform: uppercase;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #333;
}

.form-label {
  font-size: 1.1rem;
  color: #fff; /* ปรับสีตัวหนังสือเป็นขาว */
}

.form-check {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
}

.mb-3 {
  margin-bottom: 1.5rem;
}

.mt-3 {
  margin-top: 1.5rem;
}

a {
  color: #fff; /* ทำให้ลิงก์เป็นสีขาว */
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>