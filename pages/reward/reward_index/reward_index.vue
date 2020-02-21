<template>
	<view>
		<view class="top">
			<view class="total">
				<view class="count" style="font-size: 56rpx;">0.00</view>
				<view class="desc">累计酬金（元）</view>
			</view>

			<view class="content">
				<view class="item">
					<view class="count" style="font-size:35rpx;">0.00</view>
					<view class="desc">今日酬金（元）</view>
				</view>
				<view class="line"></view>
				<view class="item">
					<view class="count" style="font-size:35rpx;">0.00</view>
					<view class="desc">本月酬金（元）</view>
				</view>
			</view>
		</view>

		<!-- 酬金明细 -->
		<view class="list">
			<view class="title">
				<view class="flexCenter">
					<view class="rect"></view>
					<view class="title_text">酬金明细</view>
				</view>
				<view v-if="list.length > 0" class="flexCenter more" @tap="goMore">
					<view>查看全部</view>
					<view style="position: relative;top: 2rpx;"><uni-icons type="arrowright" color="#9B9B9B"></uni-icons></view>
				</view>
			</view>

			<block v-if="list.length > 0">
				<reward-item v-for="(item, index) in list" :key="index" :bank="item.bank" :no="item.no" :date="item.date" :count="item.count"></reward-item>
			</block>
			<view v-else style="text-align: center;margin-top: 40rpx;">暂无数据</view>
		</view>
	</view>
</template>

<script>
import { uniIcons } from '@dcloudio/uni-ui';
import rewardItem from '@/components/reward-item.vue';

export default {
	data() {
		return {
			list: [
				// {
				// 	bank: '舒服舒服',
				// 	no: '多发点',
				// 	count: '是是是',
				// 	date: '发发发'
				// }
			]
		};
	},
	components: {
		uniIcons,
		rewardItem
	},
	methods: {
		goMore() {
			uni.navigateTo({
				url: '/pages/reward/reward_list/reward_list'
			});
		}
		// clickItem(item){
		// 	console.log(item)
		// }
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

.top {
	margin-bottom: 33rpx;
	padding: 37rpx 0;
	background-color: @primaryColor;
	color: #fff;
	.count {
		font-weight: bold;
	}
	.total {
		.flexColumn;
		margin-bottom: 44rpx;
	}
	.content {
		.flex;
		align-items: flex-end;
		.item {
			.flex1;
			.flexColumn;
		}
		.line {
			width: 0;
			height: 32rpx;
			border-width: 1rpx;
			border-style: solid;
			border-color: transparent #fff transparent transparent;
		}
	}
}

// 酬金明细
.list {
	padding: 0 28rpx;
	.title {
		.flexCenter;
		.flexBetween;
		.rect {
			width: 8rpx;
			height: 33rpx;
			margin-right: 7rpx;
			background-color: @primaryColor;
		}
		.title_text {
			color: #4a4a4a;
			font-size: 33rpx;
		}
		.more {
			color: #9b9b9b;
		}
	}
}
</style>
