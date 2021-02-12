<template>
	<view class="loginBox">
		<view v-if="isShow">
			<button class="loginBtn" @getuserinfo='getUserInfo' open-type="getUserInfo"   type="primary">微信授权登录</button>
			<!-- <button class="loginBtn" @click="test" type="primary">test</button> -->
		</view>
	</view>
</template>

<script>
	import {xcxLoginByCode2} from '../../common/api/login/login.js'
	export default {
		data() {
			return {
				isShow: true,
				created_store: 1
			}
		},
		methods: {
			test(){
				let that = this;
				wx.login({
				  success (res) {
					that.userLogin(res.code);
				  }
				})
			},
			getUserInfo(e) {
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
				uni.switchTab({
					url:'/pages/runClient/home/index'
				})
			}
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
