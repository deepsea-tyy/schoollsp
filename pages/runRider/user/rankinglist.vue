<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;padding: 10px;16px">
		<view class="list">
			<view class="item" @click="toPage(1)">
				<view class="clearfix" style="border-bottom: 1px solid rgba(153, 153, 153, 0.2);padding-bottom: 10px;">
					<view style="float:left;height: 16px;border-radius: 50px;text-align: center;">头像</view> 
					<view style="float:left;margin-left: 5px;font-size: 12px;">张三</view>
					<view style="float:right;background: #FFC300;border-radius: 8px 0px 0px 8px;color: #FFFFFF;padding: 1px 5px;">NO.1</view>
				</view>
				

				<view class="clearfix" style="margin-top: 10px;">
					<view style="float:left;width:25%;text-align: center;">
						<view style="margin-bottom: 5px;">20</view>
						<view style="color: #666666;">日单数</view>
					</view>
					<view style="float:left;width:25%;text-align: center;">
						<view style="margin-bottom: 5px;">103</view>
						<view style="color: #666666;">累计单数</view>
					</view>
					<view style="float:left;width:25%;text-align: center;">
						<view style="margin-bottom: 5px;color: #FF0000;">45</view>
						<view style="color: #666666;">日收入</view>
					</view>
					<view style="float:left;width:25%;text-align: center;">
						<view style="margin-bottom: 5px;color: #FF0000;">206</view>
						<view style="color: #666666;">累计收入</view>
					</view>
					
				</view>
				
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataList:[1],
			}
		},
		methods: {
		}
	}
</script>

<style>
	.item{
		font-size: 12px;
		background-color: #FFFFFF;
		padding: 10px 15px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 10px;
	}
	.clearfix{
		overflow: hidden;
	}
</style>
