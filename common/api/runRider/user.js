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

export function fundLog(data) {
  return get({
    url: '/user/user-fund/log',
    params: data,
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
export function drawMoneyList(data) {
  return get({
    url: '/user/user-fund/draw-money-list',
    params: data,
	token:true
  })
}
export function userStatistics(data) {
  return get({
    url: '/runerrands/user/statistics',
    params: data,
	token:true
  })
}
export function repassword(data) {
  return post({
    url: '/runerrands/user/repassword',
    params: data,
	token:true
  })
}
export function logout() {
  return post({
    url: '/user/logout',
	token:true
  })
}
export function riderInfo() {
  return get({
    url: '/runerrands/rider/view',
	params: {},
    token:true
  })
}
export function riderUpdate(data) {
  return post({
    url: '/runerrands/rider/update',
	params: data,
    token:true
  })
}
export function riderRank(id) {
  return get({
    url: '/runerrands/rider/rank',
	params: {school_id:id},
    token:true
  })
}