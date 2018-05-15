const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  account: state => state.user.account,
  name: state => state.user.name,
  roles: state => state.user.roles,
  projectArr: state => state.config.projectArr,
  addRouters: state => state.permission.addRouters,
  routers: state => state.permission.routers
}
export default getters
