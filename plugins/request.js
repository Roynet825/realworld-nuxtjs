import axios from 'axios'

export const request = axios.create({
  // baseURL: 'https://conduit-api-realworld.herokuapp.com/api'
  // baseURL: 'http://realworld.api.fed.lagounews.com'
  baseURL: 'https://conduit.productionready.io/api'
  // baseURL: 'https://3zgug3s5bg.execute-api.eu-west-1.amazonaws.com/dev'
})

export default ({ store }) => {
  request.interceptors.request.use(function (config) {
    // console.log('qingqiu')
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = 'Token ' + user.token
    }
    return config
  }, function (err) {
    return Promise.reject(err)
  })
}