<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;padding-top: 10px;">
		<view style="height: 141px;background: #FFFFFF;padding: 16px 15px;font-size: 12px;">
			<view class="clearfix">
				<view style="color: #FFFFFF;float:left;width: 16px;height: 16px;background: #FF4C25;border-radius: 10px;text-align: center;">取</view> 
				<view style="color: #000000;float:left;margin-left: 15px;">天天快递-近邻宝</view>
			</view>
			
			<view class="clearfix">
				<view style="margin-top: 20px;color: #FFFFFF;float:left;width: 16px;height: 16px;background: #00C56C;border-radius: 10px;text-align: center;">送</view> 
				<view style="float:left;margin-left: 15px;margin-top: 11px;">
					<view style="color: #000000;">上海交通大学(闵行校区)A9-5-503</view>
					<view style="color: #666666;margin-top: 2px;">陈俊霖 13876684031</view>
				</view>
			</view>
			<view style="border-bottom: 1px solid rgba(153, 153, 153, 0.1);margin-top: 10px;"></view>
			<view style="position: relative;">
				<view class="btn">联系客户</view>
			</view>
		</view>
		<view style="margin: 10px 0;margin-left: 15px;">服务信息</view>
		
		<view style="background: #FFFFFF;padding: 16px 15px;font-size: 12px;">
			<view style="color: #000000;margin-bottom:10px">立即送达</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">服务信息：</view>
				<view style="float:left;width: 80%;">
					【菜鸟裹裹】您的快递12345678(XX快递)已送到，请及时取。取件码1234。
				</view>
			</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">物品重量：</view>
				<view style="float:left;width: 80%;">
					5斤以下
				</view>
			</view>
			<view class="clearfix" style="color: #666666;">
				<view style="float:left;">手机号码：</view>
				<view style="float:left;width: 80%;">
					13876684031
				</view>
			</view>
		</view>
		
		<view style="margin: 10px 0;margin-left: 15px;">订单信息</view>
		
		<view style="background: #FFFFFF;padding: 16px 15px;font-size: 12px;">
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">订单编号：</view>
				<view style="float:left;width: 80%;">
					1254202012231715485622
				</view>
			</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">下单时间：</view>
				<view style="float:left;width: 80%;">
					2020-12-23 17:35
				</view>
			</view>
			<view class="clearfix" style="color: #666666;">
				<view style="float:left;">支付时间：</view>
				<view style="float:left;width: 80%;">
					2020-12-23 17:36
				</view>
			</view>
		</view>
		
		<view style="margin: 10px 0;margin-left: 15px;">订单收入</view>
		
		<view style="background: #FFFFFF;padding: 16px 15px;font-size: 12px;">
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">配  送  费：</view>
				<view style="float:left;width: 80%;">
					¥3.00
				</view>
			</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">优  惠  券：</view>
				<view style="float:left;width: 80%;">
					¥0.50
				</view>
			</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">小 费：</view>
				<view style="float:left;width: 80%;">
					¥1.00
				</view>
			</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">平台服务费：</view>
				<view style="float:left;width: 70%;">
					¥0.75
				</view>
			</view>
			<view class="clearfix" style="color: #666666;">
				<view style="float:left;">本单收入：</view>
				<view style="float:left;width: 80%;">
					¥2.75
				</view>
			</view>
		</view>
		
		<view>
			<view style="width:22%;text-align: center;float: left;margin-left: 8px;padding: 3px 10px;border-radius: 5px;background: #FFE300;">确认取货</view>
			<view style="width:22%;text-align: center;float: left;margin-left: 8px;padding: 3px 10px;border-radius: 5px;background: #FFE300;">申请转单</view>
			<view style="width:22%;text-align: center;float: left;margin-left: 8px;padding: 3px 10px;border-radius: 5px;background: #00C56C;color: #FFFFFF;">定向转单</view>
			<view style="width:22%;text-align: center;float: left;margin-left: 8px;padding: 3px 10px;border-radius: 5px;background: #FF4C25;color: #FFFFFF;">取消订单</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

	.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
		display: block;
		height: 0;
		clear:both;
		visibility: hidden;
	}
	
	.btn{
		position: absolute;
		top: 25px;
		left: 50%;
		transform: translate(-50%,-50%);
		background: #FFE300;
		border-radius: 5px;
		height: 30px;
		width: 200px;
		padding-top: 6px;
		text-align: center;
	}
</style>
