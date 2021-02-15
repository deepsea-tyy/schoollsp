<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;font-size: 13px;">
		<view class="u-tabs-box">
			<u-tabs-swiper inactive-color="#333333" font-size="14px" activeColor="#FFE300" ref="tabs" :list="list" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<view style="margin: 10px 15px;color: #999999;">统计时间：{{item.start}}到{{item.end}}</view>
		
		<view style="background: #FFFFFF;padding: 10px 15px;">
			<view style="overflow: hidden;margin-bottom: 20px;">
				<view style="float:left;">跑腿战绩</view>
				<view style="float:right;color: #FF0000;">收入：{{item.money}}元</view>
			</view>
			<view style="overflow: hidden;">
				<view style="width: 33.3%;text-align: center;float:left;border-right: 1px solid rgba(153, 153, 153, 0.3);">
					<view style="color: #FF0000;">{{item.all}}</view>
					<view style="margin-top: 10px;">已抢</view>
				</view>
				<view style="width: 33.3%;text-align: center;;float:left;border-right: 1px solid rgba(153, 153, 153, 0.3);">
					<view style="color: #FF0000;">{{item.succ}}</view>
					<view style="margin-top: 10px">成功</view>
				</view>
				<view style="width: 33.3%;text-align: center;;float:left;">
					<view style="color: #FF0000;">{{item.cancel}}</view>
					<view style="margin-top: 10px">取消</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		userStatistics
	} from '../../../common/api/runRider/user.js'
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
				item:{succ: 0, all: 0, money: 0, cancel: 0},
				
			}
		},
		onShow() {
			this.userStatistics({})
		},
		methods: {
			async userStatistics(params) {
				this.item = await userStatistics(params)
			},
			change(index) {
				this.current = index
				switch(index) {
				     case 0:
						this.userStatistics({})
				        break;
				     case 1:
						this.userStatistics({type:1})
				        break;
				     case 2:
						this.userStatistics({type:2})
				        break;
				     case 3:
						this.userStatistics({type:3})
				        break;
				     default:
				}
			},
			
		}
	}
</script>

<style>

</style>
