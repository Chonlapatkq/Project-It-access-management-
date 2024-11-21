import { createStore } from 'vuex';
import productStore from './productStore'; // import productStore

export default createStore({
  modules: {
    product: productStore, // เชื่อมโยง productStore เข้ากับ store หลัก
  },
  state: {
    isLoggedIn: false,
    username: ''
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    getUsername: (state) => state.username
  },
  mutations: {
    setLogin(state, username) {
      state.isLoggedIn = true;
      state.username = username;
    },
    setLogout(state) {
      state.isLoggedIn = false;
      state.username = '';
    }
  },
  actions: {
    login({ commit }, username) {
      commit('setLogin', username);
    },
    logout({ commit }) {
      commit('setLogout');
    }
  }
});
