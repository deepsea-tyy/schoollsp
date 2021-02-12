import {post, get} from '../request.js'

export function orderList(data={}) {
  return get({
    url: '/runerrands/order/index',
    params: data,
	token:true
  })
}
export function orderView(id) {
  return get({
    url: '/runerrands/order/view',
    params: {id:id},
	token:true
  })
}
export function orderUpdate(data) {
  return post({
    url: '/runerrands/order/update',
    params: data,
	token:true
  })
}