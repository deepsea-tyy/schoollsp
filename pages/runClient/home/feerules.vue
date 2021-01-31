<template>
	<view style="min-height: 100vh;background-color: #F5F6FE;">
		<view style="background-color: #FFFFFF;padding: 16px 15px;font-size: 15px;color: #000000;">
			<view class="item clearfix">
				<view style="float:left;">基础配送费</view>
				<view style="float:right;">2.00元</view>
			</view>
			<view class="item clearfix">
				<view style="margin-bottom: 5px;">重量附加费</view>
				<view class="item-detail clearfix">
					<view style="float:left;">6-10斤时</view>
					<view style="float:right;">+1.00元</view>
				</view>
				<view class="item-detail clearfix">
					<view style="float:left;">6-10斤时</view>
					<view style="float:right;">+1.00元</view>
				</view>
			</view>
			<view class="item clearfix">
				<view style="margin-bottom: 5px;">特殊时段费</view>
				<view class="item-detail clearfix">
					<view style="float:left;">11:30-13:30</view>
					<view style="float:right;">+1.00元</view>
				</view>
				<view class="item-detail clearfix">
					<view style="float:left;">11:30-13:30</view>
					<view style="float:right;">+1.00元</view>
				</view>
			</view>
			
			<view class="item clearfix">
				<view style="margin-bottom: 5px;">配送难度费</view>
				<view class="item-detail clearfix">
					<view style="float:left;">5楼以上</view>
					<view style="float:right;">+1.00元</view>
				</view>
				<view class="item-detail clearfix" style="margin-top: 40px;">
					<view style="float:left;">雨天、雪天</view>
					<view style="float:right;">+1.00元</view>
				</view>
			</view>
			
			<view class="item clearfix">
				<view style="margin-bottom: 5px;">溢价说明</view>
				<view class="item-detail clearfix">
					在恶劣天气、下单高峰期等情况下，为促进骑手接单，平
					台可能会临时适当调整价格，以保障良好的服务体验。
				</view>
			</view>
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
	.item{
		margin-bottom: 10px;
	}
	.item-detail{
		font-size: 14px;
		color: #666666;
		margin-bottom: 5px;
	}
	.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
		display: block;
		height: 0;
		clear:both;
		visibility: hidden;
	}
</style>
