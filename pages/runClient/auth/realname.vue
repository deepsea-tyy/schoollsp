<template>
	<view style="background-color: #FFFFFF;padding: 14px;">
		<view style="margin-bottom: 18px;">
			<u-steps :list="stepList" :current="current" :mode="mode" :active-color="activeColor"></u-steps>
		</view>
		<u-form >
			<u-form-item :label-position="labelPositionText" label="真实姓名" label-width="150" prop="name">
				<u-input type="text" v-model="model.name" placeholder="请输入真实姓名" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPositionText" label="性别" prop="gender">
				<u-input type="select" :select-open="actionSheetShow" v-model="showGender" placeholder="请选择性别" @click="actionSheetShow = true"></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPositionText" label="身份证号码" label-width="150" prop="id_card_no">
				<u-input type="text" v-model="model.id_card_no" placeholder="请输入身份证号码" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPositionImg" label="上传图片" prop="photo" label-width="150">
				<view class="form-upload">
					<view @click="upload(1)" class="form-upload-item">
						<view v-if="">
							<image src="/static/runClient/imgadd.png" mode="aspectFit"></image>
						</view>
						<view v-if="">
							身份证正面
						</view>
						
					</view>
					<view @click="upload(2)" class="form-upload-item" style="float: right;">
						<view class="">
							<image src="/static/runClient/imgadd.png" mode="aspectFit"></image>
						</view>
						<view class="">
							身份证反面
						</view>
					</view>
				</view>
			</u-form-item>
			<view style="margin-top: 25px;">
					<u-button :custom-style="customStyle" :hair-line="hairLin" @click="toPage('/pages/auth/student')">下一步</u-button>
			</view>
		</u-form>
		
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	import {getDate} from '@/common/fun.js'
	import {realNameAuthView, realNameAuthCreate, realNameAuthUpdate} from '../../../common/api/runClient/auth.js'
	
	export default {
		data() {
			return {
				labelPositionText:'left',
				labelPositionImg:'top',
				showGender:'',
				model:{
					name:'',
					gender:'',
				},
				actionSheetShow: false,
				actionSheetList: [
					{
						text: '男',
						val: 1
					},
					{
						text: '女',
						val: 0
					},
					{
						text: '保密',
						val: null
					}
				],
				customStyle: {
					background: '#FCF800',
					borderRadius: '20px',
					border:'none'
				},
				hairLin:false,
				stepList:[{
					name: '实名认证'
					}, {
						name: '学生认证'
					}, {
						name: '提交成功'
					},
				],
				current: 0,
				icon: 'checkmark',
				mode: 'number',
				activeColor: '#FFE400',
				photo_f:null,
				photo_b:null,
				status:false
			}
		},
		onLoad() {
			this.selectorDefTime = getDate;
			this.getData()
		},
		methods: {
			toPage (path) {
				// console.log(this.model)
				return
				this.submitData();
			},
			actionSheetCallback(index) {
				let a = this.actionSheetList[index];
				this.showGender = a.text
				this.model.gender = a.val;
			},
			upload(type){
				uni.chooseImage({
					count:1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						// tempFilePaths.forEach(v => {
						// 	that.uploadImg('/public/fileupload',v).then(res =>{
						// 		var data = JSON.parse(res.data)
						// 		if(data.status == 200 ) {
						// 			that.imgList.push(data.data.file_url);
						// 		}
						// 	})
						// })
						console.log(tempFilePaths)
					}
				});
			},
			async getData(){
				let res = await realNameAuthView()
				this.mode = res
				this.status = res.length > 0 ? true:false
			},
			async submitData(){
				if (this.status){
					realNameAuthUpdate(this.model)
				}else{
					realNameAuthCreate(this.mode)
				}
				uni.navigateTo({
				    url: path
				});
			}
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
