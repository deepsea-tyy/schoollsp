<template>
	<view>
		<view style="width: 100%;height: 132px;background: #FFE400;font-size: 27px;color: #333333;padding-top: 60px;">
			<view style="margin-left: 40px;">同学，你好！</view>
			<view style="margin-left: 62px;margin-top: 15px;">
				<image src="/static/runRider/login1.png" mode="aspectFit"></image>
			</view>
		</view>
		<view style="padding: 25px 35px;">
			<view style="border-bottom: 1px solid #F6F6F6;height: 35px;">
				<view style="float: left;font-size: 18px;margin-top: 5px;color: #333333;padding-right: 9px;border-right: solid 1px #F6F6F6;margin-right: 5px;">+86</view>
				<view style="float: left;"><u-input :type="'text'" :border="false" placeholder="请输入手机号"/></view>
			</view>
			<view style="border-bottom: 1px solid #F6F6F6;">
				<view style=""><u-input :type="'text'" :border="false" placeholder="请输入密码"/></view>
			</view>
			<view style="background: #FCF800;border-radius: 20px;text-align: center;height: 40px;font-size: 16px;color: #333333;padding-top: 8px;margin-top: 28px;">
				登  录
			</view>
			<view style="margin-top: 12px;">
				<view @click="toPage()" style="float: right;font-size: 13px;color: #5C5C5C;border-bottom: solid 1px #5C5C5C;width: 52px;">忘记密码</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			toPage(){
				uni.navigateTo({
				    url: './repassword'
				});
			}
		}
	}
</script>

<style>
	image{
		width: 20px;
		height: 20px;
	}
</style>
