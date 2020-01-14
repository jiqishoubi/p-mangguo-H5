<template>
	<view>
		<block v-if="bankcardList.length > 0">
			<view class="list">
				<view v-for="(item, index) in bankcardList" :key="index" class="card">
					<view class="box"><image class="wh100" :src="item.img" mode="aspectFit"></image></view>
					<view class="content">
						<view class="title">{{ item.title }}</view>
						<view class="type">{{ item.type }}</view>
						<view class="no">{{ item.no }}</view>
					</view>
					<!-- 解绑 -->
					<view class="jiebang" @tap="jiebang(item)">解绑银行卡</view>
				</view>
			</view>
		</block>
		<view v-else class="nocard" @tap="addCard"><image class="wh100" src="https://cdn.s.bld365.com/mangguobankcard_nobankcard_btn.png"></image></view>

		<!-- ************************模态************************ -->
		<uni-popup ref="confirmjiebang" :animation="false" :maskClick="false">
			<view class="modal">
				<view class="title">确定解绑此银行卡吗？</view>
				<view class="btn_wrap">
					<button class="btn btn1" hover-class="btn1_active" @tap="confirm">确定</button>
					<button class="btn btn2" hover-class="btn2_active" @tap="cancel">取消</button>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { uniPopup } from '@dcloudio/uni-ui';

export default {
	data() {
		return {
			bankcardList: [
				{
					title: '招商银行',
					type: '储蓄卡',
					no: '1212',
					img: 'http://t8.baidu.com/it/u=1484500186,1503043093&fm=79&app=86&f=JPEG?w=1280&h=853'
				}
			],

			//modal
			lookingItem: null
		};
	},
	components: {
		uniPopup
	},
	methods: {
		jiebang(item) {
			this.lookingItem = item;
			this.$refs.confirmjiebang.open();
		},
		confirm() {},
		cancel() {
			this.lookingItem = null;
			this.$refs.confirmjiebang.close();
		},
		// 添加银行卡
		addCard() {
			uni.navigateTo({
				url:'/pages/bankcard/addbankcard/addbankcard'
			})
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

// 银行卡
.list {
	padding-top: 1rpx;
}
.card {
	.flex;
	margin: 24rpx 28rpx;
	background-color: #fff;
	border-radius: 7rpx;
	padding: 27rpx 35rpx;
	position: relative;
	.box {
		width: 88rpx;
		height: 88rpx;
		border-radius: 50%;
		overflow: hidden;
		margin-right: 24rpx;
	}
	.content {
		.flex1;
		.title {
			color: #4a4a4a;
			font-size: 33rpx;
			margin: 3rpx 0 2rpx;
		}
		.type {
			color: #9b9b9b;
			font-size: 25rpx;
		}
		.no {
			margin-top: 33rpx;
			color: #4a4a4a;
			font-size: 33rpx;
		}
	}
	// 解绑
	.jiebang {
		color: #9b9b9b;
		font-size: 22rpx;
		position: absolute;
		top: 30rpx;
		right: 35rpx;
	}
}
.nocard {
	height: 139rpx;
	margin: 0 28rpx;
	padding-top: 25rpx;
}

// 模态
.modal {
	.flexColumn;
	.flexJCenter;
	width: 694rpx;
	height: 365rpx;
	background-color: #fff;
	border-radius: 6rpx;
	.title {
		color: #4a4a4a;
		font-size: 35rpx;
	}
	.btn_wrap {
		.flexCenter;
		.flexBetween;
		width: 100%;
		margin-top: 98rpx;
		padding: 0 36rpx;
		.btn {
			.flexCenter;
			.flexJCenter;
			box-sizing: border-box;
			width: 278rpx;
			height: 96rpx;
			border-radius: 14rpx;
		}
		.btn1 {
			background-color: @primaryColor;
			color: #fff;
		}
		.btn1_active {
			background-color: @hoverColor;
		}
		.btn2 {
			background-color: #fff;
			color: @primaryColor;
			border: 1rpx solid @primaryColor;
		}
		.btn2_active {
			background-color: @hoverWhite;
		}
	}
}
</style>
