<template>
	<view>
		<view class="tip">请绑定持卡本人的银行卡</view>

		<view class="form">
			<view class="item">
				<view class="label">姓名</view>
				<input class="input" placeholder="请输入姓名" v-model="username" />
			</view>
			<view class="item">
				<view class="label">身份证号码</view>
				<input class="input" placeholder="请输入身份证号码" v-model="pspno" />
			</view>
			<view class="item">
				<view class="label">手机号码</view>
				<input class="input" placeholder="请输入手机号码" v-model="phone" />
			</view>
			<view class="item">
				<view class="label">银行卡卡号</view>
				<input class="input" placeholder="请输入银行卡卡号" v-model="bankcard" />
			</view>
			<view class="item">
				<view class="label">验证码</view>
				<input class="input" placeholder="请输入验证码" v-model="smscode" />
				<getsmsbtn limitSecond="60" allUrl="" phoneNumber="" styleStr="font-size:29rpx;color:#4185f4;"></getsmsbtn>
			</view>
		</view>

		<!-- btn -->
		<view class="btn_wrap">
			<button class="btn btn1" hover-class="btn1_active" @tap="submit">确定</button>
			<button class="btn btn2" hover-class="btn2_active" @tap="cancel">取消</button>
		</view>
	</view>
</template>

<script>
import getsmsbtn from '@/components/getsmsbtn.vue';
export default {
	data() {
		return {
			// form
			username: '',
			pspno: '',
			phone: '',
			bankcard: '',
			smscode: ''
		};
	},
	components: {
		getsmsbtn
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
		submit() {},
		cancel() {
			uni.navigateBack();
		}
	}
};
</script>

<style lang="less">
@import '~utils/utils.less';

.tip {
	color: #9b9b9b;
	font-size: 25rpx;
	padding: 28rpx 34rpx;
}
.form {
	.item {
		.flexCenter;
		height: 88rpx;
		border-bottom: 1rpx solid #cecece;
		padding: 0 28rpx 0 34rpx;
		.label {
			width: 190rpx;
			font-size: 29rpx;
			color: #4a4a4a;
		}
		.input {
			.flex1;
			font-size: 29rpx;
		}
	}
}

// btn
.btn_wrap {
	.flexColumn;
	.flexJCenter;
	margin-top: 60rpx;
	.btn {
		.flexCenter;
		.flexJCenter;
		box-sizing: border-box;
		width: 681rpx;
		height: 96rpx;
		margin-bottom: 35rpx;
	}
	.btn1 {
		background-color: @primaryColor;
		color: #fff;
	}
	.btn1_active {
		background-color: @hoverColor;
	}
	.btn2 {
		background-color: #ffffff;
		color: @primaryColor;
		border: 1rpx solid @primaryColor;
	}
	.btn2_active {
		background-color: @hoverWhite;
	}
}
</style>
