<template>
	<view class="step_wrap">
		<view class="step">
			<!-- item_wrap -->
			<view class="item_wrap">
				<block v-for="(item, index) in list" :key="index">
					<view class="step_item">
						<image v-if="index <= active" class="step_icon" :src="item.activeSrc"></image>
						<image v-else class="step_icon" :src="item.src"></image>
					</view>
					<view v-if="index !== list.length - 1" class="line" :class="{ active: index <= active }"></view>
				</block>
			</view>
			<!-- title_wrap -->
			<view class="title_wrap">
				<view v-for="(item, index) in list" :key="index" class="title" :class="{ active: index <= active }">{{ item.title }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			list: [
				{
					src: 'https://cdn.s.bld365.com/mangguoindividual_step_icon_01.png',
					activeSrc: 'https://cdn.s.bld365.com/mangguoindividual_step_icon_01_active.png',
					title: '实名认证'
				},
				{
					src: 'https://cdn.s.bld365.com/mangguoindividual_step_icon_02.png',
					activeSrc: 'https://cdn.s.bld365.com/mangguoindividual_step_icon_02_active.png',
					title: '录制视频'
				},
				{
					src: 'https://cdn.s.bld365.com/mangguoindividual_step_icon_03.png',
					activeSrc: 'https://cdn.s.bld365.com/mangguoindividual_step_icon_03_active.png',
					title: '手写签名'
				},
				{
					src: 'https://cdn.s.bld365.com/mangguoindividual_step_icon_04.png',
					activeSrc: 'https://cdn.s.bld365.com/mangguoindividual_step_icon_04_active.png',
					title: '完成注册'
				}
			]
		};
	},
	props: ['active'],
	/**
	 * 周期
	 */
	beforeCreate() {},
	created() {},
	beforeMount() {
		this.second = this.limitSecond;
	},
	mounted() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {}
};
</script>

<style lang="less">
@import '~utils/utils.less';

.step_wrap{
	padding-bottom: 18rpx;
}
.step {
	.flexColumn;
	.flexJCenter;
	height: 169rpx;
	padding: 0 45rpx;
	border-top: 1rpx solid #D7D6D6;
	background-color: #fff;
	.item_wrap {
		.flexCenter;
		.flexBetween;
		.w100;
		box-sizing:border-box;
		padding: 0 16rpx;
		.step_item {
			.flexColumn;
			.step_icon {
				width: 66rpx;
				height: 66rpx;
			}
		}
		.line {
			.flex1;
			height: 2rpx;
			background-color: #d7d6d6;
			&.active {
				background-color: @primaryColor;
			}
		}
	}
	.title_wrap {
		.flexCenter;
		.flexBetween;
		.w100;
		box-sizing:border-box;
		.title {
			margin-top: 13rpx;
			color: #9b9b9b;
			&.active {
				color: @primaryColor;
			}
		}
	}
}
</style>
