<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;">
		<view style="background: #FFE300;padding: 10px 20px;font-size: 14px;color: #333333;overflow: hidden;">
			<view style="float: left;">2020年12月</view>
			<view style="float: right;margin-left: 5px;"><image src="/static/runRider/user8.png" style="width: 12px;height: 12px;" mode="aspectFit"></image></view>
			<view style="float: right;">按月筛选</view>
		</view>
		
		<view class="u-tabs-box">
			<u-tabs-swiper inactive-color="#333333" font-size="14px" activeColor="#FFE300" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		
		<view class="list">
			<view class="item" @click="toPage(1)">
				
				<view style="font-size: 14px;overflow: hidden;">
					<view style="float:left;">配送费入账</view>
					<view style="float:right;color: #00C56C">+ 2.00</view>
				</view>
				
				<view style="font-size: 12px;color: #999999;overflow: hidden;">
					<view style="float:left;">2020-12-24 11:22</view>
					<view style="float:right;">2.00</view>
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
						name: '全部'
					},
					{
						name: '订单入账'
					},
					{
						name: '申请提现'
					}
				],
				dataList:[1],
			}
		},
		methods: {
			
		}
	}
</script>

<style>

	.list{
		background-color: #FFFFFF;
		border-top: 1px solid rgba(153, 153, 153, 0.2);
		padding-bottom: 17px;
	}
	.item{
		overflow: hidden;
		border-bottom: 1px solid rgba(153, 153, 153, 0.2);
		padding: 15px 17px;
	}
</style>
