<template>
	<view class="add_img_box">
		<view v-for="(item,index) in imgList" :key="index" class="delete_position">
			<image class="image_size" :src="item" mode="aspectFit" style="margin: 4upx;"></image>
			<image src="/static/shopPng/delete_icon.png" mode="aspectFill" class="delete_icon" @click="delete_img(index)"></image>
		</view>			
		<view class="add_box" @click="choose_img">
			<view class="add_icon"></view>
		</view>
	</view>
</template>
 
<script>
export default {
	props:{
		imgList:Array
	},
	methods:{
		choose_img(){
			this.$emit("chooseImg");
		},
		delete_img(index){
			this.$emit("deleteImg",index);
			// this.imgList.splice(index,1)
		},
	}
}
	
</script>

<style lang="scss" scoped>
.add_img_box{
	display: flex;
	flex-wrap: wrap;
	padding-right: 20upx;
	padding: 30upx;
	background-color: white;
	.add_box{
		width: 218upx;
		height: 218upx;
		background-image: url(../../static/shopPng/add_img_bgm.png);
		background-size: 218upx 218upx;
		position: relative;
		.add_icon{
			background-image: url(../../static/shopPng/add_img_icon.png);
			background-size: 80upx 80upx;
			width: 80upx;
			height: 80upx;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%,-50%);
		}
	}
	.delete_position{
		position: relative;
		.image_size{
			width: 218upx;
			height: 218upx;		
		}
		.delete_icon{
			position: absolute;
			width: 40upx;
			height: 40upx;
			top: 0upx;
			right: 0upx
		}
	}
}
</style>
