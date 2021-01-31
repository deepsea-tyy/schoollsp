<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;padding-top: 10px;">
		<view class="title">
			<view @click="show=true" style="position: absolute;left: 50%;transform: translate(-50%,-50%);">
				<view style="box-sizing: border-box;display: flex;align-items: center;height: 25px;font-size: 14px;">订单代付款 <image src="/static/runClient/order1.png" mode="aspectFit"></image></view>
			</view>
			<view style="margin-top: 28px;position: absolute;left: 50%;transform: translate(-50%,-50%);">
				<view class="btn">立即支付</view><view @click="btnClick(1)" class="btn">取消订单</view>
			</view>
			<view style="margin-top: 48px;position: absolute;left: 50%;transform: translate(-50%,-50%);">
				<view @click="btnClick(1)" class="btn">确认收货</view><view class="btn">联系骑手</view>
			</view>
		</view>
		<view style="padding: 10px 15px;background-color: #FFFFFF;">
			<view class="dtitle">取件信息</view>
			<view class="dmsg" style="margin-bottom: 10px;">【菜鸟裹裹】您的快递12345678(XX快递)已送到，请及时取。取件码1234。</view>
			<view class="msg">
				<text class="dtitle">订单类型：</text><text class="dmsg">取快递</text>
			</view>
			<view class="msg">
				<text class="dtitle">收  件  人：</text><text class="dmsg">陈先生</text>
			</view>
			<view class="msg">
				<text class="dtitle">联系电话：</text><text class="dmsg">13876684031</text>
			</view>
			<view class="msg">
				<text class="dtitle">收货地址：</text><text class="dmsg">上海交通大学10号楼5层503室</text>
			</view>
			<view class="msg">
				<text class="dtitle">性别限制：</text><text class="dmsg">不限</text>
			</view>
			<view class="msg">
				<text class="dtitle">订单编号：</text><text class="dmsg">1254202012231715485622</text>
			</view>
			<view class="msg">
				<text class="dtitle">下单时间：</text><text class="dmsg">12-23 15:48</text>
			</view>
			<view class="msg">
				<text class="dtitle">优  惠  券：</text><text class="dmsg">无</text>
			</view>
			<view class="msg">
				<text class="dtitle">费         用：</text><text class="dmsg">¥2.00</text>
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
									<view class="u-order-time">17:05</view>
								</view>
								<view class="u-order-desc">单号：1254202012231715485622</view>
							</template>
						</u-time-line-item>
						
						<u-time-line-item>
							<template v-slot:content>
								<view class="clearfix">
									<view class="u-order-title">订单待支付</view>
									<view class="u-order-time">17:05</view>
								</view>
								<view class="u-order-desc"></view>
							</template>
						</u-time-line-item>
						
						<u-time-line-item>
							<template v-slot:content>
								<view class="clearfix">
									<view class="u-order-title">订单支付成功</view>
									<view class="u-order-time">17:05</view>
								</view>
								<view class="u-order-desc">支付时间：2020-12-23 17:05</view>
							</template>
						</u-time-line-item>
						
						<u-time-line-item>
							<template v-slot:content>
								<view class="clearfix">
									<view class="u-order-title">待接单</view>
									<view class="u-order-time">17:05</view>
								</view>
								<view class="u-order-desc">超出1分钟未接单，平台将自动取消订单</view>
							</template>
						</u-time-line-item>
						
						<u-time-line-item>
							<template v-slot:content>
								<view class="clearfix">
									<view class="u-order-title">已接单</view>
									<view class="u-order-time">17:05</view>
								</view>
								<view class="u-order-desc">配送员：陈俊霖，手机号：13876684031</view>
							</template>
						</u-time-line-item>
						
						<u-time-line-item>
							<template v-slot:node>
								<view style="background: #FFE300;border-radius:50px">
									<image src="/static/runClient/order2.png" mode="aspectFit"></image>
								</view>
							</template>
							<template v-slot:content>
								<view class="clearfix">
									<view class="u-order-title acitve">订单已完成</view>
									<view class="u-order-time">17:05</view>
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
	export default {
		data() {
			return {
				show:false,
				mshow:false,
				content: '您确定要取消该订单吗？',//您确定要确认收货吗？
				showTitle: true,
			}
		},
		methods: {
			btnClick(order_id){
				this.mshow = true
			},
			confirm(){
				
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
