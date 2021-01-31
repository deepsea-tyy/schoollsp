<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;">
		<view class="u-tabs-box">
			<u-tabs-swiper inactive-color="#333333" font-size="14px" activeColor="#FFE300" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		
		<view class="list">
			<view class="item" @click="toPage(1)">
				
				<view style="font-size: 14px;overflow: hidden;">
					<view style="float:left;">申请中</view>
					<view style="float:right;color: #00C56C">+ 2.00</view>
				</view>
				
				<view style="font-size: 12px;color: #999999;overflow: hidden;">
					<view style="float:left;">2020-12-24 11:22</view>
					<view style="float:right;">手续费：¥0.00</view>
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
						name: '申请中'
					},
					{
						name: '申请成功'
					},
					{
						name: '已撤销'
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
		border-bottom: 1px solid rgba(153, 153, 153, 0.2);
		padding: 15px 17px;
	}
</style>
