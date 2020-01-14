<template>
	<view>
		<view class="title">
			<picker mode="date" fields="month" :value="monthVal" @change="monthChange">
				<view class="select">
					{{ showMonthVal }}
					<view style="position: relative;top: 2rpx;"><uni-icons type="arrowdown"></uni-icons></view>
				</view>
			</picker>
			<view class="leiji">累计：{{ 140 }}</view>
		</view>

		<!-- list -->
		<view class="list">
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
import { formatDate } from '@/utils/utils.js';

export default {
	data() {
		return {
			monthVal: '',
			list: [
				// {
				// 	bank: '',
				// 	no: '',
				// 	date: '',
				// 	count: ''
				// }
			]
		};
	},
	computed: {
		showMonthVal() {
			let now = formatDate(new Date(), 'yyyy-MM');
			return now == this.monthVal ? '本月' : this.monthVal;
		}
	},
	components: {
		uniIcons,
		rewardItem
	},
	/**
	 * 周期
	 */
	onLoad() {
		this.monthVal = formatDate(new Date(), 'yyyy-MM');
	},
	onShow() {},
	onReady() {},
	onHide() {},
	onUnload() {},
	onPullDownRefresh() {},
	onReachBottom() {},
	onPageScroll() {},
	onBackPress() {},
	methods: {
		monthChange(e) {
			this.monthVal = e.detail.value;
		}
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

.title {
	.flexCenter;
	.flexBetween;
	height: 125rpx;
	padding: 0 28rpx;
	border-bottom: 1rpx solid #cecece;
	.select {
		.flexCenter;
		.flexJCenter;
		width: 165rpx;
		height: 50rpx;
		border-radius: 25rpx;
		background-color: #fff;
	}
	.leiji {
		color: #4a4a4a;
		font-size: 29rpx;
	}
}

.list {
	padding: 0 28rpx;
}
</style>
