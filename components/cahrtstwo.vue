<template>
	<view>
		<view class="homeContentQchart">
			<canvas canvas-id="canvaLineB" id="canvaLineB" class="charts" @touchstart="touchLineA"></canvas>
		</view>
	</view>
</template>

<script>
// 引入uCharts 方法组件。
import uCharts from './u-charts/u-charts.js';
// 定义全局变量
var _self;
var canvaLineB=null;
export default {
	components: {

	},
	data() {
		return {
			cWidth:'',
			cHeight:'',
			pixelRatio:1,
		}
	},
	onLoad() {
		_self = this;
		// uni.upx2px(750) 这是uni-app自带的自适应，以750的尺寸为基准。动态变化
		this.cWidth=uni.upx2px(650);
		this.cHeight=uni.upx2px(176);
		this.getServerData();
	},
	methods: {
		// 获取数据，发请求
		getServerData(){
			uni.request({
				// 请求地址
				url: 'https://www.ucharts.cn/data.json',
				// 请求参数
				data:{
				},
				// 请求成功的回调函数
				success: function(res) {
					console.log(res.data.data.LineA,res.data.data.LineA.categories)
					let LineA={categories:[],series:[]};
					/*
					let LineA={categories:[],series:[]};
					LineA.categories=['2010','2012','2014','2016','2018','2020'];					*/ 
					LineA.series=[{
						name:"南京",
						data:[0,300,1500,3000,2600,0],
						color:'#3AD29F'
					}];
					LineA.categories=res.data.data.LineA.categories;
					// LineA.series=res.data.data.LineA.series;
					// console.log(LineA.series,'LineA.series')
					// 找到id为canvaLineB的块
					_self.showLineA("canvaLineB",LineA);
				},
				// 请求失败的回调函数
				fail: () => {
					_self.tips="网络错误，小程序端请检查合法域名";
				},
			});
		},
		// 展示图标的函数 接收参数，一个块的id,一个数据
		showLineA(canvasId,chartData){
			canvaLineB=new uCharts({
				$this:_self,
				canvasId: canvasId,
				// 图标类型
				type: 'area',
				fontSize:8,
				legend:{show:false},
				dataLabel:false,
				dataPointShape:true,
				background:'#FFFFFF',
				pixelRatio:_self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				// x轴显示的内容
				xAxis: {
					disabled:true,
					disableGrid:false,
					type:'grid',
					gridColor:'#fff',
					gridType:'dash',
					dashLength:8
				},
				// y轴显示的内容
				yAxis: {
					disabled:true,
					gridType:'dash',
					gridColor:'#fff',
					dashLength:8,
					splitNumber:5,
					min:10,
					max:180,
					format:(val)=>{return val.toFixed(0)+'元'}
				},
				width: _self.cWidth*_self.pixelRatio,
				height: _self.cHeight*_self.pixelRatio,
				extra: {
					area:{
						type: 'curve',
						gradient:true,
					},
				}
			});
			
		},
		// 点击图表显示的内容
		touchLineA(e) {
			// 使用声明的变量canvaLineB
			canvaLineB.showToolTip(e, {
				format: function (item, category) {
					return category + ' ' + item.name + ':' + item.data 
				}
			});
		},
	}
}
</script>

<style lang="less" scoped>
	.homeContentQchart{
		height: 176rpx;
		width: 100%;
		.charts{
			height: 176rpx;
			width: 100%;
			background-color: #fff;
		}
	}
</style>
