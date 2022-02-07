import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于切换菜单的闭合状态  false代表不闭合  true代表闭合(也可以通过父组件传子组件的方式，但是太麻烦，每个组件都要添加)
    collapsed: false,
    // 用户信息
    user: {
      username: '',
      appkey: '',
      role: '',
      email: '',
    },
  },
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
    setUserInfo(state, userInfo) {
      state.user = userInfo;
    },
  },
  actions: {
    changeCollapsed({ commit }) {
      commit('changeCollapsed');
    },
    setUserInfo({ commit }, userInfo) {
      commit('setUserInfo', userInfo);
    },
  },
  modules: {
  },
});
