import {get, post} from '../request.js'

export function userInfo() {
  return get({
    url: '/user/user-info/view',
    params: {},
	token:true
  })
}

export function realNameAuthView() {
  return get({
    url: '/user/real-name-auth/view',
    params: {},
	token:true
  })
}

export function userFund() {
  return get({
    url: '/user/user-info/fund',
    params: {},
	token:true
  })
}

export function fundLog() {
  return get({
    url: '/user/user-fund/log',
    params: {},
	token:true
  })
}

export function drawMoney(data) {
  return post({
    url: '/user/user-fund/draw-money',
    params: data,
	token:true
  })
}