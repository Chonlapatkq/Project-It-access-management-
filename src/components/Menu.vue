<template>
  <div>
    <!-- Navbar (แถบด้านบน) -->
    <nav v-if="!isLoginPage" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand">Digital IT Asset Management</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
  <li class="nav-item">
    <router-link to="/" class="nav-link">Dashboard</router-link>
  </li>
  <!-- แสดงเมนูอื่นเมื่อผู้ใช้ล็อกอิน -->
  <template v-if="isLoggedIn">
    <li class="nav-item">
      <router-link to="/register" class="nav-link">Asset Register</router-link>
    </li>
    <li class="nav-item">
      <router-link to="/list" class="nav-link">Asset List</router-link>
    </li>
  </template>
</ul>

          <!-- Login/Logout Button (แสดงปุ่มตามสถานะการล็อกอิน) -->
          <div class="navbar-nav ms-auto">
            <!-- แสดงปุ่ม Username และ Logout ถ้าผู้ใช้ล็อกอิน -->
            <li class="nav-item" v-if="isLoggedIn">
              <span class="navbar-text me-3">{{ username }}</span>
              <button class="btn btn-danger" @click="handleLogout">Logout</button>
            </li>
            <!-- แสดงปุ่ม Login และ Sign Up ถ้าผู้ใช้ยังไม่ได้ล็อกอิน -->
            <li class="nav-item" v-else>
              <router-link to="/login" class="btn btn-primary me-2">Admin Login</router-link>
            </li>
          </div>
        </div>
      </div>
    </nav>
    
  </div>
</template>

<script>
export default {
  name: "Menu",
  data() {
    return {
      sidebarOpen: false, // สถานะของ Sidebar
      username: '', // ชื่อผู้ใช้
      isLoggedIn: false, // สถานะการล็อกอิน
    };
  },
  computed: {
    // ตรวจสอบว่าหน้าเป็น /login หรือไม่
    isLoginPage() {
      return this.$route.path === '/login';
    },
  },
  mounted() {
    // ตรวจสอบสถานะการล็อกอินเมื่อหน้าโหลด
    this.checkLoginStatus();
  },
  methods: {
    checkLoginStatus() {
      const user = localStorage.getItem('username');
      if (user) {
        this.isLoggedIn = true;
        this.username = user;
      } else {
        this.isLoggedIn = false;
        this.username = '';
      }
    },
    handleLogin(username) {
      localStorage.setItem('username', username); // บันทึกชื่อผู้ใช้ใน localStorage
      this.checkLoginStatus(); // อัปเดตสถานะล็อกอิน
      this.$router.push('/'); // เปลี่ยนเส้นทางไปหน้า Home หลังจากล็อกอิน
    },
    handleLogout() {
      localStorage.removeItem('username'); // ลบข้อมูลผู้ใช้จาก localStorage
      this.checkLoginStatus(); // อัปเดตสถานะล็อกอิน
      this.$router.push('/login'); // ส่งผู้ใช้ไปหน้า Login หลังจาก logout
    },
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen; // สลับสถานะการแสดง Sidebar
    },
  },
};
</script>



<style scoped>
/* Toggle Button Styling */
#toggle-btn {
  position: absolute;
  top: 40px; /* ปรับตำแหน่งปุ่ม */
  left: 120px;
  z-index: 1050;
  font-size: 0.5rem; /* ลดขนาดฟอนต์ */
  padding: 2.5px 5px; /* ลดขนาดปุ่ม */
}

/* Sidebar Styling */
.sidebar {
  position: fixed;
  top: 0;
  left: -300px; /* ลดขนาด Sidebar */
  width: 50px; /* ปรับขนาด Sidebar */
  height: 100%;
  background-color: black;
  color: white;
  padding-top: 20px;
  transition: left 0.3s ease;
  z-index: 1000;
}

.sidebar-open {
  left: 0; /* Sidebar will move to the left */
}

.sidebar ul {
  padding-left: 0;
}

.sidebar li {
  padding: 15px 10px; /* เพิ่มพื้นที่ระหว่างไอคอน */
  text-align: center;
}

.sidebar li a {
  text-decoration: none;
  color: white;
  font-size: 1.4rem; /* เพิ่มขนาดไอคอน */
}

.sidebar li a:hover {
  color: #42b983;
}

/* Content Styling */
.content {
  padding: 20px;
  transition: margin-left 0.3s ease;
}

.content-shifted {
  margin-left: 200px; /* Shift content to the right when sidebar is open */
}

/* Navbar Styling */
nav .navbar {
  font-size: 0.9rem; /* ปรับขนาดเมนูด้านบนให้เล็กลง */
}

nav .navbar-brand {
  font-size: 1.2rem;
  font-weight: bold;
}

nav .nav-link {
  font-size: 1rem;
  color: white;
}

nav .nav-link:hover {
  color: #42b983;
}

nav .nav-link.router-link-exact-active {
  color: #42b983 !important;
}

/* Responsive Design */
@media (max-width: 768px) {
  .sidebar {
    width: 180px; /* ลดขนาด sidebar ในมือถือ */
  }

  .content-shifted {
    margin-left: 180px;
  }
}
  /* ปรับตำแหน่งของปุ่ม */
#toggle-btn {
  position: absolute;
  top: 60px; /* ปรับตำแหน่งปุ่ม */
  left: 20px; 
  z-index: 1050;
  font-size: 1.5rem;
  transition: left 0.3s ease; /* เพิ่มการทำให้ปุ่มขยับได้ */
}

/* เมื่อ Sidebar เปิด */
.content-shifted #toggle-btn {
  left: 85px; /* ปรับขยับปุ่มไปทางขวาเมื่อ Sidebar เปิด */
}
.navbar {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.navbar-text {
  font-weight: bold;
}
  </style>
  