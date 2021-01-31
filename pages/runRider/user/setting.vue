<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;">
		<view style="margin-top: 10px;">
			<u-cell-group :border="false">
				<u-cell-item @click="toPage('/pages/user/repassword')" :border-top="false" title="修改密码"></u-cell-item>
				<u-cell-item @click="" :arrow="false" :is-link="true" title="微信模板消息提醒">
					<u-switch slot="right-icon" :active-color="'#FFE300'" v-model="checked"></u-switch>
				</u-cell-item>
				<u-cell-item @click="" :arrow="false" :is-link="true" :border-bottom="false" title="接单中">
					<u-switch slot="right-icon" :active-color="'#FFE300'" v-model="checked"></u-switch>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view style="background: #FFE300;border-radius: 25px;text-align: center;padding: 10px 0;margin: 20px 13px;">退出登录</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				checked:true
			}
		},
		methods: {
			toPage(path){
				console.log(11)
				uni.navigateTo({
					url: path
				});
			}
			
		}
	}
</script>

<style>
	image{
		width: 60px;
		height: 60px;
	}
</style>
