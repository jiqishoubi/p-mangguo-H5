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
				<view class="box_title">
					网络状态：
					<text>{{ baiduMsg }}</text>
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
import step from '@/components/step.vue'
import requestw from '@/utils/requestw.js'
import allApiStr from '@/utils/allApiStr.js'
import { globalHost } from '@/utils/utils.js'

export default {
	data() {
		return {
			errorImg: 'https://cdn.s.bld365.com/mangguovideoresult_errorimg.png',
			threshold: 0.3, //阈值

			data: null,
			imgSrc: '',
			tempFilePath: '',

			baiduMsg: ''
		}
	},
	computed: {
		//是否成功
		flag() {
			return this.data && this.data.score > this.threshold && this.data.code.create == this.data.code.identify
		}
	},
	components: {
		step
	},
	/**
	 * 周期
	 */
	onLoad(option) {
		let mangguoVideoResult = uni.getStorageSync('mangguoVideoResult')
		let result
		try {
			result = JSON.parse(mangguoVideoResult.result)
		} catch (e) {
			uni.showModal({
				title: '提示',
				content: JSON.stringify(e),
				showCancel: false,
				success: () => {}
			})
			return
		}

		if (result.code !== 200) {
			uni.showModal({
				title: '提示',
				content: result.systemMessage,
				showCancel: false,
				success: () => {}
			})
			return
		}

		console.log(result)
		this.data = result.data
		this.baiduMsg = result.baiduMsg
		this.imgSrc = 'data:image/jpeg;base64,' + result.data.pic_list[result.data.pic_list.length - 1].pic
		this.tempFilePath = mangguoVideoResult.tempFilePath
		this.fileName = mangguoVideoResult.fileName
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
			uni.redirectTo({
				url: '/pages/individual/video/video'
			})
		},
		//上传视频到我们自己的服务器
		uploadVideo() {
			const self = this
			return new Promise(resolve => {
				let postData = {
					fileName: self.fileName,
					fieldType: 'other',
					ocrType: 'other'
				}
				uni.uploadFile({
					url: globalHost() + allApiStr.ocrApi,
					filePath: self.tempFilePath,
					name: 'file',
					formData: postData,
					success: res => {
						let data = null
						try {
							data = JSON.parse(res.data)
						} catch (e) {}
						resolve(data)
					}
				})
			})
		},
		// 保存结果
		saveLiveResult(fileUrl) {
			return new Promise(async resolve => {
				let postData = {
					score: this.data && this.data.score ? this.data.score : null, //   分数
					liveCaptcha: this.data && this.data.code && this.data.code.create ? this.data.code.create : null, // 检测数字
					checkVideoUrl: fileUrl // 视频地址
				}
				let res = await requestw({
					url: allApiStr.saveLiveResultApi,
					data: postData
				})
				resolve(res)
			})
		},
		async nextStep() {
			uni.showLoading({ title: '请稍候...', mask: true })
			let res1 = await this.uploadVideo()
			if (!res1 || res1.resultCode !== '200') {
				uni.showToast({ title: res1.systemMessage ? res1.systemMessage : '上传视频失败', icon: 'none', mask: true })
				return
			}

			let res2 = await this.saveLiveResult(res1.value.FILE_URL)
			if (res2.data.resultCode !== '200') {
				uni.showToast({ title: res2.data.systemMessage ? res2.data.systemMessage : '保存活体检测信息失败', icon: 'none', mask: true })
				return
			}

			uni.hideLoading()
			uni.navigateTo({
				url: '/pages/individual/signature/signature'
			})
		}
	}
}
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
