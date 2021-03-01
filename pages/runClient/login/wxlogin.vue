<template>
	<view class="loginBox">
		<view v-if="isShow">
			<button class="loginBtn" @getuserinfo='getUserInfo' open-type="getUserInfo"   type="primary">微信授权登录</button>
<!-- 			<button class="loginBtn" @getuserinfo='test' open-type="getUserInfo" type="primary">test</button>
			<button class="loginBtn" @getuserinfo='phoneauth' open-type="getUserInfo" type="primary">授权</button>
			<button class="loginBtn" @getphonenumber="getPhoneNumber" open-type="getPhoneNumber" type="primary">获取号登录</button> -->
		</view>
	</view>
</template>

<script>
	import {xcxLoginByCode2,miniLogin,miniPhoneLogin} from '../../../common/api/login/login.js'
	export default {
		data() {
			return {
				isShow: true,
				created_store: 1,
				code:null,
				uinfo:null
			}
		},
		methods: {
			test(e){
				let that = this;
				let ret = e.detail;
				this.uinfo = e.detail.userInfo
				if (ret.errMsg == "getUserInfo:fail auth deny") {
					uni.showModal({
						content: "为了更好的服务，请同意授权"
					})
				} else if (ret.errMsg == "getUserInfo:ok") {
					wx.login({
					  success (res) {
						that.mLogin(res.code, that.uinfo);
					  }
					})
				} else {
					uni.showModal({
						content: "授权失败"
					})
				
				}
			},
			phoneauth (e) {
			    let that = this;
			    let ret = e.detail;
						console.log(ret)
			    this.uinfo = e.detail.userInfo
			    if (ret.errMsg == "getUserInfo:fail auth deny") {
			    	uni.showModal({
			    		content: "为了更好的服务，请同意授权"
			    	})
			    } else if (ret.errMsg == "getUserInfo:ok") {
			    	wx.login({
			    	  success (res) {
			    		that.code = res.code
			    	  }
			    	})
			    } else {
			    	uni.showModal({
			    		content: "授权失败"
			    	})
			    
			    }
			},
			getPhoneNumber (e) {
			    console.log(e.detail.errMsg)
			    console.log(e.detail.iv)
			    console.log(e.detail.encryptedData)
				this.phLogin({code:this.code,uinfo:this.uinfo,iv:e.detail.iv,encryptedData:e.detail.encryptedData})
			},
			getUserInfo(e) {
				let that = this;
				let ret = e.detail;
						console.log(ret)
						return
				this.uinfo = e.detail.userInfo
				if (ret.errMsg == "getUserInfo:fail auth deny") {
					uni.showModal({
						content: "为了更好的服务，请同意授权"
					})
				} else if (ret.errMsg == "getUserInfo:ok") {
					wx.login({
					  success (res) {
						that.userLogin(res.code, that.uinfo);
					  }
					})
				} else {
					uni.showModal({
						content: "授权失败"
					})

				}
			},
			async userLogin(code, uinfo) {
				let res = await xcxLoginByCode2({scene:2,code:code,uinfo:{avatarUrl:uinfo.avatarUrl,gender:uinfo.gender,nickname:uinfo.nickName}})
				uni.showToast({ title: '登陆成功' })
				uni.setStorageSync('access-token', res.token)
				uni.setStorageSync('access-token-duration', res.duration)
				// uni.navigateBack({
				// 	success: () => {
				// 		let page = getCurrentPages().pop();  //跳转页面成功之后
				// 		if (!page) {
				// 		  return;
				// 		} else {
				// 			page.onLoad(page.options);// page自带options对象.
				// 		}
				// 	}
				// })
			},
			async mLogin(code, uinfo) {
				let res = await miniLogin({scene:1,code:code,mini_id:2,uinfo:{avatarUrl:uinfo.avatarUrl,gender:uinfo.gender,nickname:uinfo.nickName}})
				console.log(res);
			},
			async phLogin(data) {
				let res = await miniPhoneLogin(data)
				console.log(res);
			},
		}
	}
</script>

<style lang="scss" scoped>
	.loginBox {
		padding-top: 180upx;
		text-align: center;

		.nameApplets {
			margin-top: 16rpx;
			font-size: 28rpx;
			line-height: 44rpx;
			color: #333333;
		}

		.loginBtn {
			display: flex;
			width: 77%;
			height: 88rpx;
			margin: 100rpx auto 0;
			align-items: center;
			justify-content: center;
			font-size: 32rpx;
			color: #fff;
			background: #FF5238;
			border-radius: 58rpx;

			.u-icon {
				margin-right: 8rpx;
			}
		}

		.backHome {
			margin-top: 50rpx;
			font-size: 28rpx;
			line-height: 44rpx;
			color: #999999;
		}
	}
</style>
