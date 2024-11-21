<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">รายการสินค้า</h1>

    <!-- การ์ดแสดงข้อมูลราคาสินค้า -->
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">ข้อมูลราคา</div>
          <div class="card-body">
            <canvas id="pricePieChart"></canvas>
          </div>
        </div>
      </div>

      <!-- การ์ดแสดงข้อมูลจำนวนสินค้า -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-header text-center">ข้อมูลจำนวนสินค้า</div>
          <div class="card-body">
            <canvas id="quantityPieChart"></canvas>
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
    deleteProduct(index) {
      const products = this.products;
      if (confirm('คุณต้องการลบสินค้านี้ใช่ไหม?')) {
        products.splice(index, 1);
        localStorage.setItem('products', JSON.stringify(products));
        this.$router.go(0); // Refresh page
      }
    },
    editProduct(index) {
      const product = this.products[index];
      this.$router.push({ path: '/edit-product', query: { product: JSON.stringify(product), index } });
    },
  },
};
</script>
