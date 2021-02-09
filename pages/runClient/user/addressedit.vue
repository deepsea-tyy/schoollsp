<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;padding-top: 10px;">
		<view style="padding: 10px 15px;background-color: #FFFFFF;">
			<u-form >
				<u-form-item :label-position="labelPositionText" label="我的学校" label-width="150" prop="school">
					<u-input :input-align="inputAlign" type="text" v-model="model.school" placeholder="请输入学校" ></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPositionText" label="校区" label-width="150" prop="school_area">
					<u-input :input-align="inputAlign" type="text" v-model="model.school_area" placeholder="请输入校区" ></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPositionText" label="楼号" label-width="150" prop="building_no">
					<u-input :input-align="inputAlign" type="text" v-model="model.building_no" placeholder="请输入楼号" ></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPositionText" label="楼层" label-width="150" prop="floor">
					<u-input :input-align="inputAlign" @click="selectFloor" type="text" v-model="model.floor" placeholder="请选择楼层" ></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPositionText" label="门牌号" label-width="150" prop="house_number">
					<u-input :input-align="inputAlign" type="text" v-model="model.house_number" placeholder="请输入门牌号" ></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPositionText" label="联系人" label-width="150" prop="id_card_no">
					<u-input :input-align="inputAlign" type="text" v-model="model.name" placeholder="请输入联系人" ></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPositionText" :border-bottom="false" label="手机号" label-width="150" prop="phone">
					<u-input :input-align="inputAlign" type="text" v-model="model.phone" placeholder="请输入手机号" ></u-input>
				</u-form-item>
			</u-form>
		</view>
		<view style="margin: 15px 13px;">
				<u-button :custom-style="customStyle" :hair-line="false" @click="saveData">保存</u-button>
		</view>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	import {shipAddressView,shipAddressCreate,shipAddressUpdate} from '../../../common/api/runClient/user.js'
	export default {
		data() {
			return {
				labelPositionText:'left',
				inputAlign:'right',
				model:{
					school:'',
					school_area:'',
					building_no:'',
					floor:'',
					house_number:'',
					name:'',
					phone:'',
				},
				customStyle: {
					background: '#FCF800',
					borderRadius: '20px',
					border:'none'
				},
				actionSheetList: [
					{
						text: '一层',
					},
					{
						text: '二层',
					},
					{
						text: '三层',
					},
					{
						text: '四层',
					},
					{
						text: '五层',
					},
					{
						text: '六层',
					},
					{
						text: '七层',
					}
				],
				actionSheetShow:false
			}
		},
		onLoad(options) {
			if(options.id){
				this.shipAddressView(options.id)
			}
		},
		methods: {
			selectFloor(){
				this.actionSheetShow = true
			},
			actionSheetCallback(key){
				this.model.floor = this.actionSheetList[key]['text']
			},
			async shipAddressView(id){
				let res = await shipAddressView(id)
				this.model = res
			},
			async saveData(){
				if(this.model.id){
					await shipAddressUpdate(this.model)
				}else{
					await shipAddressCreate(this.model)
				}
				uni.navigateBack()
			},
		}
	}
</script>

<style>
	.form-upload{
	}
	.form-upload image{
		width: 30px;
		height: 29px;
		margin-top: 21px;
	}
	.form-upload-item{
		float: left;
		text-align: center;
		width: 50%;
		border: 1.5px solid #FFE400;
		box-sizing: border-box;
		height: 100px;
		width: 160px;
	}
</style>
