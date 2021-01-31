<template>
	<view style="min-height: 100vh;background-color: #FFFFFF;">
		<view class="banner">
			<u-image  height="265px" src="/static/runClient/banner1.png" mode="aspectFit"></u-image>
			<view class="qs">
				<view style="color: #000000;text-align: center;margin-bottom: 20px;">个人信息</view>
				<view class="uni-input">
					<input type="text" placeholder="所在校区" />
				</view>
				<view class="uni-input">
					<input type="text" placeholder="姓名" />
				</view>
				<view class="uni-input">
					<input type="text" placeholder="手机号" />
				</view>
				<view class="uni-input">
					<input type="text" placeholder="有无电动车" />
				</view>
				
				<view class="uni-input">
					<input password type="text" placeholder="设置密码" />
				</view>
				
				<view @click="toPage()" style="background: #FFE300;border-radius: 25px;color: #333333;margin: 15px 48px;text-align: center;font-size: 15px;height: 40px;padding-top: 9px;">
					提交信息
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				labelPositionText:'left',
				model:{
					
				}
			}
		},
		methods: {
			toPage(){
				uni.navigateTo({
					url: './success'
				});
			}
		}
	}
</script>

<style>
	.banner{
		position: relative;
	}
	.qs{
		position: absolute;
		top: 418px;
		left: 50%;
		transform: translate(-50%,-50%);
		background: #FFFFFF;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 10px;
		font-size: 18px;
		color: #FFFFFF;
		width: 96%;
		padding-top: 18px;
	}
	.uni-input{
		background: rgba(196, 196, 196, 0.2);
		border: 0.5px solid #C4C4C4;
		box-sizing: border-box;
		border-radius: 8px;
		padding: 9px;
		font-size: 15px;
		color: #333333;
		margin: 0 48px 15px 48px;
		height: 40px;
	}
	
</style>
