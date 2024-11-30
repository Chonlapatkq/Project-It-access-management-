<template>
  <div class="background-image">
    <div class="container mt-5">
      <h1 class="text-center mb-4 text-black">รายการสินค้า</h1>

      <div class="row mb-4">
  <!-- การ์ดแสดงข้อมูลราคาสินค้า -->
  <div class="col-md-6">
    <div class="card">
      <div class="card-header text-center">ข้อมูลราคา</div>
      <div class="card-body chart-container">
        <canvas id="pricePieChart" style="max-width: 400px; max-height: 400px;"></canvas>
      </div>
    </div>
  </div>

  <!-- การ์ดแสดงข้อมูลจำนวนสินค้า -->
  <div class="col-md-6">
    <div class="card">
      <div class="card-header text-center">ข้อมูลจำนวนสินค้า</div>
      <div class="card-body chart-container">
        <canvas id="quantityPieChart" style="max-width: 400px; max-height: 400px;"></canvas>
      </div>
    </div>
  </div>
</div>


      <!-- ตารางแสดงสินค้าตามลำดับ -->
      <div v-if="products.length > 0">
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
            </tr>
            <tr v-if="products.length === 0">
              <td colspan="8" class="text-center">ยังไม่มีข้อมูลสินค้า</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { Chart } from 'chart.js';
import { PieController, ArcElement, Tooltip, Legend } from 'chart.js';

// Register necessary components from Chart.js
Chart.register(PieController, ArcElement, Tooltip, Legend);

export default {
  name: "ProductList",
  data() {
    return {
      products: JSON.parse(localStorage.getItem('products')) || [],
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkLoginStatus();
    this.renderCharts();

    // เพิ่ม class "dashboard-page" ให้กับ body เมื่อหน้า Dashboard ถูกโหลด
    document.body.classList.add('dashboard-page');
  },
  beforeDestroy() {
    // ลบ class "dashboard-page" เมื่อหน้า Dashboard ถูกทำลาย
    document.body.classList.remove('dashboard-page');
  },
  methods: {
    checkLoginStatus() {
      const user = localStorage.getItem('username');
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    },
    renderCharts() {
      // Step 1: Prepare data for Price Pie Chart
      const priceData = this.calculatePriceData();
      // Step 2: Prepare data for Quantity Pie Chart
      const quantityData = this.calculateQuantityData();

      // Step 3: Render Price Pie Chart
      const priceCtx = document.getElementById('pricePieChart').getContext('2d');
      new Chart(priceCtx, {
        type: 'pie',
        data: priceData,
      });

      // Step 4: Render Quantity Pie Chart
      const quantityCtx = document.getElementById('quantityPieChart').getContext('2d');
      new Chart(quantityCtx, {
        type: 'pie',
        data: quantityData,
      });
    },
    calculatePriceData() {
      // Calculate total price per product name
      const priceMap = this.products.reduce((acc, product) => {
        const name = product.name;
        if (!acc[name]) {
          acc[name] = 0;
        }
        acc[name] += product.price;
        return acc;
      }, {});

      // Prepare chart data
      return {
        labels: Object.keys(priceMap),
        datasets: [{
          data: Object.values(priceMap),
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#f39c12', '#c0392b'],
          hoverBorderColor: '#fff',
        }],
      };
    },
    calculateQuantityData() {
      // Calculate total quantity per product name
      const quantityMap = this.products.reduce((acc, product) => {
        const name = product.name;
        if (!acc[name]) {
          acc[name] = 0;
        }
        acc[name] += 1; // Increase the count for each product
        return acc;
      }, {});

      // Prepare chart data
      return {
        labels: Object.keys(quantityMap),
        datasets: [{
          data: Object.values(quantityMap),
          backgroundColor: ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'],
          hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf', '#f39c12', '#c0392b'],
          hoverBorderColor: '#fff',
        }],
      };
    },
  },
};
</script>

<style scoped>
/* ให้ body และ html ครอบคลุมหน้าจอทั้งหมดโดยไม่มี margin หรือ padding */
html, body {
  height: 100%;       /* ให้ความสูงของทั้ง html และ body ครอบคลุมหน้าจอ */
  margin: 0;          /* ลบช่องว่างจาก margin */
  padding: 0;         /* ลบช่องว่างจาก padding */
  overflow: auto;     /* ให้สามารถเลื่อนเนื้อหาภายในได้ */
  background-color: transparent;  /* แน่ใจว่าพื้นหลังของ body เป็นโปร่งใส */
  box-sizing: border-box;  /* ให้ box-sizing ใช้ border-box เพื่อรวม border และ padding ไว้ภายในขนาด */
}

/* การตั้งค่าภาพพื้นหลัง */
.background-image {
  position: absolute;  /* ใช้ absolute แทน fixed เพื่อไม่ให้ภาพติดกับหน้าจอ */
  top: 0;
  left: 0;
  width: 100%;
  min-height: 100%;     /* ให้ความสูงของภาพไม่ต่ำกว่าความสูงของหน้าจอ */
  background-image: url('@/assets/GG.jpg');
  background-size: cover;  /* ให้ภาพครอบคลุมพื้นที่ของหน้าจอ */
  background-position: center center;  /* ตั้งตำแหน่งภาพไว้ที่กลาง */
  background-repeat: no-repeat;  /* ห้ามซ้ำภาพ */
  z-index: -1;      /* ให้ภาพอยู่ด้านหลังเนื้อหาของหน้า */
}

.dashboard-page {
  background-color: #f0f0f0;  /* พื้นหลังสีเทา */
  height: 100%;  /* ครอบคลุมความสูงหน้าจอ */
  position: relative;  /* ทำให้แน่ใจว่าภาพอยู่ด้านหลัง */
}

.container {
  padding: 20px;
  border-radius: 10px; /* ขอบมุมมน */
  position: relative; /* ทำให้เนื้อหาหลักอยู่เหนือพื้นหลัง */
}

/* เมนูบาและสไลด์บา */
.navbar, .sidebar {
  position: relative; /* ตำแหน่งที่สัมพันธ์กับคอนเทนเนอร์ */
  z-index: 1000; /* ให้เมนูบาและสไลด์บาอยู่ข้างหน้า */
}

/* เพิ่มเงาให้กับการ์ด */
.card {
  border: 2px solid black; /* กรอบการ์ด */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1); /* ปรับเงาให้ชัดขึ้น */
  border-radius: 10px; /* มุมการ์ดมน */
}

.card-header {
  border-bottom: 2px solid black; /* กรอบด้านล่างของ header */
  background-color: #f7f7f7; /* สีพื้นหลังของ header */
  padding: 10px; /* เพิ่ม padding ใน header */
}

/* ตาราง */
.table {
  border: 2px solid black; /* กรอบตาราง */
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1); /* ปรับเงาให้ชัดขึ้น */
  border-radius: 10px; /* ขอบมุมมน */
}

.table th, .table td {
  border: 1px solid black; /* กรอบของเซลล์ในตาราง */
}

/* เพิ่มเงาให้กับกราฟ */
.card-body canvas {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2), 0 4px 6px rgba(0, 0, 0, 0.1); /* ปรับเงาให้ชัดขึ้น */
}

/* เงาให้กับข้อความ "รายการสินค้า" */
h1.text-white {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3); /* เพิ่มเงาให้กับข้อความ */
}

h1 {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3); /* เพิ่มเงาให้ข้อความ */
}

.chart-container {
  display: flex;              /* ใช้ Flexbox */
  justify-content: center;    /* จัดให้อยู่กึ่งกลางในแนวนอน */
  align-items: center;        /* จัดให้อยู่กึ่งกลางในแนวตั้ง */
  height: 100%;               /* ให้เนื้อหาเต็มความสูงของการ์ด */
}

</style>
