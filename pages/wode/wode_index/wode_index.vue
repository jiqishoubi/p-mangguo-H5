<template>
	<view>
		<mp-complete-navbar-height styleStr="background-color:#4185f4;"></mp-complete-navbar-height>

		<view class="top">
			<view class="box"><image class="head" src="https://cdn.s.bld365.com/mangguowode_index_default_head.png"></image></view>
			<view class="content">
				<view class="name">
					<text v-if="userInfo && userInfo.userAuthInfo && userInfo.userAuthInfo.REAL_NAME">{{ userInfo.userAuthInfo.REAL_NAME }}</text>
					<text v-else>请实名认证</text>
				</view>
				<view class="desc">欢迎来到电子商务综合服务平台</view>
			</view>
			<!-- <view class="tiao" @tap="tiaozhuan">跳转至芒果平台</view> -->
		</view>

		<view class="container">
			<view class="choujin" style="color: #9B9B9B;">
				<view style="margin: 0 17rpx;border-bottom: 1rpx solid #CECECE;padding: 31rpx 24rpx;">
					<view>总酬金（元）</view>
					<view style="color: #000;font-size: 42rpx;font-weight: bold;margin: 8rpx 0;">0.00</view>
					<view class="flexCenter">
						<image src="https://cdn.s.bld365.com/mangguoicon_tanhao.png" style="width: 22rpx;height: 22rpx;margin-right: 7rpx;"></image>
						数额为您在平台历史已收款的总金额
					</view>
				</view>
			</view>

			<!-- 导航 -->
			<view class="nav">
				<view class="nav_item" @tap="goIndividual">
					<image class="nav_img" src="https://cdn.s.bld365.com/mangguowode_index_nav_img_01.png"></image>
					<view class="nav_title">
						<text v-if="userInfo && userInfo.userAuthInfo && userInfo.userAuthInfo.REAL_NAME">实名信息</text>
						<text v-else>实名认证</text>
					</view>
				</view>
				<view class="nav_item" @tap="goReward">
					<image class="nav_img" src="https://cdn.s.bld365.com/mangguowode_index_nav_img_02.png"></image>
					<view class="nav_title">酬金记录</view>
				</view>
				<view class="nav_item" @tap="goMyinfo">
					<image class="nav_img" src="https://cdn.s.bld365.com/mangguowode_index_nav_img_03.png"></image>
					<view class="nav_title">个人信息</view>
				</view>
			</view>
		</view>

		<!-- 酬金记录 -->
		<view class="list"></view>
	</view>
</template>

<script>
import mpCompleteNavbarHeight from '@/components/mp-completeNavbarHeight.vue';
import { userInfoKey } from '@/utils/const.js';
//services
import { getUserInfoAjax } from '@/pages/individual/pspcard/utils.js';

export default {
	data() {
		return {
			userInfo: null
		};
	},
	//是否实名
	haveRealname() {
		return this.userInfo && this.userInfo.userAuthInfo && this.userInfo.userAuthInfo.REAL_NAME;
	},
	components: {
		mpCompleteNavbarHeight
	},
	/**
	 * 周期
	 */
	async onLoad() {
		//ajax获取userInfo
		let userInfo = uni.getStorageSync(userInfoKey);
		uni.showLoading({ title: '请稍候...', mask: true });
		await getUserInfoAjax(userInfo.TOKEN);
		uni.hideLoading();

		let userInfo2 = uni.getStorageSync(userInfoKey);
		this.userInfo = userInfo2;
	},
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
		//跳转芒果
		tiaozhuan() {},
		//nav跳转
		goIndividual() {
			uni.navigateTo({
				url: '/pages/individual/pspcard/pspcard'
			});
		},
		goReward() {
			if (!this.haveRealname) {
				uni.showToast({ title: '请先进行实名认证', icon: 'none' });
				return;
			}
			uni.navigateTo({
				url: '/pages/reward/reward_index/reward_index'
			});
		},
		goMyinfo() {
			uni.showToast({
				title: '敬请期待',
				icon: 'none'
			});
		}
		//nav跳转 end
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

.top {
	.flexCenter;
	padding: 80rpx 0 124rpx;
	background-color: @primaryColor;
	position: relative;
	.box {
		width: 106rpx;
		height: 106rpx;
		margin: 0 24rpx 0 30rpx;
		border-radius: 50%;
		overflow: hidden;
		.head {
			.wh100;
		}
	}
	.content {
		.flex1;
		color: #fff;
		.name {
			font-size: 33rpx;
		}
	}
	.tiao {
		.flexCenter;
		.flexJCenter;
		position: absolute;
		top: 88rpx;
		right: 30rpx;
		box-sizing: border-box;
		width: 211rpx;
		height: 50rpx;
		border: 1rpx solid #fff;
		border-radius: 12rpx;
		color: #fff;
	}
}

.container {
	margin: -72rpx 30rpx 0;
	background-color: #fff;
	border-radius: 10rpx;
	overflow: hidden;
	position: relative;
	z-index: 2;
}

// 导航
.nav {
	.flexCenter;
	.flexAround;
	.nav_item {
		.flex1;
		.flexColumn;
		margin: 27rpx 0;
		padding: 26rpx 0;
		border-right: 1rpx solid #d7d6d6;
		&:last-child {
			border-right: none;
		}
		.nav_img {
			width: 50rpx;
			height: 48rpx;
			margin-bottom: 14rpx;
		}
		.nav_title {
			font-size: 23rpx;
			color: #4a4a4a;
		}
	}
}
</style>
