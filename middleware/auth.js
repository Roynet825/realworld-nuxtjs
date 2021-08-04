export default function ({ store, redirect }) {
  /**
   * not login cannot access pages. redirect to login plz
   */
  if (!store.state.user) {
    return redirect('/login')
  }
}