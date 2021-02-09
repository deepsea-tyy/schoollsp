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
    params: {id:id},
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