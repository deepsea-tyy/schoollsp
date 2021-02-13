<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;">
		<view class="u-tabs-box">
			<u-tabs-swiper inactive-color="#333333" font-size="14px" activeColor="#FFE300" ref="tabs" :list="tabList" :current="current"
			 @change="change" :is-scroll="false" swiperWidth="750"></u-tabs-swiper>
		</view>
		<view v-if="list.length == 0" style="text-align: center;">
			<image src="/static/dd1.png" mode="aspectFit"></image>
			<view class="title">暂无订单</view>
		</view>
		<view class="list">
			<view v-for="(item, index) in list" class="item">
				<view class="clearfix" @click="orderDetail(item.id)">
					<view style="font-size: 12px;color: #FFFFFF;float:left;margin-left: 15px;width: 16px;height: 16px;background: #FF4C25;border-radius: 10px;text-align: center;">取</view>
					<view style="float:left;margin-left: 5px;font-size: 12px;">{{item.type==2?'取快递':(item.type==3?'外卖代拿':(item.type==4?'校园跑腿':'其他帮助'))}}</view>
					<view style="float:left;margin-left: 5px;font-weight: bold;font-size: 12px;color: #333333;">{{item.runerrandsStartPlace.name}}</view>
					<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;font-weight: 500;">¥ {{item.pay_price}}</view>
				</view>

				<view v-if="item.type==5" class="clearfix" @click="orderDetail(item.id)">
					<view style="font-size: 12px;color: #FFFFFF;float:left;margin-left: 15px;width: 16px;height: 16px;background: #00C56C;border-radius: 10px;text-align: center;">帮</view>
					<view style="float:right;font-size: 12px;color: #FF0000;margin-right: 14px;">¥ {{item.pay_price}}</view>
				</view>

				<view style="margin-top: 10px;" @click="orderDetail(item.id)">
					<view style="font-size: 12px;color: #666666;margin-left: 15px;">{{item.shipAddress.school}} {{item.shipAddress.school_area}} {{item.shipAddress.building_no}}-{{item.shipAddress.floor}}-{{item.shipAddress.house_number}}</view>
					<view style="font-size: 12px;color: #666666;margin-left: 15px;">{{item.type!=5&&!item.runerrandsWeight?'斤以下':item.runerrandsWeight.title}}</view>
					<view class="clearfix">
						<view style="text-align: center;float:left;margin-left: 15px;font-size: 10px;color: #FF4C25;height: 15px;background: rgba(153, 153, 153, 0.5);opacity: 0.5;border-radius: 5px;padding:0 6px">
							下单时间 {{$fun.formatDate(item.created_at,1)}}
						</view>
						<view style="float:right;text-align: center;margin-right: 32px;font-size: 10px;color: #FF4C25;height: 15px;background: rgba(153, 153, 153, 0.5);opacity: 0.5;border-radius: 5px;padding:0 6px">
							立即送达
						</view>
					</view>
				</view>
				<view @click="btnClick(item.id,1)" v-if="!item.receiver" style="background: #FFE300;border-radius: 5px;margin: 10px 27px;height: 25px;padding-top: 3px;text-align: center;">
					立即抢单
				</view>
				<view v-if="item.receiver && item.complete!=3" style="margin-top: 10px;font-size: 12px;color: #FFE300;">
					<view style="height: 25px;padding-top: 4px;float: left;margin-left: 27px;width: 140px;border: 1px solid #FFE300;box-sizing: border-box;border-radius: 5px;;text-align: center;">
						电话：13876684031
					</view>
					<view @click="btnClick(item.id,2)" v-if="!item.complete" style="height: 25px;padding-top: 4px;float: right;color: #333333;margin-right: 27px;background: #FFE300;width: 140px;border-radius: 5px;text-align: center;">
						确认取货
					</view>
					<view @click="btnClick(item.id,3)" v-if="item.complete==1" style="height: 25px;padding-top: 4px;float: right;color: #333333;margin-right: 27px;background: #FFE300;width: 140px;border-radius: 5px;text-align: center;">
						确认送达
					</view>
				</view>
			</view>

		</view>
		<u-modal ref="uModal" v-model="mshow" :show-cancel-button="true" 
			:show-title="showTitle" 
			@confirm="confirm" :content="content"
			confirm-color="#FFE300"
		>
		</u-modal>
	</view>
</template>

<script>
	import {
		runerrandsOrderList,
		runerrandsOrderDelivery,
		runerrandsOrderComplete
	} from '../../../common/api/runRider/home.js'
	export default {
		data() {
			return {
				mshow:false,
				content: '',
				type: 0,
				order_id: 0,
				current: 0,
				swiperCurrent: 0,
				tabList: [{
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
				list: [],
				timer:null
			}
		},
		onLoad() {
			this.school_id = uni.getStorageSync('rider_schoo_id')
		},
		onShow() {
			this.change(this.current)
			this.timer = setInterval(() => {
				this.change(this.current)
			}, 5000)
		},
		onHide() {
			clearInterval(this.timer)
		},
		methods: {
			// tab栏切换
			change(index) {
				this.current = index
				switch(index) {
				     case 0:
						this.getList({school_id:this.school_id,delivery:1})
				        break;
				     case 1:
						this.getList({school_id:this.school_id,delivery:2})
				        break;
				     case 2:
						this.getList({school_id:this.school_id,delivery:2,complete:1})
				        break;
				     case 3:
						this.getList({school_id:this.school_id,delivery:2,complete:'2,3'})
				        break;
				     default:
				}
			},
			orderDetail(order_id) {
				uni.navigateTo({
					url: './detail?order_id=' + order_id
				})
			},
			async getList(params) {
				let res = await runerrandsOrderList(params)
				this.list = res.list
			},
			btnClick(order_id,type){
				this.type = type
				this.mshow = true
				this.order_id = order_id
				switch(type) {
				     case 1:
						this.content = '您确定要抢单吗？'
				        break;
				     case 2:
						this.content = '您确定已取货吗？'
				        break;
				     case 3:
						this.content = '您确定已送达吗？'
				        break;
				     default:
				}
			},
			confirm(){
				if(this.type == 1){
					this.delivery(this.order_id)
				}
				if(this.type == 2){
					this.complete({order_id:this.order_id, complete:1})
				}
				if(this.type == 3){
					this.complete({order_id:this.order_id, complete:2})
				}
			},
			async delivery(id){
				await runerrandsOrderDelivery(id)
				uni.showToast({ title: '抢单成功' })
			},
			async complete(data){
				await runerrandsOrderComplete(data)
				uni.showToast({  })
			}
		}
	}
</script>

<style>
	image {
		width: 128px;
		height: 195px;
		margin-top: 116px;
	}

	.title {
		margin-top: 19px;
		font-size: 15px;
		color: #666666;
	}

	.list {
		padding: 10px 12px;
	}

	.item {
		background: #FFFFFF;
		border-radius: 10px;
		padding: 10px 0;
		margin-bottom: 10px;
		overflow: hidden;
	}

	.clearfix:after {
		/*伪元素是行内元素 正常浏览器清除浮动方法*/
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}
</style>
