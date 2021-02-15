<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;">
		<view class="u-tabs-box">
			<u-tabs-swiper inactive-color="#333333" font-size="14px" activeColor="#FFE300" ref="tabs" :list="tabList" :current="current" @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		
		<view class="list">
			<view v-for="(item, index) in list" class="item">
				
				<view style="font-size: 14px;overflow: hidden;">
					<view style="float:left;">{{item.status==1?'提现成功':(item.status==2?'已撤销':'申请中')}}</view>
					<view style="float:right;color: #00C56C">{{item.money}}</view>
				</view>
				
				<view style="font-size: 12px;color: #999999;overflow: hidden;">
					<view style="float:left;">{{$fun.formatDate(item.created_at,2)}}</view>
					<view style="float:right;">手续费：¥{{item.commission}}</view>
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	import {
		drawMoneyList
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
						name: '申请中'
					},
					{
						name: '申请成功'
					},
					{
						name: '已撤销'
					}
				],
				list:[],
			}
		},
		onShow() {
			this.getList({scene:1})
			this.date = this.$fun.getDate(1)
		},
		methods: {
			async getList(params) {
				let res = await drawMoneyList(params)
				this.list = res.list
			},
			change(index) {
				this.current = index
				switch(index) {
				     case 0:
						this.getList({scene:1})
				        break;
				     case 1:
						this.getList({scene:1,status:0})
				        break;
				     case 2:
						this.getList({scene:1,status:1})
				        break;
				     case 3:
						this.getList({scene:1,status:2})
				        break;
				     default:
				}
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
		border-bottom: 1px solid rgba(153, 153, 153, 0.2);
		padding: 15px 17px;
	}
</style>
