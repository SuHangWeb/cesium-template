const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  code: state => state.highlight.code,
  viewCode: state => state.highlight.viewCode
}
export default getters
