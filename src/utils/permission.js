/**
 * 存储的是角色对应的权限名称
 */
const roleToRouter = {
  coustomer: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }],
  admin: [{
    name: 'Product',
  }, {
    name: 'ProductList',
  }, {
    name: 'ProductAdd',
  }, {
    name: 'Category',
  }],
};

/**
 * 过滤掉没有权限的路由，留下有权限的路由信息
 * @param {String} role
 * @param {Array} routes
 * @returns
 */
export default function getMenuRouter(role, routes) {
  const allowRouteName = roleToRouter[role].map((item) => item.name); // 每个对应角色含有的所有路由信息
  const resultRoutes = routes.filter((r) => {
    const obj = r;
    if (allowRouteName.indexOf(obj.name) !== -1) {
      const { children } = obj;
      obj.children = children.filter((c) => allowRouteName.indexOf(c.name) !== -1);
      return true;
    }
    return false;
  });
  return resultRoutes;
}
