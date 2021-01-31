<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;">
		<view style="padding: 18px 12px;">
			<view v-if="dataList.length == 0" style="position: relative;">
				<view style="position: absolute;left: 50%;transform: translate(-50%,-50%);width: 100px;height: 100px;background: #FFFFFF;border-radius: 50px;margin-top: 116px;">
					<image src="/static/runClient/user8.png" class="nodata" mode="aspectFit"></image>
				</view>
				<view style="position: absolute;left: 50%;transform: translate(-50%,-50%);margin-top: 190px;font-size: 15px;color: #666666;">您还没有收货地址</view>
			</view>

			<view class="item">
				<view class="clearfix">
					<view style="float:left;font-size: 15px;color: #000000;">陈俊霖</view>
					<view style="float:left;margin-left: 10px;color: #333333;padding-top: 3px;">13876684031</view>
				</view>
		
				<view style="margin: 5px 0;color: #666666;">
					上海交通大学（闵行校区）10号楼5层503室
				</view>
				<view>
					<view style="float:left;color: #000000;">
						<view class="default"><image src="/static/runClient/user9.png" mode="aspectFit"></image></view>
						默认地址
					</view> 
					<view style="float:right;color: #666666;margin-left: 9px;">
						<view class="deal"><image src="/static/runClient/user11.png" mode="aspectFit"></image></view>
						删除
					</view>
					<view style="float:right;color: #666666;">
						<view class="deal"><image src="/static/runClient/user10.png" mode="aspectFit"></image></view>
						编辑
					</view>
				</view>
			</view>
			
		 </view>
		 
		 <view style="position: relative;text-align: center;"> 
			<view @click="toPage()" style="position: fixed;width: 100%;bottom: 0;boont-size: 18px;color: #333333;background: #FFE300;height: 52px;border-radius: 5px 5px 0px 0px;padding-top: 15px;">
				添加新地址
			</view>
		 </view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[1]
			}
		},
		methods: {
			toPage(){
				uni.navigateTo({
					url: './addressedit'
				});
			}
		}
	}
</script>

<style>
	.item{
		background: #FFFFFF;
		height: 89px;
		padding: 10px;
		margin-bottom: 10px;
		font-size: 12px
	}
	.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
		display: block;
		height: 0;
		clear:both;
		visibility: hidden;
	}
	.clearfix{
	}
	.nodata{
		width: 50px;
		height: 50px;
		margin-top: 25px;
		margin-left: 25px;
	}
	.default{
		background: #FFE300;
		width: 12px;
		height: 12px;
		text-align: center;
		border-radius: 50px;
		margin-top: 3px;
		margin-right: 5px;
		float: left;
	}
	.default image{
		width: 10px;
		height: 10px;
	}
	.deal{
		float: left;
		margin-top: 1px;
		margin-right: 2px;
	}
	.deal image{
		width: 15px;
		height: 15px;
	}
</style>
