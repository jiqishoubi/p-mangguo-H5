<template>
	<view class="item" @tap="emitTap">
		<view class="title">
			<view class="flexCenter">
				<view class="box"><image class="wh100" :src="icon"></image></view>
				<view class="title_text">{{ title }}</view>
			</view>
			<view class="registered">
				已报名
				<text class="registered_text">{{ registered }}</text>
				人
			</view>
		</view>

		<view class="content">
			<view class="p">任务描述：{{ desc }}</view>
			<view class="p">任务地址：{{ address }}</view>
			<view class="p">需要人数：{{ need }}</view>
			<view class="p">任务酬金：{{ reward }}</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['icon', 'title', 'registered', 'desc', 'address', 'need', 'reward'],
	/**
	 * 周期
	 */
	beforeCreate() {},
	created() {},
	beforeMount() {},
	mounted() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {},
	/**
	 * 方法
	 */
	methods: {
		//动作
		emitTap() {
			this.$emit('mTap');
		}
	}
};
</script>

<style lang="less">
@import '~utils/utils.less';

.item {
	background-color: #fff;
	padding: 0 28rpx;
	margin-bottom: 22rpx;
	.title {
		.flexCenter;
		.flexBetween;
		padding: 32rpx 0;
		border-bottom: 1rpx solid #cecece;
		.box {
			width: 38rpx;
			height: 38rpx;
			margin-right: 14rpx;
		}
		.title_text {
			color: #4a4a4a;
			font-size: 31rpx;
			font-weight: bold;
		}
		.registered {
			color: #9b9b9b;
			font-size: 25rpx;
			.registered_text {
				color: @primaryColor;
				font-size: 31rpx;
			}
		}
	}

	// content
	.content {
		padding: 32rpx 0;
		color: #4a4a4a;
		font-size: 25rpx;
		.p {
			margin-bottom: 8rpx;
		}
	}
}
</style>
