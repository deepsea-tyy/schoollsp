<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;">
		<view style="margin-top: 10px;">
			<u-cell-group :border="false">
				<u-cell-item @click="toPage('/pages/runRider/user/repassword')" :border-top="false" title="修改密码"></u-cell-item>
				<u-cell-item :arrow="false" :is-link="true" title="微信模板消息提醒">
					<u-switch @change="change" slot="right-icon" :active-color="'#FFE300'" v-model="tmp_msg"></u-switch>
				</u-cell-item>
				<u-cell-item :arrow="false" :is-link="true" :border-bottom="false" title="接单中">
					<u-switch @change="change" slot="right-icon" :active-color="'#FFE300'" v-model="work_status"></u-switch>
				</u-cell-item>
			</u-cell-group>
		</view>
		<view @click="logout" style="background: #FFE300;border-radius: 25px;text-align: center;padding: 10px 0;margin: 20px 13px;">退出登录</view>
	</view>
</template>

<script>
	import {
		logout,
		riderInfo,
		riderUpdate
	} from '../../../common/api/runRider/user.js'
	export default {
		data() {
			return {
				tmp_msg:false,
				work_status:false,
				item:{}
			}
		},
		onLoad() {
			this.getRiderInfo()
		},
		methods: {
			toPage(path){
				uni.navigateTo({
					url: path
				});
			},
			logout(){
				logout()
			},
			async getRiderInfo(){
				this.item = await riderInfo()
				this.tmp_msg = this.item.tmp_msg?true:false
				this.work_status = this.item.work_status?true:false
			},
			change(){
				this.item.tmp_msg = this.tmp_msg?1:0
				this.item.work_status = this.work_status?1:0
				riderUpdate(this.item)
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
