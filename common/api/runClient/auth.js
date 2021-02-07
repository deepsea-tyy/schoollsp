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
