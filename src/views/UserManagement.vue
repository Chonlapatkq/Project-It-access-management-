<template>
  <div class="background-image">
    <!-- เนื้อหาภายในหน้าเว็บของคุณ -->
    <h1>ยินดีต้อนรับ!</h1>
  </div>
</template>

<script>
export default {
  name: "BackgroundPage"
};
</script>

<style scoped>
.background-image {
  width: 100vw;
  height: 100vh;
  background-image: url('@/assets/bd.jpg');
  background-size: cover;
  background-position: center;
}
</style>
