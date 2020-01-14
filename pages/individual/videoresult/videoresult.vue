<template>
	<view>
		<step active="1"></step>

		<!-- result -->
		<view class="result">
			<view class="box_wrap">
				<view class="box"><image class="img" :src="flag ? imgSrc : errorImg" mode="aspectFit"></image></view>
				<view class="box_title">
					检测结果：
					<text v-if="flag" style="color:green;">成功</text>
					<text v-else style="color:red;">失败</text>
				</view>
			</view>

			<!-- 具体 -->
			<view class="desc">
				<view>
					<text class="label">活体分值</text>
					{{ data ? data.score : 0 }}
				</view>
				<view>
					<text class="label">应读数字</text>
					{{ data ? data.code.create : 0 }}
				</view>
				<view>
					<text class="label">检测数字</text>
					{{ data ? data.code.identify : 0 }}
				</view>
			</view>
		</view>

		<!-- btn -->
		<view class="btn_wrap">
			<button class="btn btn1" hover-class="btn1_active" @tap="chongpai">重拍</button>
			<button v-if="flag" class="btn btn2" hover-class="btn2_active" @tap="nextStep">完成</button>
		</view>
	</view>
</template>

<script>
import step from '@/components/step.vue';

export default {
	data() {
		return {
			threshold: 0.3, //阈值
			data: null,
			errorImg: 'https://cdn.s.bld365.com/mangguovideoresult_errorimg.png',
			imgSrc: ''
		};
	},
	computed: {
		//是否成功
		flag() {
			return this.data && this.data.score > this.threshold && this.data.code.create == this.data.code.identify;
		}
	},
	components: {
		step
	},
	/**
	 * 周期
	 */
	onLoad(option) {
		let result;
		try {
			result = JSON.parse(option.result);
		} catch (e) {
			return;
		}

		console.log(result);
		if (result.code !== 200) {
			uni.showModal({
				title: '提示',
				content: result.systemMessage,
				showCancel: false,
				success: () => {}
			});
			return;
		}

		this.data = result.data;

		this.imgSrc = 'data:image/jpeg;base64,' + result.data.pic_list[0].pic;
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
		chongpai() {
			uni.navigateBack();
		},
		nextStep() {
			uni.navigateTo({
				url: '/pages/individual/signature/signature'
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

.result {
	padding: 40rpx 0;
	background-color: #fff;
	.box_wrap {
		.flexColumn;
		.box {
			width: 426rpx;
			height: 426rpx;
			.img {
				.wh100;
			}
		}
		.box_title {
			margin-top: 33rpx;
			font-size: 26rpx;
			color: #333;
		}
	}
	.desc {
		color: #999;
		padding-left: 280rpx;
		line-height: 42rpx;
		margin-top: 53rpx;
		.label {
			margin-right: 24rpx;
		}
	}
}

.btn_wrap {
	.flexCenter;
	.flexJCenter;
	margin: 60rpx 0;
	.btn {
		.flexCenter;
		.flexJCenter;
		box-sizing: border-box;
		width: 339rpx;
		height: 85rpx;
		margin: 0 6rpx;
		font-size: 33rpx;
		border-radius: 12rpx;
	}
	.btn1 {
		border: 1rpx solid #0d81f1;
		color: #0d81f1;
		background-color: #fff;
	}
	.btn2 {
		color: #fff;
		background-color: #0d81f1;
	}
	.btn1_active {
		background-color: #eaeaea;
	}
	.btn2_active {
		background-color: #0a7ae6;
	}
}
</style>
