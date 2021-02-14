<template>
	<view style="min-height: 100vh;background-color: #F9F9F9;padding-top: 10px;">
		<view style="height: 141px;background: #FFFFFF;padding: 16px 15px;font-size: 12px;">
			<view class="clearfix">
				<view style="color: #FFFFFF;float:left;width: 16px;height: 16px;background: #FF4C25;border-radius: 10px;text-align: center;">取</view>
				<view style="color: #000000;float:left;margin-left: 15px;">{{item.type==5? item.runerrands.content:item.runerrandsStartPlace.name}}</view>
			</view>

			<view class="clearfix">
				<view style="margin-top: 20px;color: #FFFFFF;float:left;width: 16px;height: 16px;background: #00C56C;border-radius: 10px;text-align: center;">送</view>
				<view style="float:left;margin-left: 15px;margin-top: 11px;">
					<view v-if="item.type!=5" style="color: #000000;">{{item.shipAddress.school}} {{item.shipAddress.school_area}}
						{{item.shipAddress.building_no}}-{{item.shipAddress.floor}}-{{item.shipAddress.house_number}}</view>
					<view v-if="item.type==5" style="color: #000000;">{{item.runerrands.end_place}}</view>
					<view v-if="item.type!=5" style="color: #666666;margin-top: 2px;">{{item.shipAddress.name+' '}}
						{{item.shipAddress.phone}}</view>
					<view v-if="item.type==5" style="color: #666666;margin-top: 2px;">{{item.runerrands.phone}}</view>
				</view>
			</view>
			<view style="border-bottom: 1px solid rgba(153, 153, 153, 0.1);margin-top: 10px;"></view>
			<view v-if="item.receiver && item.complete!=3" style="position: relative;">
				<view @click="makeCall(item.type==5? item.runerrands.phone:item.shipAddress.phone)" class="btn">联系客户</view>
			</view>
		</view>
		<view style="margin: 10px 0;margin-left: 15px;">服务信息</view>

		<view style="background: #FFFFFF;padding: 16px 15px;font-size: 12px;">
			<view style="color: #000000;margin-bottom:10px">立即送达</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">服务信息：</view>
				<view style="float:left;width: 80%;">
					{{item.runerrands.content}}
				</view>
			</view>
			<view v-if="item.type!=5" class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">物品重量：</view>
				<view style="float:left;width: 80%;">
					{{item.runerrandsWeight.title}}
				</view>
			</view>
			<view class="clearfix" style="color: #666666;">
				<view style="float:left;">手机号码：</view>
				<view style="float:left;width: 80%;">
					{{item.type==5? item.runerrands.phone:item.shipAddress.phone}}
				</view>
			</view>
		</view>

		<view style="margin: 10px 0;margin-left: 15px;">订单信息</view>

		<view style="background: #FFFFFF;padding: 16px 15px;font-size: 12px;">
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">订单编号：</view>
				<view style="float:left;width: 80%;">
					{{item.id}}
				</view>
			</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">下单时间：</view>
				<view style="float:left;width: 80%;">
					{{$fun.formatDate(item.created_at,1)}}
				</view>
			</view>
			<view class="clearfix" style="color: #666666;">
				<view style="float:left;">支付时间：</view>
				<view style="float:left;width: 80%;">
					{{$fun.formatDate(item.pay_at,1)}}
				</view>
			</view>
		</view>

		<view style="margin: 10px 0;margin-left: 15px;">订单收入</view>

		<view style="background: #FFFFFF;padding: 16px 15px;font-size: 12px;">
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">配 送 费：</view>
				<view style="float:left;width: 80%;">
					¥{{item.pay_price}}
				</view>
			</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">优 惠 券：</view>
				<view style="float:left;width: 80%;">
					{{item.order_pmt?('¥'+item.order_pmt):''}}
				</view>
			</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">小 费：</view>
				<view style="float:left;width: 80%;">
					{{item.runerrands.tip?('¥'+item.runerrands.tip):''}}
				</view>
			</view>
			<view class="clearfix" style="color: #666666;margin-bottom:10px">
				<view style="float:left;">平台服务费：</view>
				<view style="float:left;width: 70%;">
					{{item.platform_perc_price?('¥'+item.platform_perc_price):''}}
				</view>
			</view>
			<view class="clearfix" style="color: #666666;">
				<view style="float:left;">本单收入：</view>
				<view style="float:left;width: 80%;">
					{{item.getMoney?('¥'+item.getMoney):''}}
				</view>
			</view>
		</view>

		<view v-if="item.receiver && item.complete!=3">
			<view @click="btnClick(1)" v-if="!item.complete" style="width:22%;text-align: center;float: left;margin-left: 8px;padding: 3px 10px;border-radius: 5px;background: #FFE300;">确认取货</view>
			<view @click="btnClick(2)" v-if="item.complete==1" style="width:22%;text-align: center;float: left;margin-left: 8px;padding: 3px 10px;border-radius: 5px;background: #FFE300;">确认送达</view>
			<view @click="btnClick(3)" v-if="!item.complete || item.complete<2" style="width:22%;text-align: center;float: left;margin-left: 8px;padding: 3px 10px;border-radius: 5px;background: #FFE300;">申请转单</view>
			<view @click="selectorShow=true" v-if="item.transit" style="width:22%;text-align: center;float: left;margin-left: 8px;padding: 3px 10px;border-radius: 5px;background: #00C56C;color: #FFFFFF;">定向转单</view>
			<view @click="btnClick(4)" v-if="!item.complete || item.complete<2" style="width:22%;text-align: center;float: left;margin-left: 8px;padding: 3px 10px;border-radius: 5px;background: #FF4C25;color: #FFFFFF;">取消订单</view>
		</view>

		<u-modal ref="uModal" v-model="mshow" :show-cancel-button="true" :show-title="showTitle" @confirm="confirm" :content="content"
		 confirm-color="#FFE300">
		</u-modal>
		
		<u-picker 
			v-model="selectorShow" 
			:mode="'selector'"
			:range-key="'name'" 
			@confirm="selectCfm" 
			:default-selector="[0]" 
			:range="selectorRange"></u-picker>
	</view>
</template>

<script>
	import {
		runerrandsOrderView,
		runerrandsOrderDelivery,
		runerrandsOrderComplete,
		riderList
	} from '../../../common/api/runRider/home.js'
	export default {
		data() {
			return {
				mshow: false,
				content: '',
				type: 0,
				selectorShow:false,
				selectorRange: [],
				item: {
					id: '',
					pay_price: '',
					pay_at: '',
					complete: '',
					coupon: '',
					created_at: '',
					runerrands: {
						content: '',
						time: '',
						tip: '',
						end_place: '',
					},
					shipAddress: {
						name: '',
						phone: '',
						school: '',
						school_area: '',
						building_no: '',
						floor: '',
						house_number: '',
					},
					runerrandsWeight: {
						title: '',
						price: '',
					},
					runerrandsStartPlace: {
						name: ''
					},
				}
			}
		},
		onLoad(params) {
			this.geItem(params.order_id)
		},
		methods: {
			makeCall(phone) {
				uni.makePhoneCall({
					phoneNumber: phone
				});
			},
			async geItem(id) {
				let res = await runerrandsOrderView(id)
				this.item = res
				if (res.transit) {
					let school_id = uni.getStorageSync('rider_schoo_id')
					let rds = await riderList(school_id)
					this.selectorRange = rds.list
				}
			},
			btnClick(type) {
				this.type = type
				this.mshow = true
				switch (type) {
					case 1:
						this.content = '您确定已取货吗？'
						break;
					case 2:
						this.content = '您确定已送达吗？'
						break;
					case 3:
						this.content = '您确定要转单吗？'
						break;
					case 4:
						this.content = '您确定要取消订单吗?'
						break;
					default:
				}
			},
			confirm() {
				if (this.type == 1) {
					this.complete({
						order_id: this.item.id,
						complete: 1
					})
				}
				if (this.type == 2) {
					this.complete({
						order_id: this.item.id,
						complete: 2
					})
				}
				if (this.type == 3) {
					this.complete({
						order_id: this.item.id,
						transit: 1
					})
				}
				if (this.type == 4) {
					this.complete({
						order_id: this.item.id,
						cancel: 1
					})
				}
			},
			async complete(data) {
				await runerrandsOrderComplete(data)
				uni.showToast({
					title: '操作成功'
				})
				if (data.cancel || data.transit_user) {
					uni.navigateBack()
				} else {
					await this.geItem(data.order_id)
				}
			},
			selectCfm(e){
				
				console.log(this.selectorRange[e[0]]['user_id'])
				this.complete({order_id:this.item.id,transit_user:this.selectorRange[e[0]]['user_id']})
			}
		}
	}
</script>

<style>
	.clearfix:after {
		/*伪元素是行内元素 正常浏览器清除浮动方法*/
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	.btn {
		position: absolute;
		top: 25px;
		left: 50%;
		transform: translate(-50%, -50%);
		background: #FFE300;
		border-radius: 5px;
		height: 30px;
		width: 200px;
		padding-top: 6px;
		text-align: center;
	}
</style>
