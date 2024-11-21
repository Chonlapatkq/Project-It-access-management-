<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Dashboard</h1>
    
    <!-- การ์ดแสดงสรุปข้อมูล -->
    <div class="row mb-4">
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">สรุปข้อมูลสินค้า</h5>
            <p class="card-text">
              <strong>จำนวนสินค้า:</strong> {{ totalProducts }} ชิ้น<br>
              <strong>ราคาขายรวม:</strong> {{ totalPrice.toFixed(2) }} บาท
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- แผนภูมิวงกลมแสดงราคาแต่ละสินค้า -->
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">แผนภูมิวงกลม: ราคาแต่ละสินค้า</h5>
            <PieChart :chart-data="priceChartData" :chart-options="chartOptions" />
          </div>
        </div>
      </div>
    </div>

    <!-- ตารางแสดงรายละเอียดสินค้า -->
    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>#</th>
          <th>Asset ID</th>
          <th>Serial Number</th>
          <th>ชื่อสินค้า</th>
          <th>ราคา (บาท)</th>
          <th>จำนวน (ชิ้น)</th>
          <th>รุ่นสินค้า</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ product.assetId }}</td>
          <td>{{ product.serialNumber }}</td>
          <td>{{ product.name }}</td>
          <td>{{ parseFloat(product.price).toFixed(2) }}</td>
          <td>{{ product.quantity || 1 }}</td>
          <td>{{ product.model }}</td>
        </tr>
        <tr v-if="products.length === 0">
          <td colspan="7" class="text-center">ยังไม่มีข้อมูลสินค้า</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
// นำเข้า PieChart จาก vue-chartjs
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

// ลงทะเบียน Chart.js และ Vue-Chartjs
ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

export default {
  name: "Dashboard",
  components: {
    PieChart: Pie, // ใช้ PieChart ใน Vue
  },
  data() {
    return {
      products: [], // สถานะข้อมูลสินค้า
      chartOptions: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
        },
      },
    };
  },
  computed: {
    totalProducts() {
      // คำนวณจำนวนสินค้าทั้งหมด
      return this.products.length;
    },
    totalPrice() {
      // คำนวณราคาขายรวม
      return this.products.reduce((sum, product) => {
        const price = parseFloat(product.price) || 0; // แปลงราคาของสินค้าก่อนการคำนวณ
        const quantity = parseInt(product.quantity, 10) || 1; // แปลงจำนวนสินค้าก่อนการคำนวณ
        return sum + (price * quantity); // คำนวณราคาขายรวม
      }, 0);
    },
    priceChartData() {
      // สร้างข้อมูลสำหรับแผนภูมิวงกลมแสดงราคา
      const labels = this.products.map(product => product.name);
      const data = this.products.map(product => parseFloat(product.price) * (parseInt(product.quantity, 10) || 1));
      return {
        labels,
        datasets: [
          {
            label: 'ราคา (บาท)',
            data,
            backgroundColor: ['#ff6384', '#36a2eb', '#ffcd56', '#4bc0c0', '#f77825'],
          },
        ],
      };
    },
  },
  mounted() {
    this.fetchProductData();
    window.addEventListener('storage', this.onStorageChange);
    if (!localStorage.getItem('backgroundReset')) {
      this.resetBackground();
      localStorage.setItem('backgroundReset', 'true');
    }
  },
  destroyed() {
    window.removeEventListener('storage', this.onStorageChange);
  },
  methods: {
    onStorageChange(event) {
      if (event.key === 'products') {
        this.fetchProductData();
      }
    },
    fetchProductData() {
      const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
      this.products = storedProducts;
    },
    resetBackground() {
      document.body.style.background = '';
    }
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
}
.card {
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.card-body {
  padding: 15px;
}
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
.table th, .table td {
  text-align: center;
}
</style>
