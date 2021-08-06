import axios from 'axios'
axios.defaults.timeout = 7000

export const request = axios.create({
  // baseURL: 'https://conduit-api-realworld.herokuapp.com/api'
  // baseURL: 'http://realworld.api.fed.lagounews.com'
  // baseURL: 'https://conduit.productionready.io/api'
  // baseURL: 'https://3zgug3s5bg.execute-api.eu-west-1.amazonaws.com/dev'
  baseURL: 'https://cirosantilli-realworld-next.herokuapp.com/api'
})

export default ({ store }) => {
  request.interceptors.request.use(function (config) {
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = 'Token ' + user.token
    }
    // console.log(config)
    return config
  }, function (err) {
    return Promise.reject(err)
  })
}