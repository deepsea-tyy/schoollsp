<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;padding: 18px 12px;overflow: hidden;">
		
		<view v-if="dataList.length == 0" style="text-align: center;">
			<image src="/static/runClient/user6.png" mode="aspectFit"></image>
			<view class="title">暂无优惠券</view>
		</view>
		
		<view class="item">
			<view class="clearfix">
				<view style="font-size: 12px;color: #FF4C25;float:left;margin-left: 30px;width: 16px;height: 16px;text-align: center;">¥1</view>
				<view style="float:left;margin-left: 30px;font-size: 15px;color: #333333;">新人优惠券</view>
				<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;">¥ 2.00</view>
			</view>
	
			<view style="margin-top: 10px;font-size: 12px;color: #666666;">
				<view style="text-align: center;float:left;margin-left: 15px;height: 15px;padding:0 6px">满3元可用</view> 
				<view style="text-align: center;float:left;margin-left: 15px;">有效期至2020-12-23</view>
				<view @click="" style="float:right;margin-right: 14px;background-color: #FFE300;padding: 0 10px;border-radius: 3px;color: #333333;">领取</view>
			</view>
		</view>
		
		<view class="item">
			<view class="clearfix">
				<view style="font-size: 12px;color: #FF4C25;float:left;margin-left: 30px;width: 16px;height: 16px;text-align: center;">¥1</view>
				<view style="float:left;margin-left: 30px;font-size: 15px;color: #333333;">新人优惠券</view>
				<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;">¥ 2.00</view>
			</view>
	
			<view style="margin-top: 10px;font-size: 12px;color: #666666;">
				<view style="text-align: center;float:left;margin-left: 15px;height: 15px;padding:0 6px">满3元可用</view> 
				<view style="text-align: center;float:left;margin-left: 15px;">有效期至2020-12-23</view>
				<view @click="" style="float:right;margin-right: 14px;background-color: #FF4C25;padding: 0 10px;border-radius: 3px;color: #FFFFFF;">使用</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[]
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.item{
		background: #FFFFFF;
		border-radius: 10px;
		height: 73px;
		padding-top: 15px;
		margin-bottom: 10px;
	}
	.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
		display: block;
		height: 0;
		clear:both;
		visibility: hidden;
	}
	.clearfix{
	}
	image{
		width: 128px;
		height: 149px;
		margin-top: 116px;
	}
</style>
