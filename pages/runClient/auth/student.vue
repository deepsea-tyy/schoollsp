<template>
	<view style="background-color: #FFFFFF;padding: 14px;">
		<view style="margin-bottom: 18px;">
			<u-steps :list="stepList" :current="current" :mode="mode" :active-color="activeColor"></u-steps>
		</view>
		<u-cell-group>
			<u-cell-item @click="toPage('/pages/runClient/auth/search')" icon="" title="所属学校">{{school_name?school_name:"选择学校"}} </u-cell-item>
			<u-cell-item @click="toPage('/pages/runClient/auth/search')" icon="" title="校区">{{area_name?area_name:"选择校区"}} </u-cell-item>
			<u-cell-item @click="selectValue" icon="" title="入学时间">{{enrollment_at}} </u-cell-item>
		</u-cell-group>
		
		<view style="padding: 0 42rpx;">
		<u-form>
			<u-form-item :label-position="labelPositionText" label="院系" label-width="150" prop="faculty">
				<u-input type="text" v-model="model.faculty" placeholder="请输入院系" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPositionText" label="专业" label-width="150" prop="subject">
				<u-input type="text" v-model="model.subject" placeholder="请输入专业" ></u-input>
			</u-form-item>
			<u-form-item :label-position="labelPositionText" label="学号" label-width="150" prop="subject">
				<u-input type="text" v-model="model.student_id" placeholder="请输入学号" ></u-input>
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
									学生证正面
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
									学生证反面
								</view>
							</view>
						</u-upload>
					</view>
				</view>
			</u-form-item>
			<view @click="submitData()" style="margin-top: 25px;background: #FCF800;border-radius: 20px;border:none;text-align: center;padding-top: 5px;height: 30px;">
					下一步
			</view>
			
		</u-form>
		</view>
		
		<u-picker 
			v-model="selectorShow" 
			:mode="'time'" 
			:defaultTime="selectorDefTime"
			@confirm="selectCfm" 
			:params="selectorPam"></u-picker>
	</view>
</template>

<script>
	import {studentAuthView, studentAuthCreate, studentAuthUpdate} from '../../../common/api/runClient/auth.js'
	import config from '../../../common/config.js'
	import {getDate} from '@/common/fun.js'
	
	export default {
		data() {
			return {
				labelPositionText:'left',
				labelPositionImg:'top',
				model:{
					school_id:null,
					school_area_id:null,
					faculty:null,
					subject:null,
					enrollment_at:null,
					student_id:null,
				},
				enrollment_at:'',
				frontalPhoto:{file_url:null},
				reversePhoto:{file_url:null},
				
				stepList:[{
					name: '实名认证'
					}, {
						name: '学生认证'
					}, {
						name: '提交成功'
					},
				],
				current: 1,
				icon: 'checkmark',
				mode: 'number',
				activeColor: '#FFE400',
				action: config.baseUrl + '/pbl/index/fileupload',
				header:{},
				list1: [],
				list2: [],
				selectorShow:false,
				selectorDefTime:null,
				selectorPam: {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					province: false,
					city: false,
					area: false,
					timestamp: true
				},
				school_name:null,
				area_name:null
			}
		},
		onLoad(options) {
			this.header['access-token']= uni.getStorageSync('access-token')
			this.getData()
			this.selectorDefTime = getDate;
			let that = this
			uni.$on('selectSchool',(options)=>{
				that.model.school_id = options.school_id
				that.model.school_area_id = options.area_id
				that.school_name = options.school_name
				that.area_name = options.area_name ? options.area_name : '主校区'
				uni.$off('selectSchool')
			})
		},
		methods: {
			toPage (path) {
				uni.navigateTo({
				    url: path
				});
			},
			selectValue(){
				this.selectorShow = true
			},
			selectCfm(e){
				this.model.enrollment_at = e.timestamp
				this.enrollment_at = e.year + '-' + e.month + '-' + e.day
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
					this.model.student_id_card_frontal_photo = data.data.id
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
					this.model.student_id_card_reverse_photo = data.data.id
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
				let res = await studentAuthView()
				this.model = res
				this.frontalPhoto = res.frontalPhoto?res.frontalPhoto:{}
				this.reversePhoto = res.reversePhoto?res.reversePhoto:{},
				this.school_name = res.school.name
				this.area_name = res.schoolArea ? res.schoolArea.name : '主校区'
			},
			async submitData(){
				if (this.model.user_id){
					await studentAuthUpdate(this.model)
				}else{
					await studentAuthCreate(this.model)
				}
				uni.navigateTo({
				    url: '/pages/runClient/auth/review'
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
		width: 146px;
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
