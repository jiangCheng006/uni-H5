<template>
	<view class="content">
		<u-button text="月落"></u-button><u-tag text="标签" plain size="mini" type="warning"></u-tag>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			this.test()
		},
		methods: {
			test () {
				this.$ajax({
					url: '/api/decoration/noticelist/list?type=1410003',
					method: 'get',
				}).then(res => {
					console.log('success', res)
					this.title = res.data
				}).catch(err => {
					console.log('fail', err)
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
