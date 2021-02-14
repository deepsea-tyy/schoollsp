<template>
	<view style="min-height: 100vh;background-color: #FFFFFF;">
		
		<view style="width: 100%;height: 132px;background: #FFE400;font-size: 15px;color: #333333;padding-top: 15px;text-align: center;">
			<image :src="$fun.fileUrl(uinfo.file.file_url)" mode="aspectFit"></image>
			<view style="">{{std.name}}</view>
		</view>
		
		<view style="padding: 21px;">
			<u-cell-group>
				<u-cell-item @click="toPage('/pages/runRider/user/amount')" icon="/static/runRider/user1.png" title="账户管理">¥{{fund.amount?fund.amount:'0.00'}}</u-cell-item>
				<u-cell-item @click="toPage('/pages/runRider/user/amountlog')" icon="/static/runRider/user2.png" title="账户明细"></u-cell-item>
				<u-cell-item @click="toPage('/pages/runRider/user/amountout')" icon="/static/runRider/user3.png" title="提现记录"></u-cell-item>
				<u-cell-item @click="toPage('/pages/runRider/user/statistics')" icon="/static/runRider/user4.png" title="配送统计"></u-cell-item>
				<u-cell-item @click="toPage('/pages/runRider/user/rankinglist')" icon="/static/runRider/user5.png" title="排行榜"></u-cell-item>
				<u-cell-item @click="toPage('/pages/runRider/user/setting')" icon="/static/runRider/user6.png" title="我的设置"></u-cell-item>
			</u-cell-group>
		</view>
	</view>
</template>

<script>
	import {
		userInfo,
		realNameAuthView,
		userFund,
	} from '../../../common/api/runRider/user.js'
	export default {
		data() {
			return {
				uinfo:{
					file:{file_url:''}
				},
				std:{},
				fund:{}
			}
		},
		onLoad(params) {
			this.geUserInfo()
		},
		methods: {
			toPage(path){
				uni.navigateTo({
					url: path
				});
			},
			async geUserInfo() {
				let res = await userInfo()
				this.uinfo = res
				let std = await realNameAuthView()
				this.std = std
				let fund = await userFund()
				this.fund = fund
			},
			
		}
	}
</script>

<style>
	image{
		width: 60px;
		height: 60px;
	}
</style>
