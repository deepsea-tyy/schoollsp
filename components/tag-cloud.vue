<template>
	<!-- 个人中心 -->
	<view class="tagcloud-all" ref="tagcloudall">
		<view class="tag" v-for="item in tagList" :href="item.url" :style="':none;color:'+item.color+';top:'+item.top+'px;left:'+item.left+'px;opacity:'+item.alpha+';z-index:'+item.zIndex+';font-size:'+item.fontSize+'px;'">
			<view class="tag_Logo">
				<image src="https://lovebirdopen.com/static/youpin/img/tagLogo.svg" mode=""></image>
			</view>
			<view class="tag_name">
				{{item.name}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tagList: [],
				radius: 100,
				dtr: Math.PI / 180,
				d: 300,
				mcList: [],
				active: false,
				lasta: 1,
				lastb: 1,
				distr: true,
				tspeed: 10,
				size: 250,
				mouseX: 0,
				mouseY: 0,
				howElliptical: 1,
				oList: null,
				oA: null,
				sa: 0,
				ca: 0,
				sb: 0,
				cb: 0,
				sc: 0,
				cc: 0
			};
		},
		created() {
			this.init()
			this.query()
		},
		methods: {
			/**
			 * @param { Function } init 初始化 
			 */
			init() {

			},
			// 生成随机数
			getRandomNum() {
				return Math.floor(Math.random() * (255 + 1));
			},
			// 三角函数角度计算
			sineCosine(a, b, c) {
				this.sa = Math.sin(a * this.dtr);
				this.ca = Math.cos(a * this.dtr);
				this.sb = Math.sin(b * this.dtr);
				this.cb = Math.cos(b * this.dtr);
				this.sc = Math.sin(c * this.dtr);
				this.cc = Math.cos(c * this.dtr);
			},
			// 设置初始定位
			positionAll() {
				this.$nextTick(() => { // 注意: 所有的在onReady方法中执行的方法都需要$nextTick确保所有的标签都已经渲染
					var phi = 0;
					var theta = 0;
					var max = this.tagList.length;
					let list = this.tagList

					list.sort(() => Math.random() < 0.5 ? 1 : -1)

					list.map((item, index) => {
						if (this.distr) {
							phi = Math.acos(-1 + (2 * index - 1) / max);
							theta = Math.sqrt(max * Math.PI) * phi;
						} else {
							phi = Math.random() * (Math.PI);
							theta = Math.random() * (2 * Math.PI);
						}
						item.cx = this.radius * Math.cos(theta) * Math.sin(phi)
						item.cy = this.radius * Math.sin(theta) * Math.sin(phi)
						item.cz = this.radius * Math.cos(phi)
						item.left = item.cx - 157
						item.top = item.cy - 167
					})
					// 深拷贝list
					this.tagList = JSON.parse(JSON.stringify(list))
				})
			},
			// 坐标更新 让标签动起来
			async update() {
				this.$nextTick(() => { // 注意: 所有的在onReady方法中执行的方法都需要$nextTick确保所有的标签都已经渲染
					var a;
					var b;
					if (this.active) {
						a = (-Math.min(Math.max(-this.mouseY, -this.size), this.size) / this.radius) * this.tspeed;
						b = (Math.min(Math.max(-this.mouseX, -this.size), this.size) / this.radius) * this.tspeed;
					} else {
						a = this.lasta * 0.98;
						b = this.lastb * 0.98;
					}
					this.lasta = a;
					this.lastb = b;
					if (Math.abs(a) <= 0.01 && Math.abs(b) <= 0.01) {
						return
					}
					var c = 0;
					this.sineCosine(a, b, c);

					let list = this.tagList
					list.map((item, index) => {
						var rx1 = item.cx;
						var ry1 = item.cy * this.ca + item.cz * (-this.sa);
						var rz1 = item.cy * this.sa + item.cz * this.ca;
						var rx2 = rx1 * this.cb + rz1 * this.sb;
						var ry2 = ry1;
						var rz2 = rx1 * (-this.sb) + rz1 * this.cb;
						var rx3 = rx2 * this.cc + ry2 * (-this.sc);
						var ry3 = rx2 * this.sc + ry2 * this.cc;
						var rz3 = rz2;

						item.cx = rx3;
						item.cy = ry3;
						item.cz = rz3;
						var per = this.d / (this.d + rz3);
						item.x = (this.howElliptical * rx3 * per) - (this.howElliptical * 2);
						item.y = ry3 * per;
						item.scale = per;
						item.alpha = per;
						item.alpha = (item.alpha - 0.6) * (10 / 6);
					})
					this.tagList = JSON.parse(JSON.stringify(list))
					this.doPosition();
					this.depthSort();
				})
			},

			doPosition() {
				this.$nextTick(() => { // 注意: 所有的在onReady方法中执行的方法都需要$nextTick确保所有的标签都已经渲染
					var l = 120;
					var t = 120;
					let list = this.tagList
					list.map((item, index) => {
						item.left = item.cx + l - 20
						item.top = item.cy + t - 10
						item.fontSize = Math.ceil(12 * item.scale / 4) + 8
					})

					this.tagList = JSON.parse(JSON.stringify(list))
				})
			},

			depthSort() {
				this.$nextTick(() => { // 注意: 所有的在onReady方法中执行的方法都需要$nextTick确保所有的标签都已经渲染
					var aTmp = [];
					for (let i = 0; i < this.tagList.length; i++) {
						aTmp.push(this.tagList[i]);
					}
					aTmp.sort(function(vItem1, vItem2) {
						if (vItem1.cz > vItem2.cz) {
							return -1;
						} else if (vItem1.cz < vItem2.cz) {
							return 1;
						} else {
							return 0;
						}
					});
					// for (let i = 0; i < aTmp.length; i++) {
					// 	aTmp[i].style.zIndex = i;
					// }
				})
			},
			// 网络请求 拿到tagList
			query() {
				// 假装从接口拿回来的数据
				let tagListOrg = [{
						name: '标签1',
						url: 'www.baidu.com',
						left: 0,
						top: 0,
						opacity: 0
					},
					{
						name: '标签2',
						url: 'www.baidu.com'
					},
					{
						name: '标签3',
						url: 'www.baidu.com'
					},
					{
						name: '标签4',
						url: 'www.baidu.com'
					},
					{
						name: '标签5',
						url: 'www.baidu.com'
					},
					{
						name: '标签6',
						url: 'www.baidu.com'
					},
					{
						name: '标签7',
						url: 'www.baidu.com'
					},
					{
						name: '标签8',
						url: 'www.baidu.com'
					},
					{
						name: '标签9',
						url: 'www.baidu.com'
					},
					{
						name: '标签10',
						url: 'www.baidu.com'
					},
					{
						name: '标签11',
						url: 'www.baidu.com'
					},
					{
						name: '标签12',
						url: 'www.baidu.com'
					},
					{
						name: '标签13',
						url: 'www.baidu.com'
					},
					{
						name: '标签14',
						url: 'www.baidu.com'
					},
					{
						name: '标签15',
						url: 'www.baidu.com'
					},
				];
				// 给tagList添加随机颜色
				tagListOrg.forEach(item => {
					item.color = "rgb(" + this.getRandomNum() + "," + this.getRandomNum() + "," + this.getRandomNum() + ")";
				})
				this.tagList = tagListOrg;
				this.handleReady();
			},
			// 生成标签云
			handleReady() {
				this.$nextTick(() => {
					this.oList = this.$refs.tagcloudall;

					this.sineCosine(0, 0, 0);
					this.positionAll();
					// this.oList.onmouseover = () => {
					//   this.active = true;
					// }
					// this.oList.onmouseout = () => {
					//   this.active = false;
					// }
					// this.oList.onmousemove = (event) => {
					//   var oEvent = window.event || event;

					//   this.mouseX = oEvent.clientX - (this.oList.offsetLeft + this.oList.offsetWidth / 2);
					//   this.mouseY = oEvent.clientY - (this.oList.offsetTop + this.oList.offsetHeight / 2);
					//   this.mouseX /= 5;
					//   this.mouseY /= 5;
					// }
					setInterval(() => {
						this.update()
					}, 30); // 定时器执行 不能写setInterval(this.update(), 30)
				})
			}
		},
	}
</script>

<style lang="scss">
	.tagcloud-all {
		position: relative;
		// top: 80rpx;
		// left: 100rpx;
		// height: 360rpx;
		// width: 360rpx;

		// height: 100vh;
		.tag {
			position: absolute;
			top: 0px;
			left: 0px;
			color: #fff;
			// font-weight: bold;
			text-decoration: none;
			padding: 3rpx 6rpx;

			&:hover {
				color: #FF0000;
				letter-spacing: 2px;
			}

			.tag_Logo {
				height: 46rpx;
				width: 48rpx;
				margin: 0 auto;

				image {
					height: 48rpx;
					width: 48rpx;
				}

			}

			.tag_name {
				color: #fff;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}
</style>
