<template>
	<view>
		<step active="3"></step>

		<view class="content">
			<view class="box"><image class="img" :src="imgSrc" mode="aspectFit"></image></view>
			<!-- <view class="large" @tap="lookLarge">
				<image class="large_icon" src="https://cdn.s.bld365.com/mangguoicon_search.png"></image>
				查看大图
			</view> -->
		</view>

		<button class="btn" hover-class="btn_active" @tap="saveLocal">完成</button>
	</view>
</template>

<script>
import step from '@/components/step.vue';

export default {
	data() {
		return {
			imgSrc: 'https://cdn.s.bld365.com/mangguoresult_content_img.png'
		};
	},
	components: {
		step
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
		//查看大图
		lookLarge() {
			const self = this;
			uni.previewImage({
				urls: [self.imgSrc]
			});
		},
		saveLocal() {
			uni.reLaunch({
				url: '/pages/wode/wode_index/wode_index'
			});
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
.content {
	.flexColumn;
	padding: 46rpx 0;
	background-color: #fff;
	.box {
		width: 489rpx;
		height: 345rpx;
		.img {
			.wh100;
		}
	}
	.large {
		.flexCenter;
		.flexJCenter;
		color: #4a4a4a;
		margin-top: 20rpx;
		.large_icon {
			width: 29rpx;
			height: 29rpx;
			margin-right: 5rpx;
		}
	}
}

.btn {
	.flexCenter;
	.flexJCenter;
	margin: 53rpx 60rpx;
	height: 97rpx;
	border-radius: 12rpx;
	background-color: @primaryColor;
	color: #fff;
	font-size: 30rpx;
}
.btn_active {
	background-color: @hoverColor;
}
</style>
