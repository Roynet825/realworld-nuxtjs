import { request } from '@/plugins/request'

export const login = data => {
  return request({
    method: "POST",
    url: "users/login",
    data
  })

  // return {
  //   data:
  //   {
  //     user: { "id": 195479, "email": "royripple@gmail.com", "createdAt": "2021-07-28T18:18:08.110Z", "updatedAt": "2021-08-01T17:11:30.869Z", "username": "RoyNet", "bio": null, "image": "https://iconfont.alicdn.com/t/c066e627-7f8a-40a5-a590-5fb6379d0fdd.png", "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTk1NDc5LCJ1c2VybmFtZSI6IlJveU5ldCIsImV4cCI6MTYzMzEwNzMzMX0.A6Mt-oEcGJXYQCGqyMDoFTOYTyTOySsAUvAhkykGqV0" }
  //   }
  // }
}

export const register = data => {
  return request({
    method: "POST",
    url: "users",
    data
  })
}