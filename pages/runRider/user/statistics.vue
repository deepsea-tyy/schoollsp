<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;font-size: 13px;">
		<view class="u-tabs-box">
			<u-tabs-swiper inactive-color="#333333" font-size="14px" activeColor="#FFE300" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<view style="margin: 10px 15px;color: #999999;">统计时间：2020-12-24 00:00到2020-12-24 23:59</view>
		
		<view style="background: #FFFFFF;padding: 10px 15px;">
			<view style="overflow: hidden;margin-bottom: 20px;">
				<view style="float:left;">跑腿战绩</view>
				<view style="float:right;color: #FF0000;">收入：20元</view>
			</view>
			<view style="overflow: hidden;">
				<view style="width: 33.3%;text-align: center;float:left;border-right: 1px solid rgba(153, 153, 153, 0.3);">
					<view style="color: #FF0000;">10</view>
					<view style="margin-top: 10px;">已抢</view>
				</view>
				<view style="width: 33.3%;text-align: center;;float:left;border-right: 1px solid rgba(153, 153, 153, 0.3);">
					<view style="color: #FF0000;">10</view>
					<view style="margin-top: 10px">成功</view>
				</view>
				<view style="width: 33.3%;text-align: center;;float:left;">
					<view style="color: #FF0000;">10</view>
					<view style="margin-top: 10px">取消</view>
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
						name: '今天'
					},
					{
						name: '昨天'
					},
					{
						name: '本月'
					},
					{
						name: '上月'
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

</style>
