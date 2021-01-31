<template>
	<view>
	<view v-for="(item,index) in producteList" :key="index">
		<view class="oder_cart">
			<view class="oder_cart_top_left">{{getdate(item.time,2)}}</view>
			<view class="oder_cart_center">
				<view class="production_img">
					<image :src="item.image" mode="widthFix" style="border-radius: 10upx;"></image>
				</view>
					<view class="production_right">
						<view class="production_right_top">{{item.name}}</view>
						<view>
							<text class="production_right_center">{{item.specs}}</text>
						</view>
						<view class="production_right_bottom">
							<view>
								<text class="status_text">{{bottomType}}</text>
								<text>$</text>
								<text class="price">{{item.price}}</text>
							</view>
							<view class="num">
								<text>数量*</text>
								<text>1</text>
							</view>
						</view>
					</view>
			</view>
			<view class="oder_cart_bottom" v-if="detailOrorder">
				<view class="set_btn">
					<view class="garbage_icon" @click="delet(index)">
						<image src="/static/common/garbage.svg" mode="widthFix" style="width: 86upx;"></image>
					</view>
					<text class="cancel_btn" @click="toProducteDetail">详情</text>
				</view>
			</view>
			
			<view class="oder_cart_bottom" v-else>
				<view class="pay_time">支付剩余5465465456</view>
				<view class="set_btn">
					<text class="cancel_btn">取消订单</text>
					<text class="see_btn">查看详情</text>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props:{
			bottomType:String,
			detailOrorder:Boolean,
			producteList:Array,
		},
		methods:{
			toProducteDetail(){
				this.$emit("toDetail")
			},
			delet(index){
				this.$emit("delet",index)
			}
		}
	}
</script>

<style  lang="scss" scoped>
.oder_cart{
	margin: 30upx;
	background-color: white;
	padding: 30upx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	border-radius: 10upx;
	.oder_cart_top_left{
		color: #b3b3b3;
	}
	.oder_cart_center{
		display: flex;
		margin-top: 30upx;
		.production_img{
			width: 160upx;
			height: 160upx;
			border-radius: 10upx;
		}
		.production_right{
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin-left: 20upx;
			width: 100%;
			.production_right_top{
				font-size: 32upx;
			}
			.production_right_center{
				font-size: 24upx;
				color: #b4b4b4;
				background-color: #eeeeee;
				padding: 8upx;
				border-radius: 6upx;
				position: relative;
				top: 10upx;
			}
			.production_right_bottom{
				display: flex;
				justify-content: space-between;
				font-size: 20upx;
				align-items: center;
				.price{
					font-size: 32upx;
				}
			}
		}
	}
	.oder_cart_bottom{
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		margin-top: 30upx;
		.pay_time{
			color: #FF5238;
			font-size: 24upx;
		}
		.set_btn{
			display: flex;
			align-items: center;
			align-self: flex-end;
			.garbage_icon{
				width: 40upx;
				height: 40upx;
			}
			.cancel_btn{
				margin-left: 30upx;
				padding: 14upx 24upx;
				border: 1px solid #999999;
				box-sizing: border-box;
				border-radius: 15px;
				font-size: 24upx;
			}
		}
	}
}

.oder_cart_bottom{
	display: flex;
	align-items: center;
	justify-content: space-between;
	margin-top: 30upx;
	.pay_time{
		color: #FF5238;
		font-size: 24upx;
	}
	.set_btn{
		.cancel_btn{
			padding: 14upx 24upx;
			border: 1px solid #999999;
			box-sizing: border-box;
			border-radius: 15px;
			font-size: 24upx;
		}
		.see_btn{
			padding: 14upx 24upx;
			background-color: #FF5238;
			box-sizing: border-box;
			border-radius: 15px;
			color: white;
			font-size: 24upx;
			margin-left: 10upx;
		}
	}
}
</style>
