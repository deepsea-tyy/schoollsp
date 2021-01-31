<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;">
		<view class="u-tabs-box">
			<u-tabs-swiper inactive-color="#333333" font-size="14px" activeColor="#FFE300" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<view v-if="dataList.length == 0" style="text-align: center;">
			<image src="/static/images/dd1.png" mode="aspectFit"></image>
			<view class="title">暂无订单</view>
		</view>
		<view class="list">
			<view class="item" @click="toPage(1)">
				<view class="clearfix">
					<view style="font-size: 12px;color: #FFFFFF;float:left;margin-left: 15px;width: 16px;height: 16px;background: #FF4C25;border-radius: 10px;text-align: center;">取</view> 
					<view style="float:left;margin-left: 5px;font-size: 12px;">取快递</view>
					<view style="float:left;margin-left: 5px;font-weight: bold;font-size: 12px;color: #333333;">天天快递-近邻宝</view>
					<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;font-weight: 500;">¥ 2.00</view>
				</view>
				
				<view class="clearfix">
					<view style="font-size: 12px;color: #FFFFFF;float:left;margin-left: 15px;width: 16px;height: 16px;background: #FF4C25;border-radius: 10px;text-align: center;">外</view> 
					<view style="float:left;margin-left: 5px;">外卖代拿</view>
					<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;">¥ 2.00</view>
				</view>
				
				<view class="clearfix">
					<view style="font-size: 12px;color: #FFFFFF;float:left;margin-left: 15px;width: 16px;height: 16px;background: #57B5FC;border-radius: 10px;text-align: center;">跑</view> 
					<view style="float:left;margin-left: 5px;">校园跑腿</view>
					<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;">¥ 2.00</view>
				</view>
				
				<view class="clearfix">
					<view style="font-size: 12px;color: #FFFFFF;float:left;margin-left: 15px;width: 16px;height: 16px;background: #00C56C;border-radius: 10px;text-align: center;">帮</view> 
					<view style="float:left;margin-left: 5px;">其他帮助</view>
					<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;">¥ 2.00</view>
				</view>

				<view style="margin-top: 10px;">
					<view style="font-size: 12px;color: #666666;margin-left: 15px;">上海交通大学A9-5-503</view>
					<view style="font-size: 12px;color: #666666;margin-left: 15px;">5斤以下</view>
					<view class="clearfix">
						<view style="text-align: center;float:left;margin-left: 15px;font-size: 10px;color: #FF4C25;height: 15px;background: rgba(153, 153, 153, 0.5);opacity: 0.5;border-radius: 5px;padding:0 6px">
							12-23 16:00
						</view>
						<view style="float:right;text-align: center;margin-right: 32px;font-size: 10px;color: #FF4C25;height: 15px;background: rgba(153, 153, 153, 0.5);opacity: 0.5;border-radius: 5px;padding:0 6px">
							立即送达
						</view> 
					</view>
				</view>
				<view style="background: #FFE300;border-radius: 5px;margin: 10px 27px;height: 25px;padding-top: 3px;text-align: center;">
					立即抢单
				</view>
			</view>
			
			<view class="item" @click="toPage(1)">
				<view class="clearfix">
					<view style="font-size: 12px;color: #FFFFFF;float:left;margin-left: 15px;width: 16px;height: 16px;background: #FF4C25;border-radius: 10px;text-align: center;">取</view> 
					<view style="float:left;margin-left: 5px;font-size: 12px;">取快递</view>
					<view style="float:left;margin-left: 5px;font-weight: bold;font-size: 12px;color: #333333;">天天快递-近邻宝</view>
					<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;font-weight: 500;">¥ 2.00</view>
				</view>
				
				<view class="clearfix">
					<view style="font-size: 12px;color: #FFFFFF;float:left;margin-left: 15px;width: 16px;height: 16px;background: #FF4C25;border-radius: 10px;text-align: center;">外</view> 
					<view style="float:left;margin-left: 5px;">外卖代拿</view>
					<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;">¥ 2.00</view>
				</view>
				
				<view class="clearfix">
					<view style="font-size: 12px;color: #FFFFFF;float:left;margin-left: 15px;width: 16px;height: 16px;background: #57B5FC;border-radius: 10px;text-align: center;">跑</view> 
					<view style="float:left;margin-left: 5px;">校园跑腿</view>
					<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;">¥ 2.00</view>
				</view>
				
				<view class="clearfix">
					<view style="font-size: 12px;color: #FFFFFF;float:left;margin-left: 15px;width: 16px;height: 16px;background: #00C56C;border-radius: 10px;text-align: center;">帮</view> 
					<view style="float:left;margin-left: 5px;">其他帮助</view>
					<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;">¥ 2.00</view>
				</view>

				<view class="clearfix" style="margin-top: 10px;">
					<view style="font-size: 12px;color: #666666;margin-left: 15px;">上海交通大学A9-5-503</view>
					<view style="font-size: 12px;color: #666666;margin-left: 15px;">5斤以下</view>
					<view class="clearfix">
						<view style="text-align: center;float:left;margin-left: 15px;font-size: 10px;color: #FF4C25;height: 15px;background: rgba(153, 153, 153, 0.5);opacity: 0.5;border-radius: 5px;padding:0 6px">
							12-23 16:00
						</view>
						<view style="float:right;text-align: center;margin-right: 32px;font-size: 10px;color: #FF4C25;height: 15px;background: rgba(153, 153, 153, 0.5);opacity: 0.5;border-radius: 5px;padding:0 6px">
							立即送达
						</view> 
					</view>
				</view>
				
				<view style="margin-top: 10px;font-size: 12px;color: #FFE300;">
					<view style="height: 25px;padding-top: 4px;float: left;margin-left: 27px;width: 140px;border: 1px solid #FFE300;box-sizing: border-box;border-radius: 5px;;text-align: center;">
						电话：13876684031
					</view>
					<view style="height: 25px;padding-top: 4px;float: right;color: #333333;margin-right: 27px;background: #FFE300;width: 140px;border-radius: 5px;text-align: center;">
						确认取货
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				swiperCurrent: 0,
				list: [
					{
						name: '待抢'
					},
					{
						name: '待取货'
					},
					{
						name: '配送中'
					},
					{
						name: '已完成'
					}
				],
				dataList:[1],
			}
		},
		methods: {
			// tab栏切换
			change(index) {
				this.current = index;
				// this.getOrderList(index);
			},
			toPage(order_id){
				uni.navigateTo({
					url: './detail'
				});
			}
		}
	}
</script>

<style>
	image{
		width: 128px;
		height: 195px;
		margin-top: 116px;
	}
	.title{
		margin-top: 19px;
		font-size: 15px;
		color: #666666;
	}
	.list{
		padding: 10px 12px;
	}
	.item{
		background: #FFFFFF;
		border-radius: 10px;
		padding: 10px 0;
		margin-bottom: 10px;
		overflow: hidden;
	}
	.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
		display: block;
		height: 0;
		clear:both;
		visibility: hidden;
	}

</style>
