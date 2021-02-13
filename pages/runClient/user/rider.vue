<template>
	<view style="min-height: 100vh;background-color: #FFFFFF;">
		<view v-if="!status" class="banner">
			<u-image  height="265px" src="/static/runClient/banner1.png" mode="aspectFit"></u-image>
			<view class="qs">
				<view style="color: #000000;text-align: center;margin-bottom: 20px;">个人信息</view>
				<view class="uni-input" @click="toPage('/pages/runClient/auth/search')">
					<input type="text" placeholder="所在校区" v-model="school"/>
				</view>
				<view class="uni-input">
					<input type="text" placeholder="姓名" v-model="model.name"/>
				</view>
				<view class="uni-input">
					<input type="text" v-model="model.phone" placeholder="手机号" />
				</view>
				<view class="uni-input">
					<input type="text" placeholder="有无电动车" @click="actionSheetShow=true" v-model="has_car"/>
					
				</view>
				
				<view class="uni-input">
					<input password type="text" v-model="model.password" placeholder="设置密码" />
				</view>
				
				<view @click="submit" style="background: #FFE300;border-radius: 25px;color: #333333;margin: 15px 48px;text-align: center;font-size: 15px;height: 40px;padding-top: 9px;">
					提交信息
				</view>
				
			</view>
		</view>
		<view v-if="status" style="text-align: center;padding-top: 43px;">
			<image src="../../../static/runClient/user7.png" class="suc" mode="aspectFit"></image>
			<view style="font-size: 14px;color: #000000;margin: 20px 0 7px 0;">信息提交成功！</view>
			<view style="font-size: 11px;color: #999999;">您的申请信息已提交，客服会尽快审核，请耐心等待！</view>
			
			<view @click="back()" style="background: #FFE300;border-radius: 25px;color: #333333;margin: 80% 48px 15px 48px;text-align: center;font-size: 15px;height: 40px;padding-top: 9px;">
				返回
			</view>
		</view>
		
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	import {riderView,riderCreate} from '../../../common/api/runClient/user.js'
	export default {
		data() {
			return {
				labelPositionText:'left',
				model:{},
				school:'',
				has_car:'',
				actionSheetShow: false,
				actionSheetList: [
					{
						text: '有',
						val: 1
					},
					{
						text: '无',
						val: null
					}
				],
				status:0
			}
		},
		onLoad(options) {
			this.getRider()
			let that = this
			uni.$on('selectSchool',(options)=>{
				that.model.school_id = options.school_id
				that.model.school_area_id = options.area_id
				that.school = options.school_name + ' ('+  (options.area_name ? options.area_name : '主校区') +')'
			})
		},
		methods: {
			back () {
				uni.navigateBack()
			},
			toPage (path) {
				uni.navigateTo({
				    url: path
				})
			},
			async getRider(){
				this.model = await riderView()
				this.status = 1
			},
			actionSheetCallback(index) {
				let a = this.actionSheetList[index];
				this.has_car = a.text
				this.model.has_car = a.val;
			},
			async submit(){
				let res = await riderCreate(this.model)
				this.status = 1
			}
		}
	}
</script>

<style>
	.banner{
		position: relative;
	}
	.qs{
		position: absolute;
		top: 418px;
		left: 50%;
		transform: translate(-50%,-50%);
		background: #FFFFFF;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 10px;
		font-size: 18px;
		color: #FFFFFF;
		width: 96%;
		padding-top: 18px;
	}
	.uni-input{
		background: rgba(196, 196, 196, 0.2);
		border: 0.5px solid #C4C4C4;
		box-sizing: border-box;
		border-radius: 8px;
		padding: 9px;
		font-size: 15px;
		color: #333333;
		margin: 0 48px 15px 48px;
		height: 40px;
	}
	.suc{
		width: 50px;
		height: 50px;
	}
</style>
