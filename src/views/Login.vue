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
      <button type="submit" class="btn btn-primary">Login</button>
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
      correctUsername: 'admin', // ชื่อผู้ใช้ที่ถูกต้อง
      correctPassword: '1234'   // รหัสผ่านที่ถูกต้อง
    };
  },
  methods: {
    handleSubmit() {
      if (this.username === this.correctUsername && this.password === this.correctPassword) {
        // บันทึกชื่อผู้ใช้ลง localStorage
        localStorage.setItem('username', this.username);
        
        // รีเฟรชหน้า
        this.$router.push('/').then(() => {
          window.location.reload(); // รีเฟรชหน้าหลักหลังจากเปลี่ยนเส้นทาง
        });
      } else {
        alert('Invalid username or password');
      }
    }
  }
};
</script>

<style scoped>
/* ตั้งค่าพื้นหลังและการจัดตำแหน่งของ container */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60vh; /* ความสูงเต็มหน้าจอ */
  background-color: #f0f4f8; /* พื้นหลังเบาๆ */
  font-family: 'Arial', sans-serif;
}

/* กำหนดรูปแบบของฟอร์ม */
form {
  background-color: #fff; /* พื้นหลังสีขาว */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* เงาให้กับฟอร์ม */
  width: 100%;
  max-width: 400px; /* ขนาดฟอร์มไม่เกิน 400px */
}

/* ปรับปรุงหัวเรื่อง */
h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.8rem;
  color: #333;
}

/* กำหนดช่องอินพุต */
.form-control {
  width: 100%;
  padding: 0.8rem;
  margin-top: 0.5rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-control:focus {
  border-color: #007bff; /* เปลี่ยนสีของกรอบเมื่อโฟกัส */
  outline: none;
}

/* ปรับปรุงปุ่ม */
button {
  width: 100%;
  padding: 1rem;
  background-color: #007bff; /* สีฟ้า */
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #0056b3; /* สีฟ้าเข้มเมื่อวางเมาส์ */
}

/* ปรับปรุง label */
.form-label {
  font-size: 1.1rem;
  color: #555;
}

/* เพิ่มช่องว่างระหว่างแต่ละส่วน */
.mb-3 {
  margin-bottom: 1.2rem;
}
</style>