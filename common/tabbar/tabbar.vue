<template>
	<view>
		<view class="tabbar_box">
			<view class="tabbar_item" @click="toHome">			
				<image src="/static/tabbar/icon_selecte/home_selecte.svg" mode="widthFix" style="width: 150upx;" v-if="num == 1"></image>
				<image src="/static/tabbar/icon_default/home_default.svg" mode="widthFix" style="width: 150upx;" v-else></image>
			</view>
			<view class="tabbar_item" @click="toMerchants">			
				<image src="/static/tabbar/icon_selecte/merchants_selecte.svg" mode="widthFix" style="width: 150upx;" v-if="num == 2"></image>
				<image src="/static/tabbar/icon_default/merchants_default.svg" mode="widthFix" style="width: 150upx;" v-else></image>
			</view>
			<view class="tabbar_item scan" @click="initScan">
				<image src="/static/tabbar/icon_scan/scan_white.svg" mode="widthFix" style="width: 56upx;"></image>
			</view>
			<view class="tabbar_item" @click="toOder">
				<image src="/static/tabbar/icon_selecte/oder_selecte.svg" mode="widthFix" style="width: 150upx;" v-if="num == 4"></image>
				<image src="/static/tabbar/icon_default/oder_default.svg" mode="widthFix" style="width: 150upx;" v-else></image>
			</view>
			<view class="tabbar_item" @click="toSend">			
				<image src="/static/tabbar/icon_selecte/send_selecte.svg" mode="widthFix" style="width: 150upx;" v-if="num == 5"></image>
				<image src="/static/tabbar/icon_default/send_default.svg" mode="widthFix" style="width: 150upx;" v-else></image>
			</view>
		</view>
	</view>
</template>
 
<script>
	export default {
		props:{
			num:Number
		},
		methods:{
			toHome(){
				uni.reLaunch({
					url: "/pages/home/home"
				})
			},
			toMerchants(){
				uni.reLaunch({
					url: "/pages/shop/shop"
				})
			},
			initScan(){
				let tagAndval = this.urlTransObject("https://lovebirdopen.com/qr/scanjmp?tag=goodsbarcode&val=67111");
				this.apiget("/shop/scan/detail",tagAndval).then(res => {
					if(res.data.status == 200){
						this.$store.commit("initProductList",res.data.data.product);
						this.$store.commit("setTagAndval",tagAndval);
						let do_status = res.data.data.do_status;
						console.log(res.data.data.do_status);
						if(do_status == 1){
							uni.navigateTo({
								url:"../../pages/instore/instore",
							});
						}else if(do_status == 2){
							uni.navigateTo({
								url:"../../pages/outstore/outstore"        
							})								
						}else if(do_status == 3){
							uni.showToast({
								title:"该商品不可操作",
								icon:"none"
							})
						}
					}
				});
			},
			toOder(){
				uni.reLaunch({
					url: "/pages/order/order"
				})
			},
			toSend(){
				uni.reLaunch({
					url: "/pages/send/send"
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
.tabbar_box{
	height: 166upx;
	background-color: white;
	width: 750upx;
	display: flex;
	justify-content: space-around;
	position: fixed;
	bottom: 0;
	.tabbar_item{
		width: 150upx;
		height: 100upx;
		&.scan{
			background-color: #FF5238;
			width: 120upx;
			height: 120upx;
			display: flex;
			justify-content: center;
			align-items: center;
			border-radius: 50%;
			position: relative;
			top: -30upx;
			
		}
	}
}
</style>
