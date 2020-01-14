<template>
	<view>
		<view class="tab" :style="'top:' + tabTopPX + 'PX'">
			<view class="tab_item" :class="{ active: activeIndex == 0 }" @tap="cutTab(0)">待签约</view>
			<view class="tab_item" :class="{ active: activeIndex == 1 }" @tap="cutTab(1)">已签约</view>
		</view>

		<view class="list">
			<block v-if="list.length > 0">
				<view v-for="(item, index) in list" :key="index" class="sign_item">
					<view class="title">{{ item.companyName }}</view>
					<view class="container">
						<view class="content">
							<view style="margin-bottom: 5rpx;">《{{ item.desc }}》</view>
							<view>{{ item.date }}</view>
						</view>
						<view v-if="activeIndex == 0" class="signbtn" @tap="goPDF(item)">去签约</view>
						<view v-if="activeIndex == 1" class="signbtn" @tap="goPDF(item)">查看</view>
					</view>
				</view>
			</block>
			<view v-else>暂无数据</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			tabTopPX: 0,
			activeIndex: 0,
			list: [
				{
					companyName: '公司',
					desc: '是否',
					date: '顺丰速递发'
				}
			]
		};
	},
	/**
	 * 周期
	 */
	onLoad() {
		// #ifdef H5
		this.tabTop();
		// #endif
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
		//H5适配导航栏高度
		tabTop() {
			let res = uni.getSystemInfoSync();
			this.tabTopPX = res.windowTop ? res.windowTop : 0;
		},
		cutTab(index) {
			this.activeIndex = index;
		},
		goPDF(item) {
			console.log(item);
			uni.navigateTo({
				url:'/pages/sign/signpddf/signpddf'
			})
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

.tab {
	.flexCenter;
	.flexAround;
	height: 96rpx;
	border-top: 1rpx solid #cecece;
	border-bottom: 1rpx solid #cecece;
	background-color: #fff;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	.tab_item {
		.flexCenter;
		.flexJCenter;
		box-sizing: border-box;
		height: 100%;
		padding: 0 18rpx;
		font-size: 28rpx;
		cursor: pointer;
		&.active {
			color: @primaryColor;
			border-bottom: 4rpx solid @primaryColor;
		}
	}
}

// 列表
.list {
	padding-top: 96rpx;
	.sign_item {
		margin: 28rpx 0;
		padding: 0 28rpx;
		background-color: #fff;
		.title {
			.flexCenter;
			height: 96rpx;
			border-bottom: 1rpx solid #cecece;
			color: #333333;
			font-size: 33rpx;
			font-weight: bold;
		}
		.container {
			.flexCenter;
			.content {
				.flex1;
				padding: 28rpx 0;
				color: #848484;
				font-size: 25rpx;
			}
			.signbtn {
				.flexCenter;
				.flexJCenter;
				width: 167rpx;
				height: 62rpx;
				border-radius: 31rpx;
				background-color: @primaryColor;
				color: #fff;
				font-size: 28rpx;
			}
		}
	}
}
</style>
