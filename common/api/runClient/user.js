import {post, get} from '../request.js'

export function userInfo() {
  return get({
    url: '/user/user-info/view',
    params: {},
    token:true
  })
}

export function school(id) {
  return get({
    url: '/runerrands/school/view',
    params: id?{id:id}:{},
    token:true
  })
}

export function shipAddress() {
  return get({
    url: '/user/ship-address/index',
    token:true
  })
}

export function shipAddressView(id) {
  return get({
    url: '/user/ship-address/view',
	params: {id:id},
    token:true
  })
}

export function shipAddressCreate(data) {
  return post({
    url: '/user/ship-address/create',
    params: data,
    token:true
  })
}

export function shipAddressUpdate(data) {
  return post({
    url: '/user/ship-address/update',
    params: data,
    token:true
  })
}

export function shipAddressDelete(id) {
  return post({
    url: '/user/ship-address/delete',
    params: {ids:id},
    token:true
  })
}

export function coupon() {
  return get({
    url: '/promotion/coupon/index',
	params: {scene:2},
    token:true
  })
}

export function userCoupon() {
  return get({
    url: '/promotion/coupon/user-coupon',
    token:true
  })
}
export function couponReceive(id) {
  return get({
    url: '/promotion/coupon/receive',
	params: {promotion_id:id},
    token:true
  })
}

export function riderList(id) {
  return get({
    url: '/runerrands/rider/index',
	params: {school_id:id},
    token:false
  })
}

export function riderView() {
  return get({
    url: '/runerrands/rider/view',
	params: {},
    token:true
  })
}
export function riderCreate(data) {
  return post({
    url: '/runerrands/rider/create',
	params: data,
    token:true
  })
}