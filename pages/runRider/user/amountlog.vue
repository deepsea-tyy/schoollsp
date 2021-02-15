<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;">
		<view @click="selectorShow=true" style="background: #FFE300;padding: 10px 20px;font-size: 14px;color: #333333;overflow: hidden;">
			<view style="float: left;">{{date}}</view>
			<view style="float: right;margin-left: 5px;"><image src="/static/runRider/user8.png" style="width: 12px;height: 12px;" mode="aspectFit"></image></view>
			<view style="float: right;">按月筛选</view>
		</view>
		
		<view class="u-tabs-box">
			<u-tabs-swiper inactive-color="#333333" font-size="14px" activeColor="#FFE300" ref="tabs" :list="tabList" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		
		<view class="list">
			<view v-for="(item, index) in list" class="item">
				
				<view style="font-size: 14px;overflow: hidden;">
					<view style="float:left;">{{item.status==2?'申请提现':'配送费入账'}}</view>
					<view style="float:right;color: #00C56C">{{item.status==2?'-':'+'}} {{item.point}}</view>
				</view>
				
				<view style="font-size: 12px;color: #999999;overflow: hidden;">
					<view style="float:left;">{{$fun.formatDate(item.created_at,1)}}</view>
					<view style="float:right;">{{item.amount}}</view>
				</view>
				
			</view>
			
		</view>
		<u-picker 
			v-model="selectorShow" 
			:mode="'time'" 
			:defaultTime="selectorDefTime"
			@confirm="selectCfm" 
			:params="selectorPam"></u-picker>
	</view>
</template>

<script>
	import {
		fundLog
	} from '../../../common/api/runRider/user.js'
	export default {
		data() {
			return {
				current: 0,
				swiperCurrent: 0,
				tabList: [
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
				list:[],
				selectorShow:false,
				selectorDefTime:null,
				selectorPam: {
					year: true,
					month: true,
					day: false,
					hour: false,
					minute: false,
					second: false,
					province: false,
					city: false,
					area: false,
					timestamp: true
				},
				date:'',
				dateTime:0,
			}
		},
		onShow() {
			this.getList({scene:1,dateTime:this.dateTime})
			this.date = this.$fun.getDate(1)
		},
		methods: {
			change(index) {
				this.current = index
				switch(index) {
				     case 0:
						this.getList({scene:1,dateTime:this.dateTime})
				        break;
				     case 1:
						this.getList({scene:1,dateTime:this.dateTime,object_type:1,status:1})
				        break;
				     case 2:
						this.getList({scene:1,dateTime:this.dateTime,object_type:2})
				        break;
				     default:
				}
			},
			async getList(params) {
				let res = await fundLog(params)
				this.list = res.list
			},
			selectCfm(e){
				this.dateTime = e.timestamp
				this.date = e.year + '年' + e.month + '月'
				this.change(this.current)
			},
			
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
