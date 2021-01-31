<template>
	<view class="top_bar_box">
		<view>{{topBarTitle}}</view>
	</view>
</template>

<script>
export default {
	props:{
		topBarTitle:String
	}
}
</script>

<style lang="scss" scoped>
.top_bar_box{
	height: 150upx;
	background-color: white;
	padding: 30upx 60upx;
	font-size: 32upx;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
}
</style>
