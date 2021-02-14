import {get, post} from '../request.js'

export function runerrandsOrderList(data) {
  return get({
    url: '/runerrands/order/index',
    params: data,
	token:true
  })
}

export function runerrandsOrderDelivery(id) {
  return post({
    url: '/runerrands/order/delivery',
    params: {order_id:id},
	token:true
  })
}
export function runerrandsOrderComplete(data) {
  return post({
    url: '/runerrands/order/complete',
    params: data,
	token:true
  })
}
export function runerrandsOrderView(id) {
  return get({
    url: '/runerrands/order/view',
    params: {id:id},
	token:true
  })
}
export function riderList(id) {
  return get({
    url: '/runerrands/rider/index',
    params: {school_id:id}
  })
}