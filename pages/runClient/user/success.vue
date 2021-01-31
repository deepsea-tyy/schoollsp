<template>
	<view style="text-align: center;padding-top: 43px;">
		<image src="../../static/runClient/user7.png" class="suc" mode="aspectFit"></image>
		<view style="font-size: 14px;color: #000000;margin: 20px 0 7px 0;">信息提交成功！</view>
		<view style="font-size: 11px;color: #999999;">您的申请信息已提交，客服会尽快审核，请耐心等待！</view>
		
		<view @click="toPage()" style="background: #FFE300;border-radius: 25px;color: #333333;margin: 80% 48px 15px 48px;text-align: center;font-size: 15px;height: 40px;padding-top: 9px;">
			返回
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
					url: './index'
				});
			}
		}
	}
</script>

<style>
	.suc{
		width: 50px;
		height: 50px;
	}
</style>
