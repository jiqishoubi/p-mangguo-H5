<template>
	<view>
		<view class="form">
			<view class="item top">
				<view class="label">酬金</view>
				<view class="input count">80</view>
			</view>
			<view class="item">
				<view class="label">订单流水</view>
				<view class="input">80</view>
			</view>
			<view class="item">
				<view class="label">商户订单</view>
				<view class="input">80</view>
			</view>
			<view class="item">
				<view class="label">收款账户</view>
				<view class="input">80</view>
			</view>
			<view class="item">
				<view class="label">收款方式</view>
				<view class="input">80</view>
			</view>
			<view class="item">
				<view class="label">商户名称</view>
				<view class="input">80</view>
			</view>
		</view>

		<view><button class="btn" hover-class="btn_active" @tap="submit">申请电子回单</button></view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			obj: null
		};
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
		submit() {}
	}
};
</script>

<style>
page {
	background-color: #f4f4f4;
}
</style>
<style lang="less">
@import '~utils/utils.less';

.form {
	background-color: #fff;
}
.item {
	.flexCenter;
	.flexBetween;
	height: 95rpx;
	padding: 0 28rpx;
	border-top: 1rpx solid #cecece;
	.label {
		color: #848484;
		font-size: 29rpx;
	}
	.input {
		.flex1;
		color: #333;
		text-align: right;
		font-size: 29rpx;
	}
}
.top {
	height: 194rpx;
	.count {
		font-size: 50rpx;
	}
}

// btn
.btn {
	.flexCenter;
	.flexJCenter;
	width: 681rpx;
	height: 97rpx;
	margin: 46rpx auto;
	border-radius: 14rpx;
	background-color: @primaryColor;
	color: #fff;
	font-size: 32rpx;
}
.btn_active {
	background-color: @hoverColor;
}
</style>
