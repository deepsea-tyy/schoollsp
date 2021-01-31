<template>
	<view class="top_selecte">
		<view class="selecte_item" :class="{active:selIndex == index}" v-for="(item,index) in topDataList" :key="index" @click="selecteItem(index)">
			<view class="selecte_item_top">{{item.type}}</view>
			<view class="selecte_item_bottom">{{item.num}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			topDataList:Array
		},
		data(){
			return {
				selIndex:0
			}
		},
		methods:{
			selecteItem(index){
				this.$emit("selecteItem",index);
				this.selIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
.top_selecte{
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	display: flex;
	justify-content: space-around;
	padding: 24upx 60upx;
	align-items: center;
	background-color: white;
	.selecte_item{
		display: flex;
		flex-direction: column;
		align-items: center;
		&.active{
			.selecte_item_top{
				font-size: 32upx;
				font-weight: bold;
				margin-bottom: 10upx;
			}
			.selecte_item_bottom{
				font-size: 22upx;
				width: 96upx;
				height: 28upx;
				background-color: #FFEEEC;
				line-height: 28upx;
				text-align: center;
				border-radius: 16upx;
			}
		}
		.selecte_item_top{
			font-size: 32upx;
			margin-bottom: 10upx;
		}
		.selecte_item_bottom{
			font-size: 22upx;
			width: 96upx;
			height: 28upx;
			background-color: #F8F8FA;
			line-height: 28upx;
			text-align: center;
			border-radius: 16upx;
		}
	}
}
</style>
