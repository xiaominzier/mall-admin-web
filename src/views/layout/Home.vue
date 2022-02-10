<template>
  <div class="home">
    <!-- 通过监听路由的变化，使菜单栏重新渲染，添加一个变化的属性 -->
    <left-menu :key="key" />
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <slider-nav />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import LeftMenu from './components/menu.vue';
import SliderNav from './components/sliderNav.vue';

export default {
  components: {
    SliderNav,
    LeftMenu,
  },
  data() {
    return {
      key: new Date().getTime(),
    };
  },
  watch: {
    $route() {
      this.key = new Date().getTime();
    },
  },
  methods: {},
};
</script>
<style lang="less">
@import url("~@/assets/css/home.less");
</style>
