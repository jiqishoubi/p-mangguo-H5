<template>
	<view class="item" @tap="emitTap">
		<view class="flexCenter flexBetween">
			<view style="color:#4A4A4A;font-size: 29rpx;">银行:{{ bank }}({{ no }})</view>
			<view class="count">{{ count }}</view>
		</view>
		<view style="color:#9B9B9B;">{{ date }}</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	props: ['bank', 'no', 'date', 'count'],
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
	margin: 24rpx 0;
	padding: 28rpx;
	background-color: #fff;
	border-radius: 14rpx;
	.count {
		color: @primaryColor;
		font-size: 35rpx;
	}
}
</style>
