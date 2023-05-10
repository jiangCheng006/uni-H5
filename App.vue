<script>
export default {
	onLaunch: function() {
		// #ifdef APP-PLUS
		// App平台检测升级，服务端代码是通过uniCloud的云函数实现的，详情可参考：https://ext.dcloud.net.cn/plugin?id=2226
		if (plus.runtime.appid !== 'HBuilder') {
			// 真机运行不需要检查更新，真机运行时appid固定为'HBuilder'，这是调试基座的appid
			this.$ajax({
				url: '/update', //检查更新的服务器地址
				data: {
					appid: plus.runtime.appid,
					version: plus.runtime.version,
					imei: plus.device.imei
				}
			})
				.then(res => {
					uni.showModal({
						title: '更新提示',
						content: res.message ? res.message : '是否选择更新',
						success: ee => {
							if (ee.confirm) {
								plus.runtime.openURL(res.data.url);
							}
						}
					});
				})
				.catch(err => {
					console.log('err', err);
				});
		}
		// #endif
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
@import 'components/colorui/main.css';
@import 'components/colorui/icon.css';
/*每个页面公共css */
@import url("styles/basic.less");
</style>
<style scoped lang="scss">
@import "uview-ui/index.scss";
</style>
