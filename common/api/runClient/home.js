import {post, get} from '../request.js'

export function schoolAround(id) {
  return get({
    url: '/runerrands/school-around/index',
    params: {school_id:id},
	token:true
  })
}

export function cost() {
  return get({
    url: '/runerrands/cost/view',
	token:true
  })
}
export function orderCreate(data) {
  return post({
    url: '/runerrands/order/create',
	params: data,
	token:true
  })
}
export function orderPay(data) {
  return get({
    url: '/pay/pay-setting/pay-params',
	params: data,
	token:true
  })
}