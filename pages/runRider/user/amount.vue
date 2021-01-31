<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;">
		<view style="margin: 10px 0;background-color: #FFFFFF;padding: 10px 20px;font-size: 14px;color: #000000;">
			<view style="margin-bottom: 10px;">账户可提现金额：<text style="color: #FF0000;">¥10.00</text></view>
			<view>累计已提现金额：<text style="color: #FF0000;">¥10.00</text></view>
		</view>
		
		<view style="margin: 10px 0;background-color: #FFFFFF;padding: 10px 20px;font-size: 14px;color: #000000;overflow: hidden;">
			<view style="margin-bottom: 17px;">提现金额：</view>
			<view style="font-size: 20px;border-bottom: 1px solid #999999;overflow: hidden;margin-bottom: 10px;">
				<view style="float: left;margin-right: 16px;">¥ </view>
				<view style="float: left;">
					<input type="text" value="" placeholder="请输入提现金额"/>
				</view>
			</view>
			<view style="font-size: 12px;color: #999999;overflow: hidden;">
				<view style="float: left;">
						<view style="">1.最低提现金额为0元</view>
						<view style="">2.提现费率为0%，最低收取0元</view>
						<view style="">3.平台将于每月15日进行提现打款审核</view>
				</view>
				<view style="float: right;color: #000000;">全部提现</view>
			</view>
		</view>
		
		<view style="margin: 20px 0;background-color: #FFFFFF;padding: 10px 20px;font-size: 14px;color: #000000;overflow: hidden;">
			<view style="margin-bottom: 10px;">提现到：</view>
			<view style="font-size: 15px;font-weight: 500;">
				<view style="float: left;margin-right: 12px;">
					<image src="/static/runRider/user7.png" style="width: 30px;height: 30px;" mode="aspectFit"></image>
				</view>
				<view style="float: left;padding-top: 3px;">微信零钱</view>
				<view style="float: right;padding-top: 3px;"></view>
			</view>
		</view>
		<view style="padding: 0px 13px;">
			<view style="background: #FFE300;border-radius: 25px;text-align: center;padding: 10px 0;">提交审核</view>
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
	
</style>
