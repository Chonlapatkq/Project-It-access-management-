import { createStore } from 'vuex';

export default createStore({
  state: {
    products: JSON.parse(localStorage.getItem('products')) || [],
  },
  getters: {
    allProducts: (state) => state.products,
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
      localStorage.setItem('products', JSON.stringify(products)); // เก็บข้อมูลใน localStorage
    },
    addProduct(state, product) {
      state.products.push(product);
      localStorage.setItem('products', JSON.stringify(state.products)); // เก็บข้อมูลใหม่
    },
    deleteProduct(state, index) {
      state.products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(state.products)); // เก็บข้อมูลใหม่
    }
  },
  actions: {
    updateProducts({ commit }, products) {
      commit('setProducts', products);
    },
    addProduct({ commit }, product) {
      commit('addProduct', product);
    },
    deleteProduct({ commit }, index) {
      commit('deleteProduct', index);
    }
  }
});
