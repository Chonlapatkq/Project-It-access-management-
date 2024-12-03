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
  background-image: url('@/assets/bc.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

<style scoped>
.background-image {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('@/assets/bc.jpg');
  background-size: cover;
  background-position: center;
  z-index: -1;
}

.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: rgba(255, 255, 255, 0.8); /* เปลี่ยนพื้นหลังให้โปร่งใสน้อยลง */
  color: #000; /* เปลี่ยนสีตัวหนังสือใน login-container เป็นสีดำ */
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
}

button {
  width: 100%;
  padding: 1rem;
  background-color: #000; /* พื้นหลังปุ่มสีดำ */
  color: #fff; /* ตัวอักษรในปุ่มสีขาว */
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
  color: #000; /* ตัวอักษรใน label เป็นสีดำ */
}

.form-check {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #000; /* ตัวอักษร checkbox เป็นสีดำ */
}

.mb-3 {
  margin-bottom: 1.5rem;
  color: #000; /* ข้อความภายใน margin-bottom เป็นสีดำ */
}

.mt-3 {
  margin-top: 1.5rem;
  color: #000; /* ข้อความภายใน margin-top เป็นสีดำ */
}

a {
  color: #007bff; /* เปลี่ยน Register here เป็นสีฟ้า (มาตรฐาน Bootstrap) */
  text-decoration: none;
}

a:hover {
  text-decoration: underline; /* เพิ่มเส้นใต้เมื่อ hover */
}
</style>
