import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import getMenuRoutes from '@/utils/permisson';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
// import Index from '../views/page/index.vue' 预加载

Vue.use(VueRouter);
const asyncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'inbox',
    hidden: false,
  },
  component: Home,
  children: [{
    path: 'list',
    name: 'ProductList',
    meta: {
      title: '商品列表',
      icon: 'unordered-list',
      hidden: false,
    },
    component: () => import('@/views/page/productList.vue'),
  }, {
    path: 'add',
    name: 'ProductAdd',
    meta: {
      title: '添加商品',
      icon: 'file-add',
      hidden: false,
    },
    component: () => import('@/views/page/productAdd.vue'),
  },
  {
    path: 'edit/:id',
    name: 'ProductEdit',
    meta: {
      title: '编辑商品',
      icon: 'file-add',
      hidden: true,
    },
    component: () => import('@/views/page/productAdd.vue'),
  }, {
    path: 'category',
    name: 'Category',
    meta: {
      title: '类目管理',
      icon: 'project',
      hidden: false,
    },
    component: () => import('@/views/page/category.vue'),
  }],
}];

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { // 导航名称
      title: '首页',
      icon: 'home',
      hidden: false,
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        icon: 'number',
        hidden: false,
      },
      // compontent: Index  预加载
      component: () => import('../views/page/index.vue'), // 懒加载 ，它的性能比预加载好
    }],
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      hidden: true,
    },
    component: Login,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  routes,
});

// 利用路由拦截进行登陆状态校验（必须先登录，才能进入功能页）
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (to.path !== '/login') {
    if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
      if (!isAddRoutes) {
        const menuRoutes = getMenuRoutes(store.state.role, asyncRouterMap);
        store.dispatch('changeMenuRoutes', routes.concat(menuRoutes)).then(() => {
          router.addRoutes(menuRoutes);
          next();
        });
        isAddRoutes = true;
      }
      return next();
    }
    return next('/login');
  }
  return next();
});
export default router;
