<template>
	<view style="min-height: 100vh;background-color: #FFFFFF;">
		
		<view style="width: 100%;height: 132px;background: #FFE400;font-size: 15px;color: #333333;padding-top: 15px;text-align: center;">
			<image src="/static/runRider/login1.png" mode="aspectFit"></image>
			<view style="">同学A</view>
		</view>
		
		<view style="padding: 21px;">
			<u-cell-group>
				<u-cell-item @click="toPage('/pages/user/amount')" icon="/static/runRider/user1.png" title="账户管理">¥10.00</u-cell-item>
				<u-cell-item @click="toPage('/pages/user/amountlog')" icon="/static/runRider/user2.png" title="账户明细"></u-cell-item>
				<u-cell-item @click="toPage('/pages/user/amountout')" icon="/static/runRider/user3.png" title="提现记录"></u-cell-item>
				<u-cell-item @click="toPage('/pages/user/statistics')" icon="/static/runRider/user4.png" title="配送统计"></u-cell-item>
				<u-cell-item @click="toPage('/pages/user/rankinglist')" icon="/static/runRider/user5.png" title="排行榜"></u-cell-item>
				<u-cell-item @click="toPage('/pages/user/setting')" icon="/static/runRider/user6.png" title="我的设置"></u-cell-item>
			</u-cell-group>
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
			toPage(path){
				console.log(11)
				uni.navigateTo({
					url: path
				});
			}
			
		}
	}
</script>

<style>
	image{
		width: 60px;
		height: 60px;
	}
</style>
