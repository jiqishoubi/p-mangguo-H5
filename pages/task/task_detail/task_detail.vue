<template>
	<view>
		<view class="container">
			<view class="title">
				<view class="title_text">超时促销员</view>
				<view class="reward">
					<text class="reward_1">100</text>
					<text class="reward_2">元/天</text>
				</view>
				<view class="tags">
					<view class="tag">日结</view>
					<view class="tag">促销</view>
					<view class="tag">30人</view>
				</view>
			</view>

			<view class="map">
				<view>华润万家超市</view>
				<view class="box"><image class="wh100" src=""></image></view>
			</view>

			<view class="date">
				<view class="range">
					<view>开始2019.06.19</view>
					<view class="line"></view>
					<view>结束2019.07.05</view>
				</view>
				<view class="time">
					<view>08:00</view>
					<view class="line"></view>
					<view>18:00</view>
				</view>
			</view>
		</view>

		<view class="container">
			<view class="titlew">
				<view>需求描述</view>
				<view>兼职招聘</view>
			</view>
			<view class="content"></view>
		</view>

		<view class="container">
			<view class="titlew"><view>需求描述</view></view>
			<view class="content">
				<view class="box"><image class="wh100" src=""></image></view>
				<view class="company">
					<view class="name">
						<view>华润万家</view>
						<view class="renzheng"></view>
					</view>
					<view class="publishtime">发布时间：2019-06-15</view>
				</view>
			</view>
		</view>

		<!-- btn -->
		<view class="btn">报名</view>
	</view>
</template>

<script>
export default {
	data() {
		return {};
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

.container {
	background-color: #fff;
	margin-bottom: 21rpx;
}

// 部分一
.title {
	padding: 0 27rpx;
	.title_text {
		color: #333333;
		font-size: 42rpx;
	}
	.reward {
		.flex;
		align-items: baseline;
		color: @primaryColor;
		.reward_1 {
			font-size: 42rpx;
			margin-right: 5rpx;
		}
		.reward_2 {
		}
	}
	.tags {
		.flexCenter;
		.tag {
			color: #9b9b9b;
			font-size: 25rpx;
			border-right: 1rpx solid #9b9b9b;
			&:last-child {
				border-right: none;
			}
		}
	}
}
</style>
