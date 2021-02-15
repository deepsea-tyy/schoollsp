<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;">
		<view style="background: #FFFFFF;padding: 0 16px;margin-top: 10px;">
			<input v-model="item.password" type="password" style="border-bottom: 1px solid rgba(153, 153, 153, 0.2);padding: 10px 0;" placeholder="当前密码" />
			<input v-model="item.newpassword" type="password" style="border-bottom: 1px solid rgba(153, 153, 153, 0.2);padding: 10px 0" placeholder="新密码" />
			<input v-model="item.repassword" type="password" style="padding: 10px 0" placeholder="确认新密码" />
		</view>
		<view @click="comfire" style="background: #FFE300;border-radius: 25px;text-align: center;padding: 10px 0;margin: 20px 13px;">确定</view>
	</view>
</template>

<script>
	import {
		repassword
	} from '../../../common/api/runRider/user.js'
	export default {
		data() {
			return {
				item:{
					password:'',
					newpassword:'',
					repassword:'',
				}
			}
		},
		methods: {
			async comfire() {
				await repassword(this.item)
			},
		}
	}
</script>

<style>

</style>
