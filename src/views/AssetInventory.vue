<template>
  <div class="background-image">
    <div class="assetinventory-container">
      <h1 class="text-center mb-4">ระบบลงทะเบียนสินทรัพย์</h1> <!-- เปลี่ยนสีข้อความเป็นขาว -->

    <div class="card p-4 mb-4">
      <h4 class="card-title mb-3">{{ productIndex !== null ? 'แก้ไขสินทรัพย์' : 'เพิ่มสินทรัพย์ใหม่' }}</h4>
      <form @submit.prevent="addOrEditProduct">
        <div class="row">
          <!-- Asset ID -->
          <div class="col-md-6">
            <label for="assetId" class="form-label">Asset ID</label>
            <input
              type="text"
              id="assetId"
              class="form-control"
              v-model="newProduct.assetId"
              required
            />
          </div>

          <!-- Serial Number -->
          <div class="col-md-6">
            <label for="serialNumber" class="form-label">Serial Number</label>
            <input
              type="text"
              id="serialNumber"
              class="form-control"
              v-model="newProduct.serialNumber"
              required
            />
          </div>

          <!-- Name -->
          <div class="col-md-6">
            <label for="productName" class="form-label">ชื่อสินทรัพย์</label>
            <input
              type="text"
              id="productName"
              class="form-control"
              v-model="newProduct.name"
              required
            />
          </div>

          <!-- Price -->
          <div class="col-md-6">
            <label for="productPrice" class="form-label">ราคา (บาท)</label>
            <input
              type="number"
              id="productPrice"
              class="form-control"
              v-model="newProduct.price"
              required
            />
          </div>

          <!-- Model -->
          <div class="col-md-6">
            <label for="productModel" class="form-label">รุ่นสินทรัพย์</label>
            <input
              type="text"
              id="productModel"
              class="form-control"
              v-model="newProduct.model"
              required
            />
          </div>

        </div>

        <div class="text-center mt-4">
          <button type="submit" class="btn btn-primary">{{ productIndex !== null ? 'บันทึกการแก้ไข' : 'บันทึก' }}</button>
        </div>
      </form>
    </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "AssetInventory",
  data() {
    return {
      newProduct: {
        assetId: "",
        serialNumber: "",
        name: "",
        price: "",
        model: "",
      },
      productIndex: null,
    };
  },
  created() {
    if (this.$route.query.product) {
      const product = JSON.parse(this.$route.query.product);
      this.newProduct = { ...product };
      this.productIndex = this.$route.query.index;
    }
  },
  methods: {
    addOrEditProduct() {
      const products = JSON.parse(localStorage.getItem('products')) || [];
      let imageURL = null;
      if (this.newProduct.image && this.newProduct.image instanceof File) {
        imageURL = URL.createObjectURL(this.newProduct.image);
      }

      if (this.productIndex === null) {
        products.push({ ...this.newProduct, image: imageURL });
      } else {
        products[this.productIndex] = { ...this.newProduct, image: imageURL };
      }

      localStorage.setItem('products', JSON.stringify(products));
      this.$router.push('/list');
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
 
/* เฉพาะหน้า AssetInventory */
.assetinventory-container {
  padding: 25px;
  min-height: 100vh;
  color: white;
  position: relative;
  z-index: 1;
  margin-top: 80px;
}

/* การ์ดรูปแบบ (ปรับความโปร่งใสของการ์ด) */
.card {
  background-color: rgba(255, 255, 255, 0.7); /* ทำให้การ์ดมีความโปร่งใส */
  border-radius: 10px;
  border: none;
  padding: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); /* เพิ่มเงาให้การ์ด */
  max-width: 550px;
  margin: auto;
}

/* ฟอร์ม */
.form-label {
  color: #333;
  font-weight: bold;
  font-size: 15px;
}

.form-control {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 14px;
  font-size: 15px;
  background-color: rgba(255, 255, 255, 0.9); /* ทำให้พื้นหลังของ input โปร่งใส */
}

/* ปุ่ม "บันทึก" */
button {
  border: none;
  padding: 10px 20px;
  background-color: #000000; /* สีพื้นหลังเป็นสีดำ */
  color: white; /* ตัวหนังสือสีขาว */
  border-radius: 5px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s, box-shadow 0.3s; /* เพิ่ม transition สำหรับสีและเงา */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3); /* เพิ่มเงาให้ปุ่ม */
}

button:hover {
  background-color: #333333; /* เปลี่ยนสีพื้นหลังเมื่อ hover */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4); /* เพิ่มขนาดเงาเมื่อ hover */
}

button:focus {
  outline: none;
}

h1 {
  text-shadow: 2px 2px 6px rgba(0, 0, 0, 0.3); /* เพิ่มเงาให้ข้อความ */
  color: black; /* เปลี่ยนสีข้อความเป็นสีดำ */
}



</style>