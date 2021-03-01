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

export function riderLogin(data) {
  return post({
    url: '/runerrands/rider/login',
    params: data
  })
}



export function miniLogin(data) {
  return post({
    url: '/login/mini/code2',
    params: data
  })
}



export function miniPhoneLogin(data) {
  return post({
    url: '/login/mini/login-by-phone',
    params: data
  })
}


