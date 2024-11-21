<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">รายการสินค้า</h1>
    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Asset ID</th>
          <th>Serial Number</th>
          <th>ชื่อสินค้า</th>
          <th>ราคา (บาท)</th>
          <th>รุ่นสินค้า</th>
         
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ product.assetId }}</td>
          <td>{{ product.serialNumber }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.price }}</td>
          <td>{{ product.model }}</td>
          <td>
            <!-- แสดงปุ่ม "แก้ไข" และ "ลบ" เฉพาะเมื่อผู้ใช้ล็อกอิน -->
            <button v-if="isLoggedIn" class="btn btn-warning btn-sm" @click="editProduct(index)">แก้ไข</button>
            <button v-if="isLoggedIn" class="btn btn-danger btn-sm" @click="deleteProduct(index)">ลบ</button>
            <!-- ถ้าไม่ได้ล็อกอิน จะไม่แสดงปุ่ม -->
            <span v-else>กรุณาล็อกอินเพื่อดำเนินการ</span>
          </td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="8" class="text-center">ยังไม่มีข้อมูลสินค้า</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ProductList",
  data() {
    return {
      products: JSON.parse(localStorage.getItem('products')) || [],
      username: '', // ชื่อผู้ใช้
      isLoggedIn: false, // สถานะการล็อกอิน
    };
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
    deleteProduct(index) {
      const products = this.products;
      if (confirm('คุณต้องการลบสินค้านี้ใช่ไหม?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        this.$router.go(0); // รีเฟรชหน้าใหม่
      }
    },
    editProduct(index) {
      const product = this.products[index];
      this.$router.push({ path: '/edit-product', query: { product: JSON.stringify(product), index } });
    },
  },
};
</script>
