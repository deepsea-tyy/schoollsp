<template>
	<view style="background-color: #FFFFFF;">
		<view style="padding: 12px 14px;background-color:  #FFFFFF; margin-bottom: 10px;">
			<view class="content">
				<textarea style="width: 100%;height: 80px;" v-model="model.content" :placeholder="placeholder" />
			</view>
		</view>
		
		<u-cell-group>
			<u-cell-item v-if="type!=5" @click="selectValue(1)" icon="/static/runClient/qu.png" title="在哪里取货">{{start_place?start_place:"选择取货地址"}} <image src="/static/runClient/weizhi.png" class="bus-item-img" mode="aspectFit" /></u-cell-item>
			<u-cell-item v-if="type!=5" @click="selectValue(2)" icon="/static/runClient/song.png" title="送到哪里去">{{end_place?end_place:"选择收货地址"}} <image src="/static/runClient/weizhi.png" class="bus-item-img" mode="aspectFit" /></u-cell-item>
			<u-cell-item v-if="type==5" icon="/static/runClient/song.png" title="服务地点" :arrow="false"><input type="text" v-model="model.end_place" placeholder="请输入服务地址" />  </u-cell-item>
			<u-cell-item v-if="type==5" icon="/static/runClient/song.png" title="联系电话" :arrow="false"><input type="text" v-model="model.phone" placeholder="请输入联系电话" />  </u-cell-item>
			<u-cell-item @click="selectValue(3)" icon="" title="时间"><text style="color: #FF770B;">{{timeText}}</text>{{timeText?'':'请选择送达时间'}}</u-cell-item>
			
			<view style="height: 10px;background-color: #F5F6FE;"></view>
			<u-cell-item v-if="type==2 || type==4" @click="selectValue(4)" icon="" title="物品重量">{{weight}}</u-cell-item>
			<u-cell-item @click="selectValue(5)" icon="" title="抢单限制">{{gender}}</u-cell-item>
			<u-cell-item @click="selectValue(6)" icon="" title="订单超时">指定出发时间 <text style="color: #FF770B;">{{model.overtime}}小时</text> 内未接单</u-cell-item>
			
			<view style="height: 10px;background-color: #F5F6FE;"></view>
			<u-cell-item @click="selectValue(7)" icon="" title="优惠券">{{coupon_result? ('减 ¥ ' + coupon_result) :'暂无可用'}}</u-cell-item>
			<u-cell-item v-if="type!=5" @click="selectValue(8)" icon="" title="小费">{{model.tip?('¥ '+ model.tip) :'接单更快，服务更及时'}}</u-cell-item>
			<u-cell-item v-if="type==5" @click="selectValue(9)" icon="" title="服务费用">{{model.samount? ('¥'+model.samount+'元'):''}}</u-cell-item>
		</u-cell-group>
		
		<view style="background-color: #FFFFFF;padding-left:15px;">
			<view style="float:left;font-size: 14px;color: #333333;margin-top: 16px;">{{money?'跑腿费':''}} <text style="font-size: 20px;color: #FF0000;"> {{money?'¥ '+money:''}}</text></view>
			<view @click="pay" style="float:right;font-size: 17px;color: #343433;margin-left: 17px;background: #FFE300;padding: 12px 22px;">立即支付</view>
			<view @click="popShow=true;popType=1" style="float:right;font-size: 12px;color: #666666;margin-top: 16px;">
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
		<u-popup v-model="popShow" mode="bottom" @close="setMoney()">
			<view v-if="popType==1" style="padding: 0 15px;font-size: 11px;color: #000000;">
				<view style="position: relative;height: 30px;margin-top: 9px;">
					<view style="position: absolute;top: 9px;left: 50%;transform: translate(-50%,-50%);;font-size: 12px;color: #000000;">费用明细</view>
					<view @click="toPage('./feerules')" style="float:right;color: #57B5FC;font-size: 10px;">计费规则</view>
				</view>
				<view class="pop-item-line"></view>
				<view class="pop-item">
					<view style="float:left;">基础配送费</view>
					<view style="float:right;">¥{{cost.basic_cost}}</view>
				</view>
				<view class="pop-item-line"></view>
				<view v-if="weightPrice" class="pop-item">
					<view style="float:left;">重量附加</view>
					<view style="float:right;">¥{{weightPrice}}</view>
				</view>
				<view v-if="weightPrice" class="pop-item-line"></view>
				<view v-if="time_cost" class="pop-item">
					<view style="float:left;">特殊时段费</view>
					<view style="float:right;">¥{{time_cost==1?cost.lunch_time_cost:cost.dinner_time_cost}}</view>
				</view>
				<view v-if="time_cost" class="pop-item-line"></view>
				<view v-if="floorCost" class="pop-item">
					<view style="float:left;">配送难度费</view>
					<view style="float:right;">¥{{cost.difficulty_cost}}</view>
				</view>
				<view v-if="floorCost" class="pop-item-line"></view>
				<view v-if="cost.setting.is_weather_cist" class="pop-item">
					<view style="float:left;">特殊天气费</view>
					<view style="float:right;">¥{{cost.weather_cist}}</view>
				</view>
				<view v-if="cost.setting.is_weather_cist" class="pop-item-line"></view>
				<view v-if="model.tip" class="pop-item">
					<view style="float:left;">小费</view>
					<view style="float:right;">¥{{model.tip}}</view>
				</view>
				<view v-if="model.tip" class="pop-item-line"></view>
				<view v-if="coupon_result" class="pop-item">
					<view style="float:left;">优惠券</view>
					<view style="float:right;">-¥{{coupon_result}}</view>
				</view>
				<view v-if="coupon_result" class="pop-item-line"></view>
				<view v-if="model.samount" class="pop-item">
					<view style="float:left;">服务费用</view>
					<view style="float:right;">¥{{model.samount}}</view>
				</view>
				<view v-if="model.samount" class="pop-item-line"></view>
			</view>
			<view v-if="popType==1" style="background-color: #FFFFFF;padding-left:15px;">
				<view style="float:left;font-size: 14px;color: #333333;margin-top: 16px;">{{money?'跑腿费':''}} <text style="font-size: 20px;color: #FF0000;"> {{money?'¥ '+money:''}}</text></view>
				<view @click="pay" style="float:right;font-size: 17px;color: #343433;margin-left: 17px;background: #FFE300;padding: 12px 22px;">立即支付</view>
				<view @click="popShow=false" style="float:right;font-size: 12px;color: #666666;margin-top: 16px;">
					明细 
					<view style="padding-top: 2px;float: right;">
						<image src="/static/runClient/jiesuan2.png" mode="aspectFit" />
					</view>
				</view>
			</view>
			<view v-if="popType==2" style="padding: 20px 13px;">
				<view style="margin-bottom: 20px;color: #000000;font-size: 18px;">订单超时</view>
				<view style="padding: 0 20px;">
					<view style="text-align: center;color: #FFE300;height: 20px;margin-bottom: 10px;"> <text v-if="model.overtime" > {{model.overtime}}分钟</text></view>
					<u-slider v-model="model.overtime" :active-color="'#FFE300'"></u-slider>
				</view>
				<view @click="popShow=false" style="background: #FFE300;text-align: center;height: 42px;padding-top: 10px;margin-top: 40px;border-radius: 5px;">
					确定
				</view>
			</view>
			<view v-if="popType==3" style="padding: 20px 13px">
				<view style="margin-bottom: 16px;color: #000000;font-size: 18px;">加小费</view>
				<view style="overflow: hidden;">
					<view v-for="(item, index) in tips" class="tip-item" :style="tipActiveIndex==index?'background: rgba(255, 227, 0, 0.5)':''" @click="setTips(index)" >{{item.text}}</view>
				</view>
				<input type="text" @input="onInput" :value="input" placeholder="其他金额" style="text-align: center;"/>
				
				<view @click="popShow=false" style="margin-top: 20px;background: #FFE300;text-align: center;height: 42px;padding-top: 10px;border-radius: 5px;">
					确定
				</view>
			</view>
			<view v-if="popType==5" style="padding: 20px 13px">
				<view style="color: #000000;font-size: 18px;">预估费用</view>
				<view style="margin-bottom: 16px;color: #000000;font-size: 12px;">实际费用在收货后与骑手结清</view>
				<view style="overflow: hidden;">
					<view style="float: left;margin-right: 3px;padding-top: 5px;">¥</view>
					<view style="float: left;">
					<u-input v-model="model.samount" :type="'number'" :border="false" :placeholder="'服务金额'"/>
					</view>
				</view>
				<view @click="popShow=false" style="margin-top: 20px;background: #FFE300;text-align: center;height: 42px;padding-top: 10px;border-radius: 5px;">
					确定
				</view>
			</view>
		</u-popup>
		
		<u-action-sheet :list="actionSheetList" v-model="actionSheetShow" @click="actionSheetCallback"></u-action-sheet>
	</view>
</template>

<script>
	import {getDate} from '@/common/fun.js'
	import {schoolAround,cost,orderCreate,orderPay} from '../../../common/api/runClient/home.js'
	import {studentAuthView} from '../../../common/api/runClient/auth.js'
	
	export default {
		data() {
			return {
				selectorShow:false,
				popShow:false,
				popType:0,
				model:{
					content:null,
					start_place:null,
					end_place:null,
					time:null,
					weight:null,
					gender:null,
					overtime:1,
					tip:null,
					ship_id:null,
					type:null,
					coupon_ids:[],
					pay_type:'lite',
					samount:null,
				},
				selectorMode: 'selector',
				selectorRange:[],
				selectorType: 1,
				selectorKey: null,
				selectorDefTime: null,
				selectorPam: {
					year: false,
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
				placeholder:'',
				type:0,
				timeText:'',
				start_place:'',
				end_place:'',
				weight:'',
				gender:'不限性别',
				cost:{},
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
						text: '不限性别',
						val: null
					}
				],
				tips:[
					{
						text:'不加了',
						val:''
					},
					{
						text:'¥ 1.00',
						val:'1.00'
					},
					{
						text:'¥ 2.00',
						val:'2.00'
					},
					{
						text:'¥ 3.00',
						val:'3.00'
					},
					{
						text:'¥ 5.00',
						val:'5.00'
					},
					{
						text:'¥ 10.00',
						val:'10.00'
					},
				],
				tipActiveIndex:-1,
				coupon_result:'',
				input:'',
				money:0.00,
				weightPrice:0.00,
				time_cost:0,
				floorCost:0,
			}
		},
		onLoad(parmas) {
			let title = '取快递'
			if(parmas.type == 2){
				this.placeholder = '可直接将取件短信粘贴此处.示例:【菜鸟裹裹】您的快递12345678(XX快递)已送到，请及时取，取件码1234'
			}
			if(parmas.type == 3){
				this.placeholder = '请填写您的需求'
				title = '外卖代拿'
			}
			if(parmas.type == 4){
				this.placeholder = '想让同学在食堂帮您带您什么...示例：七天便利店购买可比克薯片、酸奶、面包、打印文件等'
				title = '校园跑腿'
			}
			if(parmas.type == 5){
				this.placeholder = '请输入服务内容...示例：游戏代练/陪玩、修电脑、装win10系统、课业辅导等'
				title = '其他帮助'
			}
			let that = this
			uni.$on('selectAddress',(options)=>{
				that.end_place = options.address_name
				that.model.ship_id = options.address_id
				that.floorCost = options.floorCost
				// uni.$off('selectAddress')
				this.setMoney()
			})
			this.model.type = parmas.type
			this.type = parmas.type
			this.selectorDefTime = getDate;
			
			uni.$on('selectCoupon',(options)=>{
				that.model.coupon_ids = [options.coupon_id]
				that.coupon_result = options.coupon_result
				// uni.$off('selectCoupon')
				this.setMoney()
			})
			this.getCost()
			uni.setNavigationBarTitle({
				title:title
			});
		},
		methods: {
			setTips(index){
				this.model.tip = this.tips[index]['val']
				this.tipActiveIndex = index
				this.othTip = ''
				this.input = ''
				this.setMoney()
			},
			toPage(path){
				uni.navigateTo({
				    url: path
				});
			},
			selectValue(type){
				this.selectorType = type
				this.selectorMode = 'selector'
				this.selectorKey = null
				switch(type) {
				     case 1:
						this.selectorKey = 'name'
						this.getAround()
				        break;
				     case 2:
				        this.toPage('/pages/runClient/user/address?type=1')
				        break;
				     case 3:
						this.selectorMode = 'time'
						this.selectorShow = true
				        break;
				     case 4:
						this.selectorKey = 'title'
						this.selectorRange = this.cost.weithtCost
						this.selectorShow = true
				        break;
				     case 5:
						this.actionSheetShow = true
				        break;
				     case 6:
						this.popShow = true
						this.popType = 2
				        break;
				     case 7:
				        this.toPage('/pages/runClient/user/coupons?type=2')
				        break;
				     case 8:
						this.popShow = true
						this.popType = 3
				        break;
				     case 9:
						this.popShow = true
						this.popType = 5
				        break;
				        
				     default:
				} 
			},
			selectCfm(e){
				if (this.selectorType == 1) {
					this.model.start_place = this.selectorRange[e[0]]['id']
					this.start_place = this.selectorRange[e[0]]['name']
				}
				if (this.selectorType == 2) {
					this.model.end_place = this.selectorRange[e[0]]['id']
					this.end_place = this.selectorRange[e[0]]['id']
				}
				if (this.selectorType == 3) {
					this.model.time = e.timestamp
					let date = new Date();
					let year = date.getFullYear();
					let month = date.getMonth() + 1;
					let day = date.getDate();
					if (month==e.month && day == e.day){
						this.timeText = '今天 ' + e.hour + ':' + e.minute
					}else{
						this.timeText = year + '-' + e.month + '-' + e.day + ' ' + e.hour + ':' + e.minute
					}
				}
				if (this.selectorType == 4) {
					this.model.weight = this.selectorRange[e[0]]['id']
					this.weight = this.selectorRange[e[0]]['title']
					this.weightPrice = this.selectorRange[e[0]]['price']
					this.setMoney()
				}
			},
			async getAround(){
				let std = await studentAuthView()
				let res = await schoolAround(std.school_area_id ? std.school_area_id : std.school_id)
				this.selectorRange = res.list
				this.selectorShow = true
			},
			async getCost(){
				let res = await cost()
				this.cost = res
				this.model.weight = res.weithtCost[0].id
				this.weight = res.weithtCost[0]['title']
				this.weightPrice = res.weithtCost[0]['price']
				this.setMoney();
			},
			actionSheetCallback(index) {
				let a = this.actionSheetList[index];
				this.gender = a.text
				this.model.gender = a.val;
			},
			onInput(e){
				this.model.tip = e.detail.value
				this.tipActiveIndex = -1
				this.setMoney()
			},
			setMoney(){
				let date = new Date();
				let hour = date.getHours();
				if(hour<13 && hour>=11){
					this.time_cost =1
				}
				if(hour<19 && hour>=17){
					this.time_cost =2
				}
				this.money = parseFloat(this.cost.basic_cost) 
				+ ((this.cost.setting.is_lunch_cost || !this.cost.setting) && this.time_cost == 1 ? parseFloat(this.cost.lunch_time_cost):0)
				+ ((this.cost.setting.is_dinner_cost|| !this.cost.setting) && this.time_cost == 2 ? parseFloat(this.cost.dinner_time_cost):0)
				+ (this.cost.setting.is_weather_cist? parseFloat(this.cost.weather_cist):0)
				
				if(this.floorCost){
					this.money += (this.cost.setting.is_difficulty_cost ? parseFloat(this.cost.difficulty_cost):0)
				}
				if(this.model.tip){
					this.money +=parseFloat(this.model.tip)
				}
				if(this.model.weight){
					this.money += parseFloat(this.weightPrice)
				}
				if(this.coupon_result>0){
					this.money -= parseFloat(this.coupon_result)
				}
			},
			async pay(){
				let res = await orderCreate(this.model)
				let pay = await orderPay({order_id:res.id,scene:2,pay_platform:2,pay_type:'lite'})
				let that = this
				uni.requestPayment({
				    provider: 'wxpay',
				    timeStamp: pay.timeStamp,
				    nonceStr: pay.nonceStr,
				    package: pay.package,
				    signType: pay.signType,
				    paySign: pay.paySign,
				    success: function (res) {
				        that.toPage('/pages/runClient/order/index')
				    },
				    fail: function (err) {
				        console.log('fail:' + JSON.stringify(err));
				    }
				});
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
	.tip-item{
		float: left;
		margin-right: 10px;
		height: 20px;
		text-align: center;
		padding-top: 1px;
		font-size: 12px;
		color: #000000;
		width: 30%;
		border: 1px solid rgba(153, 153, 153, 0.5);
		border-radius: 3px;
		margin-bottom: 10px;
	}
</style>
