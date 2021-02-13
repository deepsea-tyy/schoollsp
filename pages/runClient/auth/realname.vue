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
						<view v-if="list1.length>0" class="pre-item" v-for="(item, index) in list1" :key="index">
							<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
							<view class="u-delete-icon" @tap.stop="deleteItem(index,1)">
								<u-icon name="close" size="20" color="#ffffff"></u-icon>
							</view>
						</view>
						<view v-if="frontalPhoto.file_url" class="pre-item">
							<image class="pre-item-image" :src="$fun.fileUrl(frontalPhoto.file_url)" mode="aspectFill"></image>
							<view class="u-delete-icon" @tap.stop="frontalPhoto={}">
								<u-icon name="close" size="20" color="#ffffff"></u-icon>
							</view>
						</view>
						<u-upload v-if="!frontalPhoto.file_url" ref="uUpload" :header="header" :max-count="1" :action="action" :auto-upload="true" :custom-btn="true" @on-list-change="onListChange" @on-success="onSuccess" :show-upload-list="false">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<view>
										<image src="/static/runClient/imgadd.png" class="form-upload-image" mode="aspectFit"></image>
								</view>
								<view v-if="list1.length==0">
									身份证正面
								</view>
							</view>
						</u-upload>
					</view>
					<view class="form-upload-item" style="float: right;">
						<view class="pre-item" v-for="(item, index) in list2" :key="index">
							<image class="pre-item-image" :src="item.url" mode="aspectFill"></image>
							<view class="u-delete-icon" @tap.stop="deleteItem(index,2)">
								<u-icon name="close" size="20" color="#ffffff"></u-icon>
							</view>
						</view>
						<view v-if="reversePhoto.file_url" class="pre-item">
							<image class="pre-item-image" :src="$fun.fileUrl(reversePhoto.file_url)" mode="aspectFill"></image>
							<view class="u-delete-icon" @tap.stop="reversePhoto={}">
								<u-icon name="close" size="20" color="#ffffff"></u-icon>
							</view>
						</view>
						<u-upload v-if="!reversePhoto.file_url" ref="uUpload2" :header="header" :max-count="1" :action="action" :auto-upload="true" :custom-btn="true" @on-list-change="onListChange2" @on-success="onSuccess2" :show-upload-list="false">
							<view slot="addBtn" class="slot-btn" hover-class="slot-btn__hover" hover-stay-time="150">
								<view>
										<image src="/static/runClient/imgadd.png" class="form-upload-image" mode="aspectFit"></image>
								</view>
								<view v-if="list2.length==0">
									身份证反面
								</view>
							</view>
						</u-upload>
					</view>
				</view>
			</u-form-item>
			<view @click="submitData" style="margin-top: 25px;background: #FCF800;border-radius: 20px;border:none;text-align: center;padding-top: 5px;height: 30px;">
					下一步
			</view>
			
		</u-form>
		
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
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
				frontalPhoto:{file_url:''},
				reversePhoto:{file_url:''},
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
				action: config.baseUrl + '/pbl/index/fileupload',
				header:{},
				list1: [],
				list2: [],
			}
		},
		onLoad() {
			this.header['access-token']= uni.getStorageSync('access-token')
			this.getData()
		},
		methods: {
			actionSheetCallback(index) {
				let a = this.actionSheetList[index];
				this.showGender = a.text
				this.model.gender = a.val;
			},
			onListChange(lists) {
				this.list1 = lists;
			},
			onListChange2(lists) {
				this.list2 = lists;
			},
			deleteItem(index,select) {
				if (select == 1) {
					this.$refs.uUpload.remove(index);
				}else{
					this.$refs.uUpload2.remove(index);
				}
			},
			onSuccess(data, index, lists, name){
				if (data.code == 200){
					this.model.id_card_frontal_photo = data.data.id
				}else{
					uni.showToast({
						icon: 'none',
						title: data.message,
						duration: 2000
					});
					throw ''
				}
			},
			onSuccess2(data, index, lists, name){
				if (data.code == 200){
					this.model.id_card_reverse_photo = data.data.id
				}else{
					uni.showToast({
						icon: 'none',
						title: data.message,
						duration: 2000
					});
					throw ''
				}
			},
			async getData(){
				let res = await realNameAuthView()
				this.model = res
				this.showGender = res.gender == 1 ? '男' : '女'
				this.frontalPhoto = res.frontalPhoto?res.frontalPhoto:{}
				this.reversePhoto = res.reversePhoto?res.reversePhoto:{}
			},
			async submitData(){
				if (this.model.user_id){
					await realNameAuthUpdate(this.model)
				}else{
					await realNameAuthCreate(this.model)
				}
				uni.navigateTo({
				    url: '/pages/runClient/auth/student'
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
	.slot-btn{
		width: 100%;
		margin-left: 58%;
	}
</style>
