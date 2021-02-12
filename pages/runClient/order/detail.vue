<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;padding-top: 10px;">
		<view class="title">
			<view @click="show=true" style="position: absolute;left: 50%;transform: translate(-50%,-50%);">
				<view style="box-sizing: border-box;display: flex;align-items: center;height: 25px;font-size: 14px;"> {{item.status==2?'已取消':(item.complete==2?'订单已完成':(item.pay_status == 1 ? '订单代付款':(item.receiver?'订单进行中':'订单待接单')))}}<image src="/static/runClient/order1.png" mode="aspectFit"></image></view>
			</view>
			<view v-if="item.status==1 && item.complete != 2" style="margin-top: 28px;position: absolute;left: 50%;transform: translate(-50%,-50%);">
				<view v-if="item.pay_status == 1" @click="btnClick(1)" class="btn">立即支付</view><view  v-if="!item.receiver" @click="btnClick(2)" class="btn">取消订单</view>
			</view>
			<view v-if="item.status==1 && item.receiver" style="margin-top: 28px;position: absolute;left: 50%;transform: translate(-50%,-50%);">
				<view @click="btnClick(3)" class="btn">确认收货</view><view @click="btnClick(4)" class="btn">联系骑手</view>
			</view>
		</view>
		<view style="padding: 10px 15px;background-color: #FFFFFF;">
			<view class="dtitle">取件信息</view>
			<view class="dmsg" style="margin-bottom: 10px;">{{item.runerrands.content}}</view>
			<view class="msg">
				<text class="dtitle">订单类型：</text><text class="dmsg">{{item.type==2?'取快递':(item.type==3?'外卖代拿':(item.type==4?'校园跑腿':'其他帮助'))}}</text>
			</view>
			<view class="msg">
				<text class="dtitle">收  件  人：</text><text class="dmsg">{{item.ship_name}}</text>
			</view>
			<view class="msg">
				<text class="dtitle">联系电话：</text><text class="dmsg">{{item.ship_phone}}</text>
			</view>
			<view v-if="item.ship_address" class="msg">
				<text class="dtitle">收货地址：</text><text class="dmsg">{{item.ship_address.school}}{{item.ship_address.building_no}}号楼{{item.ship_address.house_number}}{{item.ship_address.house_number}}室</text>
			</view>
			<view class="msg">
				<text class="dtitle">性别限制：</text><text class="dmsg">{{item.runerrands.gender===null?'不限制':(item.runerrands.gender==1?'男':'女')}}</text>
			</view>
			<view class="msg">
				<text class="dtitle">订单编号：</text><text class="dmsg">{{item.id}}</text>
			</view>
			<view class="msg">
				<text class="dtitle">下单时间：</text><text class="dmsg">{{$fun.formatDate(item.created_at,1)}}</text>
			</view>
			<view class="msg">
				<text class="dtitle">优  惠  券：</text><text class="dmsg">{{item.coupon?'有':'无'}}</text>
			</view>
			<view class="msg">
				<text class="dtitle">费         用：</text><text class="dmsg">¥{{item.pay_price}}</text>
			</view>
		</view>
		<u-popup v-model="show" mode="bottom" closeable="true">
			<view style="padding: 15px;">
				<view style="font-size: 18px;color: #000000;margin-bottom: 10px;">订单跟踪</view>
				<view class="time-line">
					<u-time-line>
						<u-time-line-item>
							<template v-slot:content>
								<view class="clearfix">
									<view class="u-order-title">订单提交成功</view>
									<view class="u-order-time">{{$fun.formatDate(item.created_at,6)}}</view>
								</view>
								<view class="u-order-desc">单号：{{item.id}}</view>
							</template>
						</u-time-line-item>
						
						<u-time-line-item v-if="item.pay_status==2">
							<template v-slot:content>
								<view class="clearfix">
									<view class="u-order-title">订单支付成功</view>
									<view class="u-order-time">{{$fun.formatDate(item.pay_at,6)}}</view>
								</view>
								<view class="u-order-desc">支付时间：{{$fun.formatDate(item.pay_at,1)}}</view>
							</template>
						</u-time-line-item>
						
						<u-time-line-item v-if="item.pay_status==2">
							<template v-slot:content>
								<view class="clearfix">
									<view class="u-order-title">待接单</view>
									<view class="u-order-time">{{$fun.formatDate($fun.getDate(),6)}}</view>
								</view>
								<view class="u-order-desc">超出{{item.runerrands.overtime}}分钟未接单，平台将自动取消订单</view>
							</template>
						</u-time-line-item>
						
						<u-time-line-item v-if="item.rider">
							<template v-slot:content>
								<view class="clearfix">
									<view class="u-order-title">已接单</view>
									<view class="u-order-time">{{$fun.formatDate(item.receiver_at,6)}}</view>
								</view>
								<view class="u-order-desc">配送员：{{item.rider.name}}，手机号：{{item.rider.phone}}</view>
							</template>
						</u-time-line-item>
						
						<u-time-line-item v-if="item.complete==2">
							<template v-slot:node>
								<view style="background: #FFE300;border-radius:50px">
									<image src="/static/runClient/order2.png" mode="aspectFit"></image>
								</view>
							</template>
							<template v-slot:content>
								<view class="clearfix">
									<view class="u-order-title acitve">订单已完成</view>
									<view class="u-order-time">{{$fun.formatDate(item.complete_at,6)}}</view>
								</view>
								<view class="u-order-desc">任何意见和吐槽，都欢迎联系我们</view>
							</template>
						</u-time-line-item>
					</u-time-line>
				</view>
			</view>
		</u-popup>
		
		<u-modal ref="uModal" v-model="mshow" :show-cancel-button="true" 
			:show-title="showTitle" 
			@confirm="confirm" :content="content"
			confirm-color="#FFE300"
		>
		</u-modal>
	</view>
</template>

<script>
	import {orderView,orderUpdate} from '../../../common/api/runClient/order.js'
	import {orderPay} from '../../../common/api/runClient/home.js'
	export default {
		data() {
			return {
				show:false,
				mshow:false,
				content: '',
				showTitle: true,
				item:{},
				type:0
			}
		},
		onLoad(params) {
			this.getOrderView(params.order_id)
		},
		methods: {
			btnClick(type){
				this.type = type
				switch(type) {
				     case 1:
						this.pay()
				        break;
				     case 2:
						this.content = '您确定要取消该订单吗？'
						this.mshow = true
				        break;
				     case 3:
						this.content = '您确定要确认收货吗？'
						this.mshow = true
				        break;
				     case 4:
					 
				        break;
				        
				     default:
				}
			},
			confirm(){
				if(this.type == 2 || this.type == 3){
					this.update()
				}
			},
			async getOrderView(id){
				this.item =  await orderView(id)
			},
			async pay(){
				let pay = await orderPay({order_id:this.item.id,scene:2,pay_platform:2,pay_type:'lite'})
				let that = this
				uni.requestPayment({
					provider: 'wxpay',
					timeStamp: pay.timeStamp,
					nonceStr: pay.nonceStr,
					package: pay.package,
					signType: pay.signType,
					paySign: pay.paySign,
					success: function (res) {
						that.toPage('/pages/runClient/order/index')
					},
					fail: function (err) {
						console.log('fail:' + JSON.stringify(err));
					}
				});
			},
			async update(){
				let data = {}
				if(this.type==2){
					data.status=2
					data.id=this.item.id
					await orderUpdate(data)
					uni.switchTab({
						url: '/pages/runClient/order/index',
						success: (res) => {
							var page = getCurrentPages().pop();
							if (page == undefined || page == null) return;
							page.onLoad();
						}
					});
				}
				if(this.type==3){
					data.complete=1
					data.id=this.item.id
					await orderUpdate(data)
					this.getOrderView(this.item.id)
				}
			}
		}
	}
</script>

<style>
	.title{
		height: 70px;
		background-color: #FFFFFF;
		padding-top: 17px;;
		margin-bottom: 10px;
		text-align: center;
		position: relative;
		color: #333333;
	}
	.title image{
		width: 18px;
		height: 18px;
	}
	.dtitle{
		font-size: 14px;
		color: #666666;
	}
	.dmsg{
		font-size: 12px;
		color: #666666;
	}
	.msg{
		margin-bottom: 10px;
	}
	.btn{
		width: 60px;
		border: 1px solid rgba(153, 153, 153, 0.5);
		border-radius: 3px;
		font-size: 12px;
		color: #333333;
		float: left;
		margin-right: 11px;
	}
	
	.time-line{
		color: #999999;
		font-size: 12px;
		padding-bottom: 42px;
	}
	.u-order-title {
		color: #999999;
		float: left;
	}
	.u-order-desc {
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		float: right;
	}
	.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
		display: block;
		height: 0;
		clear:both;
		visibility: hidden;
	}
	.clearfix{
	}
	.acitve{
		color: #FFE300;
	}
	.time-line image{
		width: 10px;
		height: 10px;
	}
</style>
