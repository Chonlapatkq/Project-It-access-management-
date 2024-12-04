import { createRouter, createWebHistory } from 'vue-router';

// นำเข้าไฟล์จากโฟลเดอร์ views
import Dashboard from '../views/Dashboard.vue';
import AssetInventory from '../views/AssetInventory.vue';
import AssetLifecycleManagement from '../views/AssetLifecycleManagement.vue';
import Login from '../views/Login.vue'; // เพิ่มการนำเข้า Login.vue

const routes = [
  { path: '/', component: Dashboard },
  { path: '/register', component: AssetInventory },
  { path: '/list', component: AssetLifecycleManagement },
  { path: '/login', component: Login }, // เพิ่มเส้นทางสำหรับหน้า Login
  {
    path: '/edit-product',
    name: 'EditProduct',
    component: AssetInventory,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
