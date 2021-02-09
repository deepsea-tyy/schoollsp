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
	token:false
  })
}