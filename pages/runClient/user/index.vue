<template>
	<view style="min-height: 100vh;background-color: #FFFFFF;padding-top: 40px;">
		<view style="overflow: hidden;">
			<view class="avatar"><image :src="userInfo.file.file_url" class="nodata" mode="aspectFit"></image></view>
			<view style="padding: 7px;">
				<view v-if="!userInfo.nickname" @click="toPage('/pages/login/wxlogin')" style="font-size: 20px;color: #333333;">点击登录</view>
				<view style="font-size: 18px;color: #333333;">{{userInfo.nickname}}</view>
				<view v-if="studentAuth === null" style="font-size: 12px;color: #666666;">未实名认证</view>
				<view v-if="studentAuth == 0" style="font-size: 12px;color: #666666;">审核中</view>
				<view v-if="studentAuth == 2" style="font-size: 12px;color: #666666;">审核失败</view>
				<view v-if="studentAuth == 1" style="font-size: 12px;color: #666666;">学校</view>
			</view>
		</view>
		<view style="padding: 21px;">
			<u-cell-group>
				<u-cell-item v-if="studentAuth!=1" @click="toPage('/pages/runClient/auth/realname')" icon="/static/runClient/user12.png" title="实名认证">
					{{studentAuth===null?'去认证':(studentAuth==0?'审核中':'审核失败')}}
				</u-cell-item>
				<u-cell-item @click="toPage('/pages/runClient/user/address')" icon="/static/runClient/user1.png" title="我的地址"></u-cell-item>
				<u-cell-item @click="toPage('/pages/runClient/order/index')" icon="/static/runClient/user2.png" title="我的订单"></u-cell-item>
				<u-cell-item @click="toPage('/pages/runClient/user/coupons')" icon="/static/runClient/user3.png" title="优惠券"></u-cell-item>
				<u-cell-item @click="toPage('/pages/runClient/user/rider')" icon="/static/runClient/user4.png" title="申请骑手"></u-cell-item>
				<u-cell-item @click="toPage('/pages/runClient/user/contact')" icon="/static/runClient/user5.png" title="联系客服"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {userInfo, studentAuth, school} from '../../../common/api/runClient/user.js'
	export default {
		data() {
			return {
				userInfo:{
					file:{
						file_url:''
					}
				},
				studentAuth:null
			}
		},
		onLoad() {
			this.getUinfo()
			this.getStudentAuth()
		},
		methods: {
			toPage(path){
				uni.navigateTo({
					url: path
				});
			},
			async getUinfo(){
				let res = await userInfo()
				res.file.file_url = this.$fun.fileUrl(res.file.file_url)
				this.userInfo = res
			},
			async getStudentAuth(){
				let res = await studentAuth()
				this.studentAuth = res.status
				this.getSchool()
			},
			async getSchool(){
				let res = await school(this.userInfo.school_id)
				this.school = res
			}
			
		}
	}
</script>

<style>
	.avatar{
		width: 60px;
		height: 60px;
		border-radius: 50px;
		background-color: #C4C4C4;
		margin-left: 21px;
		margin-right: 16px;
		float: left;
	}
	.avatar image{
		width: 60px;
		height: 60px;
	}
</style>
