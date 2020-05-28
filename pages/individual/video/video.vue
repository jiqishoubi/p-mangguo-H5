<template>
	<view>
		<step active="1"></step>

		<view class="img">
			<image class="bg_img" src="https://cdn.s.bld365.com/mangguovideo_bg_img.png"></image>
			<view class="p">正面平视手机、保证光线充足</view>
			<view class="p">请勿遮挡面部</view>
		</view>

		<view class="tips">
			<view class="item">
				<view class="order">1</view>
				<view>牢记验证码，点击开始录制</view>
			</view>
			<view class="line"></view>
			<view class="item">
				<view class="order">2</view>
				<view>开启前置摄像头，用普通话朗读数字</view>
			</view>
			<view class="line"></view>
			<view class="item">
				<view class="order">3</view>
				<view>完成录制，等待验证结果</view>
			</view>
		</view>

		<view style="height: 160rpx;"></view>

		<!-- btn -->
		<view class="btn" @tap="clickNext">获取验证码</view>

		<!-- ***********************模态*********************** -->
		<uni-popup ref="countModal" :animation="false" :maskClick="false">
			<view class="modal_count">
				<view class="title">请牢记一下验证码</view>
				<view class="desc">
					<view>
						本次验证码将于
						<text class="red">60</text>
						秒后过期
					</view>
					<view>
						用普通话朗读数字，视频时长
						<text class="red">4秒</text>
						以内最佳
					</view>
				</view>
				<!-- 数字 -->
				<view class="count_wrap">
					<view v-for="(item, index) in countList" :key="index" class="count">{{ item }}</view>
				</view>
				<button class="luzhiBtn" hover-class="luzhiBtn_active" @tap="luzhi">记住了，开始录制</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
import { uniPopup } from '@dcloudio/uni-ui'
import step from '@/components/step.vue'
import requestw from '@/utils/requestw.js'
import allApiStr from '@/utils/allApiStr.js'

export default {
	data() {
		return {
			count: '',
			count_session_id: ''
		}
	},
	computed: {
		countList() {
			return this.count ? this.count.split('') : []
		}
	},
	components: {
		uniPopup,
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
		async clickNext() {
			let res = await this.getVoiceCount()
			if (res.code !== 200) {
				uni.showToast({
					title: res.systemMessage,
					icon: 'none',
					mask: true
				})
				return
			}

			this.count = res.data.code
			this.count_session_id = res.data.session_id
			this.$refs.countModal.open()
		},
		//获取语音码
		getVoiceCount() {
			return new Promise(async resolve => {
				this.count = ''
				this.count_session_id = ''
				uni.showLoading({
					title: '请稍候...',
					mask: true
				})
				let res = await requestw({
					url: allApiStr.getVoiceCountApi
				})
				uni.hideLoading()
				resolve(res.data)
			})
		},
		//录制视频
		luzhi() {
			const self = this
			uni.chooseVideo({
				sourceType: ['camera'],
				compressed: true,
				maxDuration: 5, //最长5秒
				camera: 'front', //APP、微信小程序
				success: res => {
					if (res && res.errMsg.indexOf(':ok') > -1) {
						let tempFilePath = res.tempFilePath
						let fileName = res.name
						self.uploadVideo(tempFilePath, fileName)
					}
				}
			})
		},
		//上传视频（百度H5活体校验）
		uploadVideo(tempFilePath, fileName) {
			const self = this
			uni.showLoading({
				title: '请稍候...',
				mask: true
			})
			uni.uploadFile({
				url: allApiStr.checkVideoApi,
				filePath: tempFilePath,
				name: 'file',
				fileType: 'video',
				formData: {
					session_id: self.count_session_id,
					_csrf: 'safe'
				},
				header: {
					// "Content-type": "multipart/form-data"
				},
				success: res => {
					uni.hideLoading()

					self.$refs.countModal.close()

					//待着结果json跳转
					let obj = {
						result: res.data,
						tempFilePath,
						fileName
					}
					uni.setStorageSync('mangguoVideoResult', obj)
					uni.navigateTo({
						url: `/pages/individual/videoresult/videoresult`
					})
				},
				fail: err => {
					console.log(err)
					uni.showToast({
						title: '网络超时fail'
					})
				}
				// complete: (e) => {
				// 	console.log(e)
				// 	uni.showToast({
				// 		title: 'ios complete'
				// 	})
				// }
			})
		}
	}
}
</script>

<style lang="less">
@import '~utils/utils.less';

.img {
	.flexColumn;
	padding: 58rpx 0;
	background-color: #f5f5f5;
	font-size: 25rpx;
	color: #999999;

	.bg_img {
		width: 290rpx;
		height: 426rpx;
		margin-bottom: 25rpx;
	}

	.p {
		margin-bottom: 4rpx;
	}
}

// tips
.tips {
	font-size: 25rpx;
	color: #333;
	padding-top: 66rpx;
	padding-left: 150rpx;

	.item {
		.flexCenter;

		.order {
			.flexCenter;
			.flexJCenter;
			width: 29rpx;
			height: 29rpx;
			border-radius: 50%;
			border: 1rpx solid @primaryColor;
			color: @primaryColor;
			margin-right: 18rpx;
		}
	}

	.line {
		height: 30rpx;
		border-left: 1rpx dotted @primaryColor;
		margin: 6rpx 0 6rpx 15rpx;
	}
}

.btn {
	.flexCenter;
	.flexJCenter;
	height: 89rpx;
	background-color: @primaryColor;
	font-size: 28rpx;
	color: #fff;
	position: fixed;
	width: 100%;
	left: 0;
	bottom: 0;
	z-index: 11;
}

// coutnModal
.modal_count {
	color: #333;
	.flexColumn;
	width: 580rpx;
	background-color: #fff;

	.title {
		font-size: 33rpx;
		margin: 38rpx 0;
	}

	.desc {
		.flexColumn;
		color: #666;
		margin-bottom: 50rpx;
	}

	.count_wrap {
		.flexCenter;
		.flexJCenter;
		flex-wrap: wrap;

		.count {
			.flexCenter;
			.flexJCenter;
			width: 72rpx;
			height: 85rpx;
			border-radius: 6rpx;
			border: 1rpx solid #bbbbbb;
			font-size: 79rpx;
			margin: 6rpx;
		}
	}

	.luzhiBtn {
		.flexCenter;
		.flexJCenter;
		width: 495rpx;
		height: 85rpx;
		margin: 70rpx 0 49rpx;
		background-color: @primaryColor;
		color: #fff;
		font-size: 33rpx;
	}

	.luzhiBtn_active {
		background-color: @hoverColor;
	}
}

.red {
	color: #ff0000;
}
</style>
