import {post, get} from '../request.js'

export function realNameAuthView() {
  return get({
    url: '/user/real-name-auth/view',
    params: {},
	token:true
  })
}

export function realNameAuthCreate(data) {
  return post({
    url: '/user/real-name-auth/create',
    params: data,
	token:true
  })
}

export function realNameAuthUpdate(data) {
  return post({
    url: '/user/real-name-auth/update',
    params: data,
	token:true
  })
}

export function studentAuthView(data={}) {
  return get({
    url: '/user/student-auth/view',
    params: data,
	token:true
  })
}

export function studentAuthCreate(data) {
  return post({
    url: '/user/student-auth/create',
    params: data,
	token:true
  })
}

export function studentAuthUpdate(data) {
  return post({
    url: '/user/student-auth/update',
    params: data,
	token:true
  })
}

export function schoolList(data={}) {
  return get({
    url: '/runerrands/school/index',
    params: data,
	token:false
  })
}
