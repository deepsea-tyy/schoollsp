<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;">
		<view style="padding: 18px 12px;">
			<view v-if="list.length == 0" style="position: relative;">
				<view style="position: absolute;left: 50%;transform: translate(-50%,-50%);width: 100px;height: 100px;background: #FFFFFF;border-radius: 50px;margin-top: 116px;">
					<image src="/static/runClient/user8.png" class="nodata" mode="aspectFit"></image>
				</view>
				<view style="position: absolute;left: 50%;transform: translate(-50%,-50%);margin-top: 190px;font-size: 15px;color: #666666;">您还没有收货地址</view>
			</view>

			<view v-for="(item, index) in list" class="item">
				<view @click="selectAddress(index)" class="clearfix">
					<view style="float:left;font-size: 15px;color: #000000;">{{item.name}}</view>
					<view style="float:left;margin-left: 10px;color: #333333;padding-top: 3px;">{{item.phone}}</view>
				</view>
		
				<view @click="selectAddress(index)" style="margin: 5px 0;color: #666666;">
					{{item.school}}{{item.school_area?'（'+item.school_area+'）':''}} {{item.building_no}}号楼{{item.floor}}{{item.house_number}}室
				</view>
				<view>
					<view style="float:left;color: #000000;" @click="setDefault(index)">
						<view class="default"><image v-if="item.is_default" src="/static/runClient/user9.png" mode="aspectFit"></image></view>
						默认地址
					</view> 
					<view @click="del(index)" style="float:right;color: #666666;margin-left: 9px;">
						<view class="deal"><image src="/static/runClient/user11.png" mode="aspectFit"></image></view>
						删除
					</view>
					<view @click="toPage('/pages/runClient/user/addressedit?id='+item.id)" style="float:right;color: #666666;">
						<view class="deal"><image src="/static/runClient/user10.png" mode="aspectFit"></image></view>
						编辑
					</view>
				</view>
			</view>
			
		 </view>
		 
		 <view style="position: relative;text-align: center;"> 
			<view @click="toPage('/pages/runClient/user/addressedit')" style="position: fixed;width: 100%;bottom: 0;boont-size: 18px;color: #333333;background: #FFE300;height: 52px;border-radius: 5px 5px 0px 0px;padding-top: 15px;">
				添加新地址
			</view>
		 </view>
	</view>
</template>

<script>
	import {shipAddress,shipAddressUpdate,shipAddressDelete} from '../../../common/api/runClient/user.js'
	
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			this.getAddres()
		},
		methods: {
			toPage(path){
				uni.navigateTo({
					url: path
				});
			},
			async getAddres(){
				let res = await shipAddress()
				this.list = res.list
			},
			setDefault(index){
				this.list[index]['is_default'] = 1
				shipAddressUpdate(this.list[index])
			},
			async del(index){
				await shipAddressDelete(this.list[index]['id'])
				this.list.splice(index,1)
			},
			selectAddress(index){
				let name = this.list[index]['school']+(this.list[index]['school_area']?this.list[index]['school_area']:'')+' '+this.list[index]['building_no']+'号楼'+this.list[index]['floor']+this.list[index]['house_number']
				uni.$emit('selectAddress',{
					address_id:this.list[index]['id'],
					address_name:name,
				})
				uni.navigateBack()
			}
		}
	}
</script>

<style>
	.item{
		background: #FFFFFF;
		height: 89px;
		padding: 10px;
		margin-bottom: 10px;
		font-size: 12px
	}
	.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
		display: block;
		height: 0;
		clear:both;
		visibility: hidden;
	}
	.clearfix{
	}
	.nodata{
		width: 50px;
		height: 50px;
		margin-top: 25px;
		margin-left: 25px;
	}
	.default{
		width: 12px;
		height: 12px;
		text-align: center;
		border-radius: 50px;
		margin-top: 3px;
		margin-right: 5px;
		float: left;
		border: 1px solid #FFE300;
	}
	.default image{
		width: 10px;
		height: 10px;
	}
	.deal{
		float: left;
		margin-top: 1px;
		margin-right: 2px;
	}
	.deal image{
		width: 15px;
		height: 15px;
	}
</style>
