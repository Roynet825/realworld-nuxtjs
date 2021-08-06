import { request } from '@/plugins/request'

export const getProfile = username => {

  return request({
    method: "GET",
    url: `profiles/${username}`,
  })
}

export const follow = username => {
  return request({
    method: "POST",
    url: `profiles/${username}/follow`,
  })
}

export const unFollow = username => {
  return request({
    method: "DELETE",
    url: `profiles/${username}/follow`,
  })
}