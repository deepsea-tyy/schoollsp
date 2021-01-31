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
					<view class="form-upload-item">
						<view>
							<view class="pre-item" v-for="(item, index) in list1" :key="index">
								<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
								<view class="u-delete-icon" @tap.stop="deleteItem(index)">
									<u-icon name="close" size="20" color="#ffffff"></u-icon>
								</view>
							</view>
							<u-upload ref="uUpload" :header="header" :max-count="1" :action="action" :auto-upload="false" :custom-btn="true" @on-list-change="onListChange" :show-upload-list="false">
								<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
									<image src="/static/runClient/imgadd.png" class="form-upload-image" mode="aspectFit"></image>
								</view>
							</u-upload>
						</view>
						<view v-if="list1.length==0">
							身份证正面
						</view>
						
					</view>
					<view class="form-upload-item" style="float: right;">
						<view class="">
							<image src="/static/runClient/imgadd.png" class="form-upload-image" mode="aspectFit"></image>
						</view>
						<view v-if="list2.length==0">
							身份证反面
						</view>
					</view>
				</view>
			</u-form-item>
			<view style="margin-top: 25px;">
					<u-button :custom-style="customStyle" :onSuccess="onSuccess" :hair-line="hairLin" @click="toPage('/pages/auth/student')">下一步</u-button>
			</view>
		</u-form>
		
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	import {getDate} from '@/common/fun.js'
	import {realNameAuthView, realNameAuthCreate, realNameAuthUpdate} from '../../../common/api/runClient/auth.js'
	import config from '../../../common/config.js'
	
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
				status:false,
				action: config.baseUrl + '/pbl/index/fileupload',
				header:{},
				list1: [],
				list2: [],
			}
		},
		onLoad() {
			this.selectorDefTime = getDate;
			this.getData()
			this.header['access-token']= uni.getStorageSync('access-token')
		},
		methods: {
			toPage (path) {
				console.log(this.model)
				this.$refs.uUpload.upload();
				return
				this.submitData();
			},
			actionSheetCallback(index) {
				let a = this.actionSheetList[index];
				this.showGender = a.text
				this.model.gender = a.val;
			},
			onListChange(lists) {
				this.list1 = lists;
			},
			deleteItem(index) {
				this.$refs.uUpload.remove(index);
			},
			onSuccess(data, index, lists, name){
				console.log(data)
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
	.form-upload-image{
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
	
	.pre-item {
		flex: 0 0 48.5%;
		border-radius: 10rpx;
		height: 100px;
		overflow: hidden;
		position: relative;
		margin-bottom: 20rpx;
	}
	
	.pre-item-image {
		width: 100%;
		height: 100px;
	}
	.u-delete-icon {
		position: absolute;
		top: 10rpx;
		right: 10rpx;
		z-index: 10;
		background-color: $u-type-error;
		border-radius: 100rpx;
		width: 44rpx;
		height: 44rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
