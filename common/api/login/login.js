import {get, post} from '../request.js'

export function xcxLoginByphone(data) {
  return post({
    url: '/user/login/login-by-phone',
    params: data
  })
}

export function xcxLoginByCode2(data) {
  return post({
    url: '/user/login/code2',
    params: data
  })
}
