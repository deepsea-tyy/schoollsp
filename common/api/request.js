import config from '../config.js'
import {errorType, isLogin} from '../fun.js'


export function request(url, data, method, header) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: config.baseUrl + url,
			method,
			data,
			header,
			success: response => {
				if (response.data.code === 200 ){
					return resolve(response.data.data)
				}
				errorType(response.data)
			},
			fail: err => {
				errorType({ errorCode: 502, message: '请检查网络状态'})
			},
			complete: (err) => {
				uni.hideLoading()
				uni.stopPullDownRefresh()
			}
		})
	})
	.catch((err) => errorType(err))
}

export function post(data){
	let { url, params, token } = data
	
	let header = {}
	if (token){
		header['access-token'] = uni.getStorageSync('access-token') || ''
	}
	return request(url, params, 'POST', header)
}

export function get(data){
	let { url, params, token } = data
	let header = {}
	if (token){
		header['access-token'] = uni.getStorageSync('access-token') || ''
	}
	// console.log(url,param,header);return
	return request(url, params, 'GET', header)
}

