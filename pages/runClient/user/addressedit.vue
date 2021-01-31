<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;padding-top: 10px;">
		<view style="padding: 10px 15px;background-color: #FFFFFF;">
			<u-form >
				<u-form-item :label-position="labelPositionText" label="我的学校" label-width="150" prop="name">
					<u-input :input-align="inputAlign" :clearable="false" type="text" v-model="model.name" placeholder="请输入学校" ></u-input>
				</u-form-item>
				<u-form-item :label-position="labelPositionText" :border-bottom="false" label="校区" label-width="150" prop="id_card_no">
					<u-input :input-align="inputAlign" :clearable="false" type="text" v-model="model.id_card_no" placeholder="请输入校区" ></u-input>
				</u-form-item>
			</u-form>
		</view>
		<view style="margin: 15px 13px;">
				<u-button :custom-style="customStyle" :hair-line="hairLin" @click="toPage('/pages/user/address')">保存</u-button>
		</view>
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				labelPositionText:'left',
				inputAlign:'right',
				model:{
					name:'',
					gender:'',
				},
				actionSheetShow: false,
				
				customStyle: {
					background: '#FCF800',
					borderRadius: '20px',
					border:'none'
				},
				hairLin:false,
				
			}
		},
		onLoad() {
		},
		methods: {
			toPage (path) {
				console.log(111)
				uni.navigateTo({
				    url: path
				});
			},
			submit(){
				console.log(111)
			},
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
		width: 160px;
	}
</style>
