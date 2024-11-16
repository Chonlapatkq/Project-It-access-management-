<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
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
      password: ''
    };
  },
  methods: {
    handleSubmit() {
      // ตรวจสอบข้อมูลการล็อกอิน (ในตัวอย่างนี้ใช้ข้อมูลที่ไม่จริง)
      if (this.username && this.password) {
        // บันทึกชื่อผู้ใช้ใน localStorage
        localStorage.setItem('username', this.username);
        // เปลี่ยนเส้นทางกลับไปที่หน้า Home
        this.$router.push('/');
      }
    }
  }
};
</script>
