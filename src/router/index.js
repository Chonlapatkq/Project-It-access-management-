import { createRouter, createWebHistory } from 'vue-router';

// นำเข้าไฟล์จากโฟลเดอร์ views
import Dashboard from '../views/Dashboard.vue';
import AssetInventory from '../views/AssetInventory.vue';
import AssetLifecycleManagement from '../views/AssetLifecycleManagement.vue';
import AssetTracking from '../views/AssetTracking.vue';
import UserManagement from '../views/UserManagement.vue';
import DocumentationManagement from '../views/DocumentationManagement.vue';
import Login from '../views/Login.vue'; // เพิ่มการนำเข้า Login.vue

const routes = [
  { path: '/', component: Dashboard },
  { path: '/assets', component: AssetInventory },
  { path: '/lifecycle', component: AssetLifecycleManagement },
  { path: '/tracking', component: AssetTracking },
  { path: '/user-management', component: UserManagement },
  { path: '/documentation', component: DocumentationManagement },
  { path: '/login', component: Login }, // เพิ่มเส้นทางสำหรับหน้า Login
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
