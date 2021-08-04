export default function ({ store, redirect }) {
  /**
   * logined user cannot access login/register page anymore
   */
  if (store.state.user) {
    return redirect('/')
  }
}