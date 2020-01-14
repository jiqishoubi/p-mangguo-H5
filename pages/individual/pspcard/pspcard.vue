<template>
	<view>
		<step active="0"></step>

		<view class="tips">信息仅用于身份验证，平台保障您的信息安全</view>

		<!-- 身份证 -->
		<view class="psp">
			<!-- title -->
			<view class="top">
				<image class="top_icon" src="https://cdn.s.bld365.com/mangguopsp_icon_01.png"></image>
				<view class="top_content">
					<view class="title">请上传身份证照片</view>
					<view class="desc">拍摄身份证原件，请确保边角完整，文字清晰</view>
				</view>
			</view>

			<!-- <view class="top">
				<image class="top_icon" src="https://cdn.s.bld365.com/mangguopsp_haverealname_icon.png" mode="aspectFit"></image>
				<view class="top_content">
					<view class="title">您已通过实名认证</view>
				</view>
			</view> -->

			<!-- content -->
			<view class="content">
				<view class="psp_item">
					<view class="img_box" @tap="clickbox(0)">
						<image v-if="!photo0" class="img" src="https://cdn.s.bld365.com/mangguopsp_bgimg_01.png"></image>
						<image v-else class="photo" :src="photo0" mode="aspectFit"></image>
						<view v-if="photo0" class="chongpai" @tap.stop="clickchongpai(0)">重拍</view>
					</view>
					<view class="title">上传身份证信息面</view>
				</view>
				<view class="psp_item">
					<view class="img_box" @tap="clickbox(1)">
						<image v-if="!photo1" class="img" src="https://cdn.s.bld365.com/mangguopsp_bgimg_02.png"></image>
						<image v-else class="photo" :src="photo1" mode="aspectFit"></image>
						<view v-if="photo1" class="chongpai" @tap.stop="clickchongpai(1)">重拍</view>
					</view>
					<view class="title">上传身份证国徽面</view>
				</view>
				<view class="psp_item">
					<view class="img_box" @tap="clickbox(2)">
						<image v-if="!photo2" class="img" src="https://cdn.s.bld365.com/mangguopsp_bgimg_03.png"></image>
						<image v-else class="photo" :src="photo2" mode="aspectFit"></image>
						<view v-if="photo2" class="chongpai" @tap.stop="clickchongpai(2)">重拍</view>
					</view>
					<view class="title">本人手持身份证</view>
				</view>
				<view class="psp_item">
					<view class="img_box" @tap="clickbox(3)">
						<image v-if="!photo3" class="img" src="https://cdn.s.bld365.com/mangguopsp_bgimg_04.png"></image>
						<image v-else class="photo" :src="photo3" mode="aspectFit"></image>
						<view v-if="photo3" class="chongpai" @tap.stop="clickchongpai(3)">重拍</view>
					</view>
					<view class="title">本人免冠照</view>
				</view>
				<view class="psp_item">
					<view class="img_box" @tap="clickbox(4)">
						<image v-if="!photo4" class="img" src="https://cdn.s.bld365.com/mangguopsp_bgimg_05.png"></image>
						<image v-else class="photo" :src="photo4" mode="aspectFit"></image>
						<view v-if="photo4" class="chongpai" @tap.stop="clickchongpai(4)">重拍</view>
					</view>
					<view class="title">个人征信报告</view>
				</view>
			</view>
		</view>

		<!-- form -->
		<view class="form">
			<view class="form_item">
				<view class="label">
					姓
					<text class="colornone">一一</text>
					名
				</view>
				<input class="input" placeholder="姓名" v-model="pspname" />
			</view>
			<view class="form_item">
				<view class="label">身份证号</view>
				<input class="input" placeholder="身份证号" v-model="pspcard" />
			</view>
			<view class="form_item" @tap="openDate">
				<view class="label">失效日期</view>
				<input class="input" placeholder="失效日期" v-model="pspdate" disabled />
			</view>
			<view class="form_item">
				<view class="label">银行卡号</view>
				<input class="input" placeholder="请输入任意一张银行卡卡号" v-model="bankcard" />
			</view>
			<view class="form_item">
				<view class="label">手机号码</view>
				<input class="input" placeholder="请输入手机号码" type="number" v-model="phone" />
			</view>
			<view class="form_item">
				<view class="label">
					验
					<text class="colornone">a</text>
					证
					<text class="colornone">a</text>
					码
				</view>
				<input class="input" placeholder="请输入验证码" type="number" v-model="smscode" />
				<getsmsbtn limitSecond="60" allUrl="" phoneNumber="" styleStr="color:#4185f4;"></getsmsbtn>
			</view>
		</view>

		<!-- 同意 -->
		<view class="tongyi">
			<checkbox class="pspcard_tongyi_checkbox" :checked="checkboxVal" color="#4185f4" />
			<view class="content">
				本人已阅读并同意
				<text class="hover">《注册协议》</text>
				<text class="hover">《某某三方协议》</text>
				全部条款，知晓提交验证码即代表本人真是意愿签署
			</view>
		</view>

		<view style="height: 200rpx;"></view>

		<!-- btn -->
		<view class="btn" :class="{ active: btnActive }" @tap="clickNext">下一步</view>

		<!-- ****************模态**************** -->
		<uni-calendar ref="calendar" :insert="false" :date="pspdate" @confirm="pspDateChange"></uni-calendar>
	</view>
</template>

<script>
import { uniCalendar } from '@dcloudio/uni-ui';
import step from '@/components/step.vue';
import getsmsbtn from '@/components/getsmsbtn.vue';
import { globalHost } from '@/utils/utils.js';
import requestw from '@/utils/requestw.js';
import allApiStr from '@/utils/allApiStr.js';

export default {
	data() {
		return {
			//photo
			photo0: '',
			photo1: '',
			photo2: '',
			photo3: '',
			photo4: '',
			// form
			pspname: '',
			pspcard: '',
			pspdate: '', //失效日期

			bankcard: '',
			phone: '',
			smscode: '',

			//tongyi
			checkboxVal: true
		};
	},
	computed: {
		btnActive() {
			let flag = true;
			if (!this.photo0 || !this.photo1 || !this.photo2 || !this.photo3 || !this.pspname || !this.pspcard || !this.pspdate) {
				flag = false;
			}
			return flag;
		}
	},
	components: {
		uniCalendar,
		step,
		getsmsbtn
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
		clickbox(index) {
			if (this['photo' + index]) {
				//放大查看
				uni.previewImage({
					urls: [this['photo' + index]],
					longPressActions: true
				});
			} else {
				this.openChooseImage(index);
			}
		},
		openChooseImage(index) {
			const self = this;
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				success: res => {
					console.log(res);
					if (res.errMsg && res.errMsg.indexOf(':ok') > -1 && res.tempFilePaths && res.tempFilePaths[0]) {
						let tempFilePath = res.tempFilePaths[0];
						let file = res.tempFiles[0];

						self.ocrAjax(tempFilePath, file, index);
					}
				}
			});
		},
		ocrAjax(tempFilePath, file, index) {
			const self = this;
			this['photo' + index] = '';
			let postData = {
				fileName: file.name,
				fieldType: index == 0 ? 'PSPT_POSITIVE' : 'PSPT_NEGATIVE',
				ocrType: index == 0 ? 'ID_CARD_FRONT' : 'ID_CARD_BACK'
			};
			uni.showLoading({
				title: '请稍候...',
				mask: true
			});
			uni.uploadFile({
				url: globalHost() + allApiStr.ocrApi,
				filePath: tempFilePath,
				name: 'file',
				formData: postData,
				success: res => {
					uni.hideLoading();
					let data;
					try {
						data = JSON.parse(res.data);
					} catch (e) {
						console.log(e);
						uni.showToast({
							title: 'OCR识别失败，请稍后再试',
							icon: 'none',
							mask: true
						});
						return;
					}

					self.ocrCallback(index, data);
				}
			});
		},
		ocrCallback(index, res) {
			console.log(res);
			if (!res || res.resultCode !== '200' || !res.value || !res.value.OCR_DATA || (index == 0 ? !res.value.OCR_DATA['姓名'] : !res.value.OCR_DATA['失效日期'])) {
				uni.showToast({
					title: 'OCR识别失败' + res.systemMessage,
					icon: 'none',
					mask: true
				});
				return;
			}

			if (res.value.OCR_DATA['姓名']) {
				this.pspname = res.value.OCR_DATA['姓名'];
				this.pspcard = res.value.OCR_DATA['公民身份号码'];
			}
			if (res.value.OCR_DATA['失效日期']) {
				let str = res.value.OCR_DATA['失效日期'];
				this.pspdate = str.substring(0, 4) + '-' + str.substring(4, 6) + '-' + str.substring(6, 8);
				console.log(this.pspdate);
			}
			this['photo' + index] = res.value.FILE_URL;
		},
		clickchongpai(index) {
			this.openChooseImage(index);
		},
		// 日期控件
		openDate() {
			this.$refs.calendar.open();
		},
		pspDateChange(e) {
			this.pspdate = e.fulldate;
		},
		//点击下一步
		clickNext() {
			uni.navigateTo({
				url: '/pages/individual/video/video'
			});
		}
	} //methods end
};
</script>

<style>
page {
	background-color: #f5f5f5;
}
</style>
<style scoped lang="less">
@import '~utils/utils.less';

.tips {
	.flexCenter;
	height: 85rpx;
	padding: 0 29rpx;
	color: @darkColor;
	background-color: @lightColor;
}

.psp {
	margin-bottom: 18rpx;
	background-color: #fff;
	// top
	.top {
		.flexCenter;
		padding: 37rpx 36rpx;
		margin-bottom: 24rpx;
		.top_icon {
			width: 82rpx;
			height: 82rpx;
			margin-right: 31rpx;
		}
		.top_content {
			.flex1;
			.title {
				color: #000;
				font-size: 28rpx;
			}
			.desc {
				color: #4a4a4a;
			}
		}
	}
	// content
	.content {
		.flex;
		.flexEvenly;
		flex-wrap: wrap;
		.psp_item {
			.flexColumn;
			.img_box {
				width: 339rpx;
				height: 242rpx;
				position: relative;
				background-color: #f1f1f1;
				.img {
					.positionCenter;
					width: 236rpx;
					height: 169rpx;
				}
				.photo {
					.wh100;
				}
				.chongpai {
					.flexCenter;
					.flexJCenter;
					width: 87rpx;
					height: 42rpx;
					border-radius: 21rpx;
					background-color: @primaryColor;
					color: #fff;
					font-size: 19rpx;
					position: absolute;
					right: 16rpx;
					bottom: 14rpx;
				}
			}
			.title {
				margin-top: 20rpx;
				margin-bottom: 25rpx;
				color: #4a4a4a;
			}
		}
	}
}

// form
.form {
	background-color: #fff;
	.form_item {
		.flexCenter;
		height: 85rpx;
		border-bottom: 1rpx solid #d7d6d6;
		padding: 0 24rpx 0 36rpx;
		&:last-child {
			border-bottom: none;
		}
		.input {
			.flex1;
			padding-left: 48rpx;
		}
	}
}

// tongyi
.tongyi {
	.flex;
	margin: 18rpx 36rpx;
	.content {
		.flex1;
		color: #9b9b9b;
		.hover {
			color: @primaryColor;
		}
	}
}

.btn {
	.flexCenter;
	.flexJCenter;
	height: 89rpx;
	background-color: #cacacb;
	font-size: 28rpx;
	color: #fff;
	position: fixed;
	width: 100%;
	left: 0;
	bottom: 0;
	z-index: 11;
	&.active {
		background-color: @primaryColor;
	}
}
</style>
