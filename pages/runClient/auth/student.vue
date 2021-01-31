<template>
	<view style="background-color: #FFFFFF;padding: 14px;">
		<view style="margin-bottom: 18px;">
			<u-steps :list="stepList" :current="current" :mode="mode" :active-color="activeColor"></u-steps>
		</view>
		
		<u-cell-group>
			<u-cell-item @click="selectValue(1)" icon="" title="选择校区">{{model.school_id?model.school_id:"选择学校"}} </u-cell-item>
			<u-cell-item @click="selectValue(2)" icon="" title="选择校区">{{model.school_area_id?model.school_area_id:"选择校区"}} </u-cell-item>
		</u-cell-group>
		<view style="padding: 0 42rpx;">
		<u-form>
			<u-form-item :label-position="labelPositionText" label="院系" label-width="150" prop="faculty">
				<u-input type="text" v-model="model.faculty" placeholder="请输入院系" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPositionText" label="专业" label-width="150" prop="subject">
				<u-input type="text" v-model="model.subject" placeholder="请输入专业" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPositionImg" label="上传图片" prop="photo" label-width="150" :border-bottom="false">
				<view class="form-upload">
					<view @click="upload(1)" class="form-upload-item">
						<view v-if="">
							<image src="/static/runClient/imgadd.png" mode="aspectFit"></image>
						</view>
						<view v-if="">
							学生证正面
						</view>
						
					</view>
					<view @click="upload(2)" class="form-upload-item" style="float: right;">
						<view class="">
							<image src="/static/runClient/imgadd.png" mode="aspectFit"></image>
						</view>
						<view class="">
							学生证反面
						</view>
					</view>
				</view>
			</u-form-item>
			<view style="margin-top: 25px;">
					<u-button @click="toPage()" :custom-style="customStyle" :hair-line="hairLin">立即提交</u-button>
			</view>
		</u-form>
		</view>
		
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	import {getDate} from '@/common/fun.js'
	
	export default {
		data() {
			return {
				labelPositionText:'left',
				labelPositionImg:'top',
				model:{
					school_id:'',
					school_area_id:'',
					faculty:'',
					subject:'',
				},
				actionSheetShow: false,
				actionSheetList: [
					{
						text: '男'
					},
					{
						text: '女'
					},
					{
						text: '保密'
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
				}],
				current: 1,
				icon: 'checkmark',
				mode: 'number',
				activeColor: '#FFE400',
				photo_f:null,
				photo_b:null
			}
		},
		onLoad() {
			this.selectorDefTime = getDate;
		},
		methods: {
			submit(){
				console.log(111)
			},
			toPage(){
				console.log(1111)
				uni.navigateTo({
				    url: './review'
				});
			},
			selectValue(type){},
			actionSheetCallback(index) {
				// uni.hideKeyboard();
				this.model.gender = this.actionSheetList[index].text;
			},
			upload(type){
				if (type == 1){
					
				}
				uni.chooseImage({
					count:1,
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						tempFilePaths.forEach(v => {
							that.uploadImg('/public/fileupload',v).then(res =>{
								var data = JSON.parse(res.data)
								if(data.status == 200 ) {
									that.imgList.push(data.data.file_url);
								}
							})
						})
					}
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
		width: 140px;
	}
</style>
