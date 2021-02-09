<template>
	<view class="bg">
		<view class="banner">
			<u-image  height="265px" src="/static/runClient/banner1.png" mode="aspectFit"></u-image>
			<view class="qs">
				<image src="/static/runClient/banner-pt.png" mode="aspectFit" style="width: 12px;height: 12px;margin: 0 5px 0 11px;"></image>
				附近有 <text style="color: #FFBE00;"> 20 </text>位骑手
			</view>
		</view>
		
		<view class="help-text">想让你同学帮你做点什么</view>
		
		<view class="bus">
			<u-grid :col="2" :border="false">
				<u-grid-item @click="toPage('/pages/runClient/home/runexpress?type=2')">
					<view class="bus-item-bg">
						<view>
							<view class="bus-item-text1">取快递</view>
							<view class="bus-item-text2">顺丰菜鸟</view>
						</view>
						<view class="bus-item-img">
							<image src="/static/runClient/bus1.png" class="bus-item-img" mode="aspectFit" />
						</view>
					</view>
				</u-grid-item>
				<u-grid-item @click="toPage('/pages/runClient/home/runexpress?type=3')">
					<view class="bus-item-bg" style="background-color: #FFF5F6;">
						<view>
							<view class="bus-item-text1">外卖代拿</view>
							<view class="bus-item-text2" style="background-color: #FF4966;">配送到寝</view>
						</view>
						<view class="bus-item-img">
							<image src="/static/runClient/bus2.png" class="bus-item-img" mode="aspectFit" />
						</view>
					</view>
				</u-grid-item>
				<u-grid-item @click="toPage('/pages/runClient/home/runexpress?type=4')">
					<view class="bus-item-bg" style="background-color: #E6EFFA;">
						<view>
							<view class="bus-item-text1">校园跑腿</view>
							<view class="bus-item-text2" style="background-color: #57B5FC;">代买代拿</view>
						</view>
						<view class="bus-item-img">
							<image src="/static/runClient/bus3.png" class="bus-item-img" mode="aspectFit" />
						</view>
					</view>
				</u-grid-item>
				<u-grid-item @click="toPage('/pages/runClient/home/runexpress?type=5')">
					<view class="bus-item-bg" style="background-color: #EEF8F7;">
						<view>
							<view class="bus-item-text1">其他帮助</view>
							<view class="bus-item-text2" style="background-color: #00C56C;">无所不能</view>
						</view>
						<view class="bus-item-img">
							<image src="/static/runClient/bus4.png" class="bus-item-img" mode="aspectFit" />
						</view>
					</view>
				</u-grid-item>
				
			</u-grid>
		</view>
		
		<view class="ts">
			<view class="ts-title">跑腿特色</view>
			
			<view class="">
				<u-grid :col="3" :border="false">
					<u-grid-item>
						<view>
							<view>
								<image src="/static/runClient/ts1.jpg" mode="scaleToFill" />
							</view>
							<view>校园配送</view>
						</view>
					</u-grid-item>
					<u-grid-item>
						<view class="">
							<view>
								<image src="/static/runClient/ts2.jpg" mode="scaleToFill" />
							</view>
							<view>全天配送</view>
						</view>
					</u-grid-item>
					<u-grid-item>
						<view class="">
							<view>
								<image src="/static/runClient/ts3.jpg" mode="scaleToFill" />
							</view>
							<view>万能代购</view>
						</view>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<u-mask :show="authCheckShow" @click="authCheckShow = false">
			<view class="warp">
				<view class="warp-content" @tap.stop>
					<image src="/static/runClient/student.png"  class="bus-item-img" mode="aspectFit" />
					<view style="padding: 15px 10%;">
						您还未通过实名认证，认证成功后可解锁更多服务！
					</view>
					<view style="width: 100%;margin-bottom: 20px;position: relative;">
						<view class="warp-btn" @click="toPage('/pages/runClient/auth/realname')">立即认证</view>
					</view>
				</view>
			</view>
		</u-mask>
	</view>
</template>

<script>
	import {studentAuthView} from '../../../common/api/runClient/auth.js'
	export default {
		data(){
			return {
				authCheckShow:true,
			}
		},
		onLoad() {
			this.getStudentAuth()
		},
		methods:{
			toPage (path) {
				uni.navigateTo({
				    url: path
				});
			},
			async getStudentAuth(){
				let res = await studentAuthView()
				this.authCheckShow = res.status == 1 ? false:true
			},
		}
	}
</script>

<style>
	.bg{
		background: #FFFFFF;
		height: 100%;
		margin: 0;
	}
	.banner{
		position: relative;
	}
	.qs{
		position: absolute;
		bottom: 24px;
		left: 50%;
		transform: translate(-50%,-50%);
		background: rgba(0, 0, 0, 0.6);
		border-radius: 10px;
		font-size: 12px;
		display: flex;
		align-items: center;
		height: 18px;
		width: 125px;
		color: #FFFFFF;
	}
	.help-text{
		margin-left: 10px;
		border-left: 4px solid #FFBE00;
		padding-left: 5px;
		font-weight: bold;
		font-size: 15.5px;
		display: flex;
		align-items: center;
		height: 20px;
		color: #000000;
	}
	.bus{
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
	}
	.bus-item-bg {
		background-color: #FBF5F1;
		width: 150px;
		height: 84px;
		border-radius: 5px;
		display: flex;
		align-items: center;
		justify-content: space-around;
	}
	.bus-item-img {
		width: 50px;
		height: 44.44px;
		margin-top: 16%;
	}
	.bus-item-text1{
		font-size: 15.5px;
		display: flex;
		align-items: center;
		height: 15.5px;
		color: #000000;
		margin-left: 18px;
		margin-bottom: 2px;
	}
	.bus-item-text2{
		background: #FF4C25;
		width: 65px;
		border-radius: 3px;
		text-align: center;
		margin-left: 18px;
	}
	.ts{
		text-align: center;
	}
	.ts-title{
		color: #666666;
		font-weight: 500;
		font-size: 14px;
	}
	.ts {
		margin-top: 15px;
	}
	.ts image{
		width: 25px;
		height: 25px;
	}

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.warp-content {
		margin: 0 38px;
		width: 60%;
		background-color: #FFFFFF;
		border-radius: 10px;
		text-align: center;
	}
	.warp-btn {
		position: absolute;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 100px;
		background-color: #FCF800;
		border-radius: 5px;
	}
</style>
