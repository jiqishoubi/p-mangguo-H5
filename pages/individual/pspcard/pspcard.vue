<template>
	<view v-if="!loading_getUserInfo">
		<step v-if="!haveRealname" active="0"></step>

		<view v-if="!haveRealname" class="tips">信息仅用于身份验证，平台保障您的信息安全</view>

		<!-- 身份证 -->
		<view class="psp">
			<!-- title -->
			<view v-if="haveRealname" class="top">
				<image class="top_icon" src="https://cdn.s.bld365.com/mangguopsp_haverealname_icon.png" mode="aspectFit"></image>
				<view class="top_content"><view class="title">您已通过实名认证</view></view>
			</view>
			<view v-else class="top">
				<image class="top_icon" src="https://cdn.s.bld365.com/mangguopsp_icon_01.png"></image>
				<view class="top_content">
					<view class="title">请上传身份证照片</view>
					<view class="desc">拍摄身份证原件，请确保边角完整，文字清晰</view>
				</view>
			</view>

			<!-- content -->
			<view class="content">
				<view class="psp_item">
					<view class="img_box" @tap="clickbox(0)">
						<image v-if="!photo0" class="img" src="https://cdn.s.bld365.com/mangguopsp_bgimg_01.png"></image>
						<image v-else class="photo" :src="photo0" mode="aspectFit"></image>
						<view v-if="photo0 && !haveRealname" class="chongpai" @tap.stop="clickchongpai(0)">重拍</view>
					</view>
					<view class="title">上传身份证信息面</view>
				</view>
				<view class="psp_item">
					<view class="img_box" @tap="clickbox(1)">
						<image v-if="!photo1" class="img" src="https://cdn.s.bld365.com/mangguopsp_bgimg_02.png"></image>
						<image v-else class="photo" :src="photo1" mode="aspectFit"></image>
						<view v-if="photo1 && !haveRealname" class="chongpai" @tap.stop="clickchongpai(1)">重拍</view>
					</view>
					<view class="title">上传身份证国徽面</view>
				</view>
				<view class="psp_item">
					<view class="img_box" @tap="clickbox(2)">
						<image v-if="!photo2" class="img" src="https://cdn.s.bld365.com/mangguopsp_bgimg_03.png"></image>
						<image v-else class="photo" :src="photo2" mode="aspectFit"></image>
						<view v-if="photo2 && !haveSign" class="chongpai" @tap.stop="clickchongpai(2)">重拍</view>
					</view>
					<view class="title">本人手持身份证</view>
				</view>
				<view class="psp_item">
					<view class="img_box" @tap="clickbox(3)">
						<image v-if="!photo3" class="img" src="https://cdn.s.bld365.com/mangguopsp_bgimg_04.png"></image>
						<image v-else class="photo" :src="photo3" mode="aspectFit"></image>
						<view v-if="photo3 && !haveSign" class="chongpai" @tap.stop="clickchongpai(3)">重拍</view>
					</view>
					<view class="title">本人免冠照</view>
				</view>
				<view class="psp_item">
					<view class="img_box" @tap="clickbox(4)">
						<image v-if="!photo4" class="img" src="https://cdn.s.bld365.com/mangguopsp_bgimg_05.png"></image>
						<image v-else class="photo" :src="photo4" mode="aspectFit"></image>
						<view v-if="photo4 && !haveSign" class="chongpai" @tap.stop="clickchongpai(4)">重拍</view>
					</view>
					<view class="title">个人征信报告</view>
				</view>
				<view class="psp_item">
					<view class="img_box" style="background-color: transparent;"></view>
					<view class="title"></view>
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
				<input class="input" placeholder="姓名" v-model="pspname" :disabled="haveRealname" />
			</view>
			<view class="form_item">
				<view class="label">身份证号</view>
				<input class="input" placeholder="身份证号" v-model="pspcard" disabled />
			</view>
			<view class="form_item">
				<view class="label">签发日期</view>
				<input class="input" placeholder="签发日期" v-model="pspdate1" disabled />
			</view>
			<view class="form_item">
				<view class="label">失效日期</view>
				<input class="input" placeholder="失效日期" v-model="pspdate2" disabled />
				<!-- <view v-if="!haveSign" class="changqiBtn" @tap="clickChangqi">长期</view> -->
			</view>
			<view class="form_item">
				<view class="label">银行卡号</view>
				<input class="input" placeholder="输入本人银行卡卡号" v-model="bankcard" :disabled="haveSign" />
			</view>
			<view class="form_item">
				<view class="label">手机号码</view>
				<input class="input" placeholder="请输入手机号码" type="number" v-model="phone" maxlength="11" disabled />
			</view>
			<view v-if="!haveRealname" class="form_item">
				<view class="label">
					验
					<text class="colornone">a</text>
					证
					<text class="colornone">a</text>
					码
				</view>
				<input class="input" placeholder="请输入验证码" type="number" v-model="smscode" maxlength="6" />
				<getsmsbtn limitSecond="60" type="get" :allUrl="allUrl" :phoneNumber="phone" styleStr="color:#4185f4;" :validBeforeFlag="validBeforeFlag"></getsmsbtn>
			</view>
		</view>

		<!-- 同意 -->
		<view class="tongyi">
			<checkbox-group v-if="!haveSign" @change="checkboxChange"><checkbox class="pspcard_tongyi_checkbox" :checked="checkboxVal" color="#4185f4" /></checkbox-group>
			<view class="content">
				<text v-if="!haveSign">
					本人已阅读并同意
					<text class="hover" @tap="clickProtocol">《三方协议》</text>
					<text class="hover" @tap="clickProtocol2">《承诺书》</text>
					全部条款，知晓提交验证码即代表本人真实意愿签署
				</text>
				<text v-else>
					您已同意并签署
					<text class="hover" @tap="clickProtocol">《三方协议》</text>
					<text class="hover" @tap="clickProtocol2">《承诺书》</text>
					的条款
				</text>
			</view>
		</view>

		<view style="height: 200rpx;"></view>

		<!-- btn -->
		<view v-if="!haveSign" class="btn" :class="{ active: btnActive }" @tap="clickNext">下一步</view>

		<!-- ****************模态**************** -->
		<uni-calendar ref="calendar" :insert="false" :date="showPspdate" @confirm="pspDateChange"></uni-calendar>
	</view>
	<view v-else></view>
</template>

<script>
import { uniCalendar } from '@dcloudio/uni-ui';
import step from '@/components/step.vue';
import getsmsbtn from '@/components/getsmsbtn.vue';
import { globalHost, trimw } from '@/utils/utils.js';
import requestw from '@/utils/requestw.js';
import allApiStr from '@/utils/allApiStr.js';
import { mchCodeKey, companyCodeKey, userInfoKey, phoneNumberKey } from '@/utils/consts.js';
import { getUserInfoAjax } from './utils.js';

export default {
	data() {
		return {
			token: null,
			userInfo: null,
			//getsmsbtn
			allUrl: globalHost() + allApiStr.getSmsPsp,

			//photo
			photo0: '',
			photo1: '',
			photo2: '',
			photo3: '',
			photo4: '',
			// form
			pspname: '',
			pspcard: '',

			pspdate1: '', //签发日期
			pspdate2: '', //失效日期
			showPspdate: '', //控件显示的日期
			lookingDateIndex: '', //正在操作的date 1 2

			bankcard: '',
			phone: '',
			smscode: '',

			//tongyi
			checkboxVal: false,
			protocolUrl: '', //协议

			//承诺书
			oldPdfUrl: '',
			newPdfUrl: '',

			//loading
			loading_getUserInfo: false
		};
	},
	computed: {
		//发验证码之前的校验
		validBeforeFlag() {
			let flag = true;
			if (
				this.photo0 == '' ||
				this.photo1 == '' ||
				this.photo2 == '' ||
				this.photo3 == '' ||
				this.photo4 == '' ||
				this.pspname == '' ||
				this.pspcard == '' ||
				this.pspdate1 == '' ||
				this.pspdate2 == '' ||
				this.bankcard == ''
			) {
				flag = false;
			}
			return flag;
		},
		btnActive() {
			if (!this.haveRealname) {
				let flag = true;
				if (!this.validBeforeFlag || this.phone == '' || this.smscode == '' || !this.checkboxVal) {
					flag = false;
				}
				return flag;
			} else {
				return this.checkboxVal;
			}
		},
		//是否实名
		haveRealname() {
			return this.userInfo && this.userInfo.userAuthInfo && this.userInfo.userAuthInfo.REAL_NAME;
		},
		//是否签约
		haveSign() {
			return (
				this.userInfo &&
				this.userInfo.userAuthInfo &&
				this.userInfo.userAuthInfo.REAL_NAME &&
				this.userInfo.userAttr &&
				this.userInfo.userAttr.HOLD_PSPT_PHOTO &&
				this.userInfo.userAttr.HAND_WRITE_SIGNATURE
			);
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
	async onLoad() {
		// token
		let userInfo = uni.getStorageSync(userInfoKey);
		console.log(userInfo);
		this.token = userInfo && userInfo.TOKEN ? userInfo.TOKEN : null;
		this.phone = uni.getStorageSync(phoneNumberKey);

		//ajax获取userInfo
		uni.showLoading({
			title: '请稍候...',
			mask: true
		});
		this.loading_getUserInfo = true;
		let res = await getUserInfoAjax(this.token);
		this.loading_getUserInfo = false;
		uni.hideLoading();
		this.userInfo = res.value;
		if (this.userInfo && this.userInfo.userAuthInfo && this.userInfo.userAuthInfo.REAL_NAME) {
			this.realnameRender();
		}

		//协议信息
		setTimeout(() => {
			this.getProtocol();
		}, 500);

		//承诺书
		this.getPdfOrigin();
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
		//**********************services******************************************************************************************************************************************************************
		//获取协议
		async getProtocol() {
			let res = await requestw({
				type: 'get',
				url: this.haveSign ? allApiStr.getProtocolSignApi : allApiStr.getProtocolApi,
				data: {
					companyCode: uni.getStorageSync(companyCodeKey)
				}
			});
			if (res.data.resultCode == '200') {
				//两个返回的格式不一样
				if (this.haveSign) {
					this.protocolUrl = res.data.value && res.data.value.signedProtocolUrl ? res.data.value.signedProtocolUrl : '';
				} else {
					this.protocolUrl = res.data.value;
				}
			}
		},
		//ocr身份证识别
		ocrAjax(tempFilePath, file, index) {
			const self = this;
			this['photo' + index] = '';

			let fieldType, ocrType;
			if (index == 0) {
				fieldType = 'PSPT_POSITIVE';
				ocrType = 'ID_CARD_FRONT';
			} else if (index == 1) {
				fieldType = 'PSPT_NEGATIVE';
				ocrType = 'ID_CARD_BACK';
			} else {
				fieldType = 'other';
				ocrType = 'other';
			}
			let postData = {
				fileName: file.name,
				fieldType,
				ocrType
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
						uni.showToast({
							title: '识别失败，请稍后再试',
							icon: 'none',
							mask: true
						});
						return;
					}

					if (index == 0 || index == 1) {
						self.ocrCallback(index, data);
					} else {
						self.otherCallback(index, data);
					}
				}
			});
		},
		//注册实名
		realNameAjax() {
			return new Promise(async resolve => {
				let postData = {
					mchCode: uni.getStorageSync(mchCodeKey), //   商户编码
					psptPositive: this.photo0, // 正面
					psptNegative: this.photo1, // 反面
					holdPspt: this.photo2, //   手持
					headless: this.photo3, //  免冠
					creditReportPhoto: this.photo4, // 征信
					psptName: trimw(this.pspname), //  姓名
					psptNo: trimw(this.pspcard), //   身份证号
					effectiveDate: this.pspdate1 + '--' + this.pspdate2, //  有效期
					bankNo: trimw(this.bankcard), //   银行卡号
					phone: trimw(this.phone), //   电话
					smsCaptcha: this.smscode //  验证码
				};
				let res = await requestw({
					url: allApiStr.realNameApi,
					data: postData
				});
				resolve(res.data);
			});
		},
		//**********************services end**************************************************************************************************************************
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
					if (res.errMsg && res.errMsg.indexOf(':ok') > -1 && res.tempFilePaths && res.tempFilePaths[0]) {
						let tempFilePath = res.tempFilePaths[0];
						let file = res.tempFiles[0];

						self.ocrAjax(tempFilePath, file, index);
					}
				}
			});
		},
		ocrCallback(index, res) {
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
			if (res.value.OCR_DATA['签发日期']) {
				let dateStr1 = res.value.OCR_DATA['签发日期'];
				let dateStr2 = res.value.OCR_DATA['失效日期'];

				this.pspdate1 = dateStr1.substring(0, 4) + '-' + dateStr1.substring(4, 6) + '-' + dateStr1.substring(6, 8);
				this.pspdate2 = dateStr2 == '长期' ? dateStr2 : dateStr2.substring(0, 4) + '-' + dateStr2.substring(4, 6) + '-' + dateStr2.substring(6, 8);
			}
			this['photo' + index] = res.value.FILE_URL;
		},
		otherCallback(index, res) {
			if (res.resultCode !== '200') {
				uni.showToast({
					title: res.systemMessage ? res.systemMessage : '操作失败',
					icon: 'none',
					mask: true
				});
				return;
			}

			uni.showToast({
				title: '操作成功',
				icon: 'none'
			});
			this['photo' + index] = res.value.FILE_URL;
		},
		clickchongpai(index) {
			this.openChooseImage(index);
		},
		// 日期控件
		openDate(index) {
			if (this.haveSign) return;
			this.lookingDateIndex = index;
			this.showPspdate = this['pspdate' + index];
			this.$refs.calendar.open();
		},
		pspDateChange(e) {
			this['pspdate' + this.lookingDateIndex] = e.fulldate;
		},
		//点击长期
		clickChangqi() {
			this.pspdate2 = '长期';
		},
		//点击查看协议
		clickProtocol() {
			if (!this.protocolUrl) {
				uni.showToast({
					title: '获取协议失败',
					icon: 'none',
					mask: true
				});
				return;
			}

			uni.navigateTo({
				url: `/pages/sign/signpddf/signpddf?pdfUrl=${this.protocolUrl}`
			});
		},
		//checkbox
		checkboxChange(e) {
			this.checkboxVal = e.detail.value.length == 0 ? false : true;
		},
		//点击下一步
		async clickNext() {
			//验证
			if (!this.btnActive) {
				uni.showToast({
					title: '信息请填写完整，并勾选同意协议',
					icon: 'none',
					mask: true
				});
				return;
			}

			//实名认证
			if (!this.haveRealname) {
				uni.showLoading({
					title: '请稍候...',
					mask: true
				});
				let res = await this.realNameAjax();
				if (res.resultCode !== '200') {
					uni.showToast({
						title: res.systemMessage ? res.systemMessage : '操作失败',
						icon: 'none',
						mask: true
					});
					return;
				}
				uni.showToast({
					title: '操作成功',
					icon: 'none',
					mask: true
				});
			}
			//实名认证 end

			setTimeout(() => {
				uni.navigateTo({
					url: '/pages/individual/video/video'
				});
			}, 500);
		},
		//实名过了 渲染
		realnameRender() {
			//photo
			this.photo0 = this.userInfo.userAuthInfo.PSPT_POSITIVE;
			this.photo1 = this.userInfo.userAuthInfo.PSPT_NEGATIVE;
			this.photo2 = this.userInfo.userAttr.HOLD_PSPT_PHOTO;
			this.photo3 = this.userInfo.userAttr.AVATAR;
			this.photo4 = this.userInfo.userAttr.CREDIT_REPORT_PHOTO;
			// form
			this.pspname = this.userInfo.userAuthInfo.REAL_NAME;
			this.pspcard = this.userInfo.userAuthInfo.PSPT_NO;

			let dateStr = this.userInfo.userAttr.EFFECTIVE_DATE;
			this.pspdate1 = dateStr.split('--')[0];
			this.pspdate2 = dateStr.split('--')[1];

			this.bankcard = this.userInfo.userAttr.BANK_NO;
		},
		//承诺书相关
		async clickProtocol2() {
			let srcUrl = '';
			if (this.haveRealname) {
				//已实名
				let url = await this.getPdfNew();
				if (!url) return;
				srcUrl = url;
			} else {
				//未实名
				if (this.checkboxVal) {
					//同意
					let url = await this.getPdfNewWrap();
					if (!url) return;
					srcUrl = url;
				} else {
					//没勾选同意
					srcUrl = this.oldPdfUrl;
				}
			}
			uni.navigateTo({
				url: `/pages/sign/signpddf/signpddf?pdfUrl=${srcUrl}`
			});
		},
		//获取原版承诺书
		async getPdfOrigin() {
			let res = await requestw({
				url: allApiStr.getPdfOriginApi
			});
			if (res.data.resultCode !== '200') {
				uni.showToast({
					title: '承诺书获取失败',
					icon: 'none'
				});
				return;
			}
			this.oldPdfUrl = res.data.value;
		},
		//承诺书签字
		signPdfFunc() {
			return new Promise(async resolve => {
				if (this.pspname == '') {
					uni.showToast({
						title: '请先识别身份证',
						icon: 'none'
					});
					resolve(null);
					return;
				}
				let res = await requestw({
					url: allApiStr.signPdfFuncApi,
					data: {
						userCode: uni.getStorageSync(userInfoKey).USER_CODE,
						userName: this.pspname,
						idNo: this.pspcard
					}
				});
				if (res.data.resultCode != '200') {
					uni.showToast({
						title: res.data.systemMessage ? res.data.systemMessage : '获取失败',
						icon: 'none'
					});
					resolve(null);
					return;
				}
				resolve(res.data.value);
			});
		},
		//获取已签字的新的承诺书
		getPdfNew() {
			return new Promise(async resolve => {
				let res = await requestw({
					url: allApiStr.getPdfNewApi,
					data: {
						userCode: uni.getStorageSync(userInfoKey).USER_CODE
					}
				});
				console.log(res);
				if (res.data.resultCode != '200') {
					uni.showToast({
						title: res.data.systemMessage ? res.data.systemMessage : '获取失败',
						icon: 'none'
					});
					resolve(null);
					return;
				}
				resolve(res.data.value);
			});
		},
		getPdfNewWrap() {
			return new Promise(async resolve => {
				if (this.newPdfUrl) {
					resolve(this.newPdfUrl);
					return;
				}

				uni.showLoading({
					title: '请稍候...',
					mask: true
				});
				let res1 = await this.signPdfFunc();
				// let res2 = await this.getPdfNew();
				uni.hideLoading();
				if (!res1) {
					resolve(null);
					return;
				}
				this.newPdfUrl = res1;
				resolve(res1);
			});
		}
		//承诺书相关 end
	} //methods end
};
</script>

<style>
page {
	background-color: #f5f5f5;
}
</style>
<style scoped lang="less">
@import './pspcard.less';
</style>
