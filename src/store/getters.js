export default {
  token: state => state.user.token,
  roleId: state => state.user.roleId,
  loading: state => state.app.loading
}
