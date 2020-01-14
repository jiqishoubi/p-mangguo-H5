<template>
	<view>
		<mp-complete-navbar-height></mp-complete-navbar-height>
		
		<view class="top">
			<image class="logo" src="https://cdn.s.bld365.com/mangguologin_logo.png"></image>
			<view class="logo_title">电子商务综合服务平台</view>
		</view>

		<!-- form -->
		<view class="form">
			<view class="form_item">
				<image class="form_item_icon" src="https://cdn.s.bld365.com/mangguologin_form_item_icon_01.png"></image>
				<input class="form_input" placeholder="请输入手机号码" />
			</view>
			<view class="form_item">
				<image class="form_item_icon" src="https://cdn.s.bld365.com/mangguologin_form_item_icon_02.png"></image>
				<input class="form_input" placeholder="请输入密码" :password="true" />
				<getsmsbtn limitSecond="5" allUrl='' phoneNumber='' style="color:red"></getsmsbtn>
			</view>
		</view>

		<!-- btn -->
		<button class="btn" hover-class="btn_active">登录</button>
	</view>
</template>

<script>
// 组件
import mpCompleteNavbarHeight from '@/components/mp-completeNavbarHeight.vue'
import getsmsbtn from '@/components/getsmsbtn.vue';

export default {
	data() {
		return {};
	},
	components: {
		mpCompleteNavbarHeight,
		getsmsbtn
	}
};
</script>

<style lang="less">
@import '~utils/utils.less';

.top {
	.flexColumn;
	.flexJCenter;
	height: 473rpx;
	background-color: @primaryColor;
	.logo {
		width: 181rpx;
		height: 77rpx;
		margin-bottom: 30rpx;
	}
	.logo_title {
		color: #fff;
	}
}

// form
.form {
	margin: 75rpx 73rpx;
	.form_item {
		.flexCenter;
		height: 80rpx;
		margin-top: 20rpx;
		border-bottom: 1rpx solid #dedede;
		.form_item_icon {
			width: 25rpx;
			height: 34rpx;
			margin-right: 24rpx;
		}
		.form_input {
			.flex1;
		}
	}
}

// btn
.btn {
	margin: 0 73rpx;
	background-color: @primaryColor;
	color: #ffffff;
	font-size: 33rpx;
}
.btn_active {
	background-color: #367ae8;
}
</style>
