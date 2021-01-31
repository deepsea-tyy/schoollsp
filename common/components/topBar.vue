<template>
	<view class="top_bar_box" :class="{color:topBarObj.isColor}" style="height: statusBarHeight;">
		<view class="content" @click="back">
			<image src="/static/common/back_icon/back_black.svg" mode="widthFix" style="width: 36upx;" v-if="topBarObj.iconColor"></image>
			<image src="/static/common/back_icon/back_white.svg" mode="widthFix" style="width: 36upx;" v-else></image>
			<view class="top_bar_text">{{topBarObj.title}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			topBarObj:Object
		},
		data(){
			return {
				statusBarHeight:""
			}
		},
		mounted() {
			let that = this;
			uni.getSystemInfo({  
				success:function (res) {
					that.statusBarHeight = res.statusBarHeight
					// console.log(res.statusBarHeight,"导航栏高度")
				}
			}); 
			
		}, 
		methods:{ 
			back(){
				uni.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.top_bar_box{ 
	height: 150upx;
	background-color: white;
	display: flex;
	justify-content: flex-end;
	flex-direction: column;
	padding: 30upx 0upx 20upx 30upx;
	&.color{
		background-color: #FF5238;
		color: white;
	}
	.content{  
		display: flex;
		font-size: 30upx;
		align-items: center;
		.back_icon{
			margin-right: 30upx;
		}
	}
	
}
</style>
