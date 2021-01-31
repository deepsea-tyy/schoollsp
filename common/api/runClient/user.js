import {post, get} from '../request.js'

export function userInfo() {
  return get({
    url: '/user/user-info/view',
    params: {},
	token:true
  })
}

export function studentAuth() {
  return get({
    url: '/user/student-auth/view',
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