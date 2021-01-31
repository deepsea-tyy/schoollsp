<template>
	<scroll-view class="scroll_box" scroll-x="true" @scroll="scroll">
		 <view class="scroll_item">
			 <view v-for="(image,index) in imageList" :key="index" class="delete_position">
			 	<image class="image_size" :src="image" mode="aspectFit"></image>
			 	<image src="/static/shopPng/delete_icon.png" mode="aspectFill" class="delete_icon" @click="delete_img(index)"></image>
			 </view>
			 <!-- 添加默认图片 -->
			 <view class="defalt_bgc" @click="choose_img">
			 	<view class="defalt_inner">
			 		<image src="/static/shopPng/add_img_icon.png" mode="aspectFill" class="add_img_icon"></image>
			 		<view class="">选择商品</view>
			 	</view>
			 </view>
		 </view>
	</scroll-view>
</template>

<script>
export default {
	props:{
		imageList:Array
	},
	methods:{
		choose_img(){
			this.$emit("chooseImg");
		},
		delete_img(index){
			this.$emit("deleteImg",index);
		},
	}
}
</script>

<style lang="scss" scoped>
.scroll_box{
	white-space: nowrap;
	padding: 30upx;
	background-color: white;
	.scroll_item{
		display: inline-block;
		width: 28%;
		display: flex;
		.delete_position{
			position: relative;
			.delete_icon{
				position: absolute;
				width: 40upx;
				height: 40upx;
				top: 0upx;
				right: 10upx
			}
			.image_size{
				width: 160upx;
				height: 160upx;	
				border-radius: 10upx;
				margin-right: 10upx;
			}
		}

		.defalt_bgc{
			background-color: #dfdfdf;
			border-radius: 10upx;
			margin-left: 20upx;
			display: flex;
			justify-content: center;
			align-items: center;
			.defalt_inner{
				width: 160upx;
				height: 160upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				.add_img_icon{
					width: 60upx;
					height: 60upx;
				}
			}
		}
	}
	
}
</style>
