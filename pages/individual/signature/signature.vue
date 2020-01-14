<template>
	<view>
		<step active="2"></step>

		<view class="sign">
			<view class="title">请输入签名</view>
			<signature ref="signature" canvasId="signature" @clear="clear" @save="save"></signature>
			<view class="ctrl"><view class="chongzhi" @tap="chongzhi">重置</view></view>
		</view>

		<!-- btn -->
		<view class="btn" @tap="clickNext">确认提交并签字</view>
	</view>
</template>

<script>
import step from '@/components/step.vue';
import signature from '@/components/signature.vue';

export default {
	data() {
		return {
		};
	},
	components: {
		step,
		signature
	},
	/**
	 * 周期
	 */
	onLoad() {},
	onShow() {},
	onReady() {},
	onHide() {},
	onUnload() {},
	onPullDownRefresh() {},
	onReachBottom() {},
	onPageScroll() {},
	onBackPress() {},
	/**
	 * 方法
	 */
	methods: {
		clear() {},
		save(base64) {
			console.log(base64);
		},
		chongzhi() {
			this.$refs.signature.clear();
		},
		clickNext() {
			this.$refs.signature.save();
		}
	}
};
</script>

<style>
page {
	background-color: #f5f5f5;
}
</style>
<style lang="less">
@import '~utils/utils.less';

.sign {
	background-color: #fff;
	.title {
		.flexCenter;
		height: 85rpx;
		padding: 0 24rpx;
		border-bottom: 1rpx solid #d7d6d6;
		font-size: 28rpx;
	}
	.ctrl {
		.flexCenter;
		justify-content: flex-end;
		height: 85rpx;
		padding: 0 60rpx;
		border-top: 1rpx solid #d7d6d6;
		color: @primaryColor;
	}
}

.btn {
	.flexCenter;
	.flexJCenter;
	height: 89rpx;
	background-color: @primaryColor;
	font-size: 28rpx;
	color: #fff;
	position: fixed;
	width: 100%;
	left: 0;
	bottom: 0;
	z-index: 11;
}
</style>
