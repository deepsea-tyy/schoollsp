<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;">
		<view style="margin: 10px 0;background-color: #FFFFFF;padding: 8px 18px;">
			<u-search placeholder="搜索学校" @search="search"></u-search>
		</view>
		
		<view style="background-color: #FFFFFF;padding: 8px 18px;">
			<view class="item" style="color: #999999;">{{title?title:'附近学校'}}</view>
			<view v-if="schoolShow" class="item" v-for="(item, index) in list" :key="index" @click="setSchool(item,1)">{{item.name}}</view>
			<view v-if="!schoolShow" class="item" v-for="(item, index) in area" :key="index" @click="setSchool(item,2)">{{item.name}}</view>
		</view>
		
	</view>
</template>

<script>
	import {schoolList} from '../../../common/api/runClient/auth.js'
	export default {
		data() {
			return {
				list:[],
				area:[],
				title:'',
				schoolShow:true,
				selectSchool:{}
			}
		},
		onLoad() {
			this.getSchoolList()
		},
		methods: {
			async getSchoolList(){
				let res =	await schoolList({area:1})
				this.list = res.list
			},
			setSchool(item,type){
				console.log(item)
				this.title = '我的学校：'+item.name
				if(type == 1){
					this.selectSchool = item
					if(item.area.length>0){
						this.area = item.area
						this.schoolShow=false
					}else{
						uni.$emit('selectSchool',{
							school_id:this.selectSchool.id,
							school_name:this.selectSchool.name,
							area_id:null,
							area_name:null,
						})
						uni.navigateBack()
					}
				}
				if(type == 2){
					uni.$emit('selectSchool',{
						school_id:this.selectSchool.id,
						school_name:this.selectSchool.name,
						area_id:item.id,
						area_name:item.name,
					})
					uni.navigateBack()
				}
			},
			search(keyword){
				// schoolList()
				console.log(keyword)
			}
		}
	}
</script>

<style>
	.item{
		border-bottom: 1px solid rgba(153, 153, 153, 0.1);
		padding: 9px 0;
		color: #333333;
	}
</style>
