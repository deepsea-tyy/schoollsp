<template>
	<view style="background-color: #FFFFFF;">
		<view style="padding: 12px 14px;background-color:  #FFFFFF; margin-bottom: 10px;">
			<view class="content">
				<textarea style="width: 100%;height: 80px;" placeholder="可直接将取件短信粘贴此处.示例:【菜鸟裹裹】您的快递12345678(XX快递)已送到，请及时取，取件码1234" />
			</view>
		</view>
		
		<u-cell-group>
			<u-cell-item @click="selectValue(1)" icon="/static/runClient/qu.png" title="在哪里取货">{{model.start_place?model.start_place:"选择取货地址"}} <image src="/static/runClient/weizhi.png" class="bus-item-img" mode="aspectFit" /></u-cell-item>
			<u-cell-item @click="selectValue(2)" icon="/static/runClient/song.png" title="送到哪里去">{{model.end_place?model.end_place:"选择取货地址"}} <image src="/static/runClient/weizhi.png" class="bus-item-img" mode="aspectFit" /></u-cell-item>
			<u-cell-item @click="selectValue(3)" icon="" title="时间">请选择送达时间{{model.timeText}}</u-cell-item>
			<view style="height: 10px;background-color: #F5F6FE;"></view>
			<u-cell-item @click="selectValue(4)" icon="" title="物品重量">小于5斤</u-cell-item>
			<u-cell-item @click="selectValue(5)" icon="" title="抢单限制">不限性别</u-cell-item>
			<u-cell-item @click="selectValue(6)" icon="" title="订单超时">指定出发时间1小时内未接单</u-cell-item>
			<view style="height: 10px;background-color: #F5F6FE;"></view>
			<u-cell-item @click="selectValue(7)" icon="" title="优惠券">暂无可用</u-cell-item>
			<u-cell-item @click="selectValue(8)" icon="" title="小费">接单更快，服务更及时</u-cell-item>
		</u-cell-group>
		
		<view style="background-color: #FFFFFF;padding-left:15px;">
			<view style="float:left;font-size: 14px;color: #333333;margin-top: 16px;">跑腿费 <text style="font-size: 20px;color: #FF0000;"> ¥ 4.00</text></view>
			<view style="float:right;font-size: 17px;color: #343433;margin-left: 17px;background: #FFE300;padding: 12px 22px;">立即支付</view>
			<view @click="popShow=true" style="float:right;font-size: 12px;color: #666666;margin-top: 16px;">
				明细 
				<view style="padding-top: 2px;float: right;">
					<image src="/static/runClient/jiesuan1.png" mode="aspectFit" />
				</view>
			</view>
		</view>
		
		<u-picker 
			v-model="selectorShow" 
			:mode="selectorMode" 
			:defaultTime="selectorDefTime"
			:params="selectorPam" 
			:range-key="selectorKey" 
			@confirm="selectCfm" 
			:default-selector="[0]" 
			:range="selectorRange"></u-picker>
		<u-popup v-model="popShow" mode="bottom">
			<view style="padding: 0 15px;font-size: 11px;color: #000000;">
				<view style="position: relative;height: 30px;margin-top: 9px;">
					<view style="position: absolute;top: 9px;left: 50%;transform: translate(-50%,-50%);;font-size: 12px;color: #000000;">费用明细</view>
					<view @click="toPage()" style="float:right;color: #57B5FC;font-size: 10px;">计费规则</view>
				</view>
				<view class="pop-item-line"></view>
				<view class="pop-item">
					<view style="float:left;">基础配送费</view>
					<view style="float:right;">¥2.00</view>
				</view>
				<view class="pop-item-line"></view>
				<view class="pop-item">
					<view style="float:left;">基础配送费</view>
					<view style="float:right;">¥2.00</view>
				</view>
				<view class="pop-item-line"></view>
			</view>
			<view style="background-color: #FFFFFF;padding-left:15px;">
				<view style="float:left;font-size: 14px;color: #333333;margin-top: 16px;">跑腿费 <text style="font-size: 20px;color: #FF0000;"> ¥ 4.00</text></view>
				<view style="float:right;font-size: 17px;color: #343433;margin-left: 17px;background: #FFE300;padding: 12px 22px;">立即支付</view>
				<view @click="popShow=false" style="float:right;font-size: 12px;color: #666666;margin-top: 16px;">
					明细 
					<view style="padding-top: 2px;float: right;">
						<image src="/static/runClient/jiesuan2.png" mode="aspectFit" />
					</view>
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	import {getDate} from '@/common/fun.js'
	
	export default {
		data() {
			return {
				selectorShow:false,
				popShow:false,
				model:{
					content:'',
					start_place:'',
					end_place:'',
					time:'',
					timeText:'',
					weight:'',
					gender:'',
					overtime:'',
					tip:'',
				},
				selectorMode: 'selector',
				selectorRange:[],
				selectorType: 1,
				selectorKey: null,
				selectorDefTime: null,
				selectorPam: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: false,
					province: false,
					city: false,
					area: false,
					timestamp: true
				},
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
				uni.navigateTo({
				    url: './feerules'
				});
			},
			selectValue(type){
				this.selectorShow = true
				this.selectorType = type
				this.selectorMode = 'selector'
				this.selectorKey = null
				
				switch(type) {
				     case 1:
				        this.selectorRange = [3,2,1]
				        break;
				     case 2:
				        
				        break;
				     case 3:
						this.selectorMode = 'time'
				        
				        break;
				     case 4:
				        
				        break;
				     default:
				} 
			},
			selectCfm(e){
				this.start_place = '';
				if (this.selectorType == 1) {
					this.model.start_place = this.selectorRange[e[0]]
				}
				if (this.selectorType == 2) {
					this.model.end_place = this.selectorRange[e[0]]
				}
				if (this.selectorType == 3) {
					this.model.time = e.timestamp
					var date = new Date();
					var year = date.getFullYear();
					var month = date.getMonth() + 1;
					var day = date.getDate();
					if (year == e.year && month==e.month && day == e.day){
						this.model.timeText = '今天 ' + e.hour + ':' + e.minute
					}else{
						this.model.timeText = e.year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
					}
				}
				// if (this.mode == 'time') {
				// 	if (this.params.year) this.input += e.year;
				// 	if (this.params.month) this.input += '-' + e.month;
				// 	if (this.params.day) this.input += '-' + e.day;
				// 	if (this.params.hour) this.input += ' ' + e.hour;
				// 	if (this.params.minute) this.input += ':' + e.minute;
				// 	if (this.params.second) this.input += ':' + e.second;
				// } else if (this.mode == 'region') {
				// 	this.input = e.province.label + '-' + e.city.label + '-' + e.area.label;
				// } else if (this.mode == 'selector') {
				// 	this.input = this.range[e[0]];
				// } else if (this.mode == 'multiSelector') {
				// 	this.input = this.range[0][e[0]] + '-' + this.range[1][e[1]] + '-' + this.range[2][e[2]];
				// }
			}
		}
	}
</script>

<style>
	.content{
		height: 100px;
		background: #F9F9F9;
		padding: 17px 7px;
	}
	.jiesuan{
		height: 50px;
		display: flex;
		align-items: center;
		background-color:  #FFFFFF;
	}
	.jiesuan-item{
		text-align: center;
		float: left;
		width: 33.33%;
	}
	.jiesuan-item-mx-img{
		margin-right: 11px;
	}
	image{
		height: 15px;
		width: 15px;
	}
	.jiesuan-item-mx{
		float: right;
	}
	.money{
		height: 20px;
		color: #FF0000;
	}
	.btn{
		background: #FFE300;
		border: none;
	}
	.pop-item{
		height: 31px;
		padding-top: 7px;
	}
	.pop-item-line{
		opacity: 0.3;
		border-bottom: 1px solid #999999;
	}
</style>
