<script>
	export default {
		onLaunch: function() {
			// console.log('App Launch')
		},
		onShow: function() {
			//检测设备高度
			uni.getSystemInfo({
				success:(res)=>{
					// console.log("手机可用高度:"+res.windowHeight+"rpx");
					this.$store.commit('set_window_height',res.windowHeight*2);
				}
			})
		},
		onHide: function() {
			// console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	@import "/uview-ui/index.scss";
	/*每个页面公共css */
	.body{
	    /*距离顶部范围应该在118-122范围内*/
	    padding-bottom: 118upx;
	}
</style>
