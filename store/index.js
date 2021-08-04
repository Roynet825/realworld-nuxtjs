const cookieparser = process.server ? require('cookieparser') : undefined;

export const state = () => {
  return {
    user: null
  }
}

export const mutations = {
  setUser(state, data) {
    state.user = data
  }
}

export const actions = {
  /**
   * 从 req里的cookie读取登录user，设置进vuex的store里
   * @param {*} param0 
   * @param {*} param1 
   */
  nuxtServerInit({ commit }, { req }) {
    let user = null;
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie);
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        //No valid user in cookie
      }
    }
    console.log('get user')
    commit('setUser', user)
  }
}