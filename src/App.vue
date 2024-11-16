<template>
  <div id="app">
    <!-- Include Menu Component -->
    <Menu />

    <!-- Router View will render the component based on the active route -->
    <div class="container my-4">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
// Import Menu.vue component
import Menu from './components/Menu.vue';


export default {
  name: 'App',
  components: {
    Menu, // Register the Menu component here
  },
};
</script>

<style scoped>
/* Styling for the entire App */
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

.container {
  max-width: 1200px;
}

.router-view {
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}
</style>
