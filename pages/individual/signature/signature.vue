<template>
	<view>
		<step active="2"></step>

		<view class="sign">
			<view class="title">请输入签名</view>
			<signature ref="signature" canvasId="signature" @clear="clear" @save="save"></signature>
			<view class="ctrl"><view class="chongzhi" @tap="chongzhi">重置</view></view>
		</view>

		<!-- btn -->
		<view class="btn" @tap="clickNext">确认提交并签字</view>
	</view>
</template>

<script>
import step from '@/components/step.vue';
import signature from '@/components/signature.vue';
import { globalHost } from '@/utils/utils.js';
import allApiStr from '@/utils/allApiStr.js';
import requestw from '@/utils/requestw.js';
import { mchCodeKey, userInfoKey, companyCodeKey } from '@/utils/consts.js';

export default {
	data() {
		return {
			token: null,
			base64: ''
		};
	},
	components: {
		step,
		signature
	},
	/**
	 * 周期
	 */
	onLoad() {
		// token
		let userInfo = uni.getStorageSync(userInfoKey);
		this.token = userInfo && userInfo.TOKEN ? userInfo.TOKEN : null;
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
		//上传手写签名
		uploadImgAjax(base64) {
			return new Promise(resolve => {
				let postData = {
					fileName: new Date().getTime() + '.jpg',
					fieldType: 'other',
					ocrType: 'other'
				};
				uni.uploadFile({
					url: globalHost() + allApiStr.ocrApi,
					filePath: base64,
					name: 'file',
					formData: postData,
					success: res => {
						let data = null;
						try {
							data = JSON.parse(res.data);
						} catch (e) {}
						resolve(data);
					}
				});
			});
		},
		//保存手写签名图片url
		saveSignatureUrl(fileUrl) {
			return new Promise(async resolve => {
				let res = await requestw({
					url: allApiStr.saveSignatureApi,
					data: {
						handWriteSignature: fileUrl,
						companyCode: uni.getStorageSync(companyCodeKey),
						//2020.02.24新加参数
						mchCode: uni.getStorageSync(mchCodeKey)
					}
				});
				resolve(res.data);
			});
		},
		//签约ajax
		signAjax() {
			return new Promise(async resolve => {
				let postData = {
					merchantCode: uni.getStorageSync(mchCodeKey),
					token: this.token
				};
				let res = await requestw({
					url: allApiStr.signApi,
					data: postData
				});
				console.log(res.data);
				resolve(res.data);
			});
		},
		//
		//
		//
		//
		async saveFunc(base64) {
			const self = this;
			uni.showModal({
				title: '提示',
				content: '确认提交手写签名并签约？',
				success: async res => {
					if (res.confirm) {
						self.base64 = base64;

						uni.showLoading({
							title: '请稍候...',
							mask: true
						});
						console.log('开始请求');
						//一、上传图片
						let res1 = await self.uploadImgAjax(base64);
						console.log(res1);
						if (!res1 || res1.resultCode !== '200') {
							uni.showToast({
								title: res1 && res1.systemMessage ? res1.systemMessage : '操作失败',
								icon: 'none',
								mask: true
							});
							return;
						}

						//二、保存图片url
						let res2 = await self.saveSignatureUrl(res1.value.FILE_URL);
						console.log(res2);
						if (res2.resultCode !== '200') {
							uni.showToast({
								title: res2.systemMessage ? res2.systemMessage : '操作失败',
								icon: 'none',
								mask: true
							});
							return;
						}

						// //三、签约  // 2020.02.24改成后端调用
						// let res3 = await self.signAjax();
						// console.log(res3);
						// if (res3.resultCode !== '200') {
						// 	uni.showToast({
						// 		title: res3.systemMessage ? res3.systemMessage : '操作失败',
						// 		icon: 'none',
						// 		mask: true
						// 	});
						// 	return;
						// }

						uni.hideLoading();
						uni.showModal({
							title: '提示',
							content: '签约成功',
							showCancel: false,
							success: () => {
								//四、跳转
								uni.navigateTo({
									url: '/pages/individual/result/result'
								});
							}
						});
					}
				}
			});
		},
		save(base64) {
			this.saveFunc(base64);
		},
		clear() {},
		chongzhi() {
			this.base64 = '';
			this.$refs.signature.clear();
		},
		clickNext() {
			console.log(this.base64);
			if (this.base64) {
				this.saveFunc(this.base64);
			} else {
				this.$refs.signature.save();
			}
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

.sign {
	background-color: #fff;

	.title {
		.flexCenter;
		height: 85rpx;
		padding: 0 24rpx;
		border-bottom: 1rpx solid #d7d6d6;
		font-size: 28rpx;
	}

	.ctrl {
		.flexCenter;
		justify-content: flex-end;
		height: 85rpx;
		padding: 0 60rpx;
		border-top: 1rpx solid #d7d6d6;
		color: @primaryColor;
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
</style>
