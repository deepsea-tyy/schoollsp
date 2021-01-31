<template>
	<view style="background-color: #FFFFFF;padding: 14px;">
		<view style="margin-bottom: 18px;">
			<u-steps :list="stepList" :current="current" :mode="mode" :active-color="activeColor"></u-steps>
		</view>
		<view v-if="status == 1" class="review">
			<image src="/static/runClient/review1.png" mode="aspectFit"></image>
			<view class="status">审核中...</view>
			<view class="desc">您的资料正在审核中，请耐心等待...</view>
			
		</view>
		
		<view v-if="status==2" class="review">
			<image src="/static/runClient/review2.png" mode="aspectFit"></image>
			<view class="status">审核失败！</view>
			<view class="desc">很抱歉，您的认证信息中有部分信息
未能通过审批，请修改后重申。</view>
			
			<u-button :custom-style="customStyle1" :hair-line="hairLin" @click="toPage('/pages/auth/student')">知道了</u-button>
			<u-button :custom-style="customStyle" :hair-line="hairLin" @click="toPage('/pages/auth/student')">再次申请</u-button>
		</view>
	
		<view v-if="status==3" class="review">
			<image src="/static/runClient/review3.png" mode="aspectFit"></image>
			<view class="status">审核成功！</view>
			<view class="desc">恭喜您，您的认证信息已审核成功！</view>
			
			<u-button :custom-style="customStyle" :hair-line="hairLin" @click="toPage()">去下单</u-button>
		</view>
	
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				stepList:[{
					name: '实名认证'
				}, {
					name: '学生认证'
				}, {
					name: '审核中'
				}],
				current: 2, // 0 1 2
				icon: 'checkmark',
				mode: 'number',
				activeColor: '#FFE400',
				customStyle: {
					background: '#FCF800',
					width: '241px',
					border:'none',
					marginTop:'20px',
				},
				customStyle1: {
					width: '241px',
					marginTop:'20px',
				},
				status:3 // 1 2 3
			}
		},
		onLoad() {
		},
		methods: {
			toPage(){
				console.log(1111)
				uni.navigateTo({
				    url: '/pages/home/index'
				});
			},
			
		}
	}
</script>
	
<style>
	.review{
		text-align: center;
	}
	image{
		width: 128px;
		height: 128px;
		margin: 40px 0;
	}
	.status{
		size: 18px;
		color: #000000;
		margin-bottom: 20px;
	}
	.desc{
		margin-top: 20px;
		margin-bottom: 30px;
		padding: 0 67px;
	}
</style>
