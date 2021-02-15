<template>
	<view style="min-height: 100vh;background-color: #F5F5F5;padding: 10px;16px">
		<view class="list">
			<view v-for="(item, index) in list" class="item">
				<view style="border-bottom: 1px solid rgba(153, 153, 153, 0.2);padding-bottom: 10px;overflow: hidden;">
					<view style="float:left;height: 16px;border-radius: 50px;text-align: center;">
						<image :src="$fun.fileUrl(item.file.file_url)" mode="aspectFit"></image>
					</view>
					<view style="float:left;margin-left: 5px;font-size: 12px;">{{item.name}}</view>
					<view :style="{'float':'right','border-radius': '8px 0px 0px 8px','color': '#FFFFFF','padding': '1px 5px','background': index==0?'#FFC300':(index==1?'#FF7100':(index==2?'#FF7100':'#CCCCCC'))}">NO.{{index+1}}</view>
				</view>


				<view style="margin-top: 10px;overflow: hidden;">
					<view style="float:left;width:25%;text-align: center;">
						<view style="margin-bottom: 5px;">{{item.day_order}}</view>
						<view style="color: #666666;">日单数</view>
					</view>
					<view style="float:left;width:25%;text-align: center;">
						<view style="margin-bottom: 5px;">{{item.total_order}}</view>
						<view style="color: #666666;">累计单数</view>
					</view>
					<view style="float:left;width:25%;text-align: center;">
						<view style="margin-bottom: 5px;color: #FF0000;">{{item.day_order}}</view>
						<view style="color: #666666;">日收入</view>
					</view>
					<view style="float:left;width:25%;text-align: center;">
						<view style="margin-bottom: 5px;color: #FF0000;">{{item.total_amount}}</view>
						<view style="color: #666666;">累计收入</view>
					</view>

				</view>

			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import {
		riderRank
	} from '../../../common/api/runRider/user.js'
	export default {
		data() {
			return {
				list: [],
			}
		},
		onLoad() {
			this.getRiderRank()
		},
		methods: {
			async getRiderRank() {
				this.list = await riderRank(uni.getStorageSync('rider_schoo_id'))
			},
		}
	}
</script>

<style>
	.item {
		font-size: 12px;
		background-color: #FFFFFF;
		padding: 10px 15px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		border-radius: 10px;
	}

	image {
		width: 30px;
		height: 30px;
	}
</style>
