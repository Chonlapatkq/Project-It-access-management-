<template>
  <div class="background-image">
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
          <th>การจัดการ</th>
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

<style scoped>
/* ให้ body และ html ครอบคลุมหน้าจอทั้งหมดโดยไม่มี margin หรือ padding */
html, body {
  height: 100%;       
  margin: 0;          
  padding: 0;         
  overflow: auto;     
  background-color: transparent;  
  box-sizing: border-box;  
}

/* การตั้งค่าภาพพื้นหลัง */
.background-image {
  position: absolute;  
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;     
  background-image: url('@/assets/bh.jpg');
  background-size: cover;  
  background-position: center center;  
  background-repeat: no-repeat;  
  z-index: -1;      
}

/* หัวข้อ */
h1.text-center {
  color: white; /* เปลี่ยนสีข้อความให้เป็นขาว */
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3); /* เพิ่มเงาให้ข้อความ */
}

/* การตั้งค่าตาราง */
table {
  width: 100%;
  margin-top: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* เพิ่มเงาให้กับตาราง */
}

/* เพิ่มพื้นหลังให้ thead */
thead.table-dark {
  background-color: #343a40;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2);
}

/* การตั้งค่า thead */
thead.table-dark {
  background-color: #343a40; /* เพิ่มพื้นหลังสีเข้มให้หัวตาราง */
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.2); /* เพิ่มเงาให้ข้อความในหัวตาราง */
}

/* ปุ่ม "แก้ไข" และ "ลบ" */
button {
  border: none;
  padding: 8px 15px;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15); /* เพิ่มเงาให้ปุ่ม */
  margin-right: 8px; /* เพิ่มระยะห่างระหว่างปุ่ม */
}

button:hover {
  background-color: #0056b3;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* เพิ่มเงาเมื่อ hover */
}

button:focus {
  outline: none;
}

/* ปุ่ม "ลบ" */
button.btn-danger {
  background-color: #dc3545; /* สีพื้นหลังปุ่มลบ */
}

button.btn-danger:hover {
  background-color: #c82333;
}

/* เพิ่มแถวในกรณีที่ไม่มีข้อมูลสินค้า */
tr.v-if-no-data td {
  text-align: center;
  font-size: 16px;
  color: #888;
  font-style: italic;
  padding: 20px;
}

h1.text-center {
  margin-top: 100px; /* เพิ่มระยะห่างจากด้านบน */
}


</style>
