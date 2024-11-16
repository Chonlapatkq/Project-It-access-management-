import { createStore } from 'vuex';

export default createStore({
  state: {
    assets: [],
    user: null,
  },
  mutations: {
    setAssets(state, assets) {
      state.assets = assets;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    fetchAssets({ commit }) {
      // ดึงข้อมูลสินทรัพย์จาก API หรือฐานข้อมูล
      const assets = [{ id: 1, name: 'Laptop', status: 'In Use', expiration: '2025-12-31' }];
      commit('setAssets', assets);
    },
  },
  getters: {
    getAssets: (state) => state.assets,
    getUser: (state) => state.user,
  },
});
