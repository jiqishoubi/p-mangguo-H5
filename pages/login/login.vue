<template>
	<view>
		<mp-complete-navbar-height></mp-complete-navbar-height>

		<view class="top">
			<image class="logo" src="https://cdn.s.bld365.com/mangguologin_logo.png"></image>
			<view class="logo_title">电子商务综合服务平台</view>
		</view>

		<!-- form -->
		<view class="form">
			<picker-merchant @onConfirm="pickerMerchantConfirm"></picker-merchant>

			<view class="form_item">
				<image class="form_item_icon" src="https://cdn.s.bld365.com/mangguologin_form_item_icon_01.png"></image>
				<input class="form_input" type="number" placeholder="请输入手机号码" v-model="phoneNumber" maxlength="11" />
			</view>
			<view class="form_item">
				<image class="form_item_icon" src="https://cdn.s.bld365.com/mangguologin_form_item_icon_02.png"></image>
				<input class="form_input" type="number" placeholder="请输入验证码" v-model="smsCode" maxlength="6" />
				<getsmsbtn ref="getsmsbtn" limitSecond="60" type="get" :allUrl="allUrl" :phoneNumber="phoneNumber" :mchCode="merchantCode" style="color:#4185f4"></getsmsbtn>
			</view>
		</view>

		<!-- btn -->
		<button class="btn" hover-class="btn_active" @tap="login">登录</button>
	</view>
</template>

<script>
// 组件
import mpCompleteNavbarHeight from '@/components/mp-completeNavbarHeight.vue'
import getsmsbtn from '@/components/getsmsbtn.vue'
import pickerMerchant from '@/components/picker-merchant/picker-merchant.vue'
import { globalHost } from '@/utils/utils.js'
import requestw from '@/utils/requestw.js'
import allApiStr from '@/utils/allApiStr.js'
import { userInfoKey, phoneNumberKey, mchCodeKey, companyCodeKey, mchCodeListSelect } from '@/utils/consts.js'

export default {
	data() {
		return {
			mchCodeListSelect,

			// form
			phoneNumber: '',
			smsCode: '',
			// mchCodeListSelectIndex: 0, //选择的哪个mchCode
			merchantCode: '',

			// getsmsbtn
			allUrl: globalHost() + allApiStr.getSmsLogin
		}
	},
	components: {
		mpCompleteNavbarHeight,
		getsmsbtn,
		pickerMerchant
	},
	methods: {
		// mchCodeChange(e) {
		// 	let index = e.detail.value;
		// 	this.mchCodeListSelectIndex = index;

		// 	this.phoneNumber = '';
		// 	this.smsCode = '';
		// 	this.$refs.getsmsbtn.endTimer();
		// },
		pickerMerchantConfirm(res) {
			console.log(res)
			this.merchantCode = res

			this.phoneNumber = ''
			this.smsCode = ''
			this.$refs.getsmsbtn.endTimer()
		},
		//登录
		async login() {
			//验证
			if (this.phoneNumber == '' || this.smsCode == '') {
				uni.showToast({ title: '手机号和验证码请填写完整', icon: 'none', mask: true })
				return
			}
			//验证 end

			uni.showLoading({ title: '请稍候...', mask: true })
			let res = await requestw({
				url: allApiStr.loginApi,
				data: {
					phoneNumber: this.phoneNumber,
					smsCaptcha: this.smsCode,
					mchCode: this.merchantCode ? this.merchantCode : null
				}
			})
			if (res.data.resultCode !== '200') {
				uni.showToast({ title: res.data.systemMessage ? res.data.systemMessage : '操作失败', icon: 'none', mask: true })
				return
			}

			uni.hideLoading()
			uni.setStorageSync(userInfoKey, res.data.value)
			uni.setStorageSync(phoneNumberKey, this.phoneNumber)
			// uni.setStorageSync(mchCodeKey, this.mchCodeListSelect[this.mchCodeListSelectIndex].value);
			uni.setStorageSync(mchCodeKey, this.merchantCode)
			uni.setStorageSync(companyCodeKey, res.data.value.employeeMap && res.data.value.employeeMap.COMPANY_CODE ? res.data.value.employeeMap.COMPANY_CODE : null)
			uni.reLaunch({
				url: '/pages/wode/wode_index/wode_index'
			})
		}
	}
}
</script>

<style lang="less">
@import '~utils/utils.less';

.top {
	.flexColumn;
	.flexJCenter;
	height: 473rpx;
	background-color: @primaryColor;
	.logo {
		width: 181rpx;
		height: 77rpx;
		margin-bottom: 30rpx;
	}
	.logo_title {
		color: #fff;
	}
}

// form
.form {
	margin: 75rpx 73rpx;
	.form_item {
		.flexCenter;
		height: 80rpx;
		margin-top: 20rpx;
		border-bottom: 1rpx solid #dedede;
		.form_item_icon {
			width: 25rpx;
			height: 34rpx;
			margin-right: 24rpx;
		}
		.form_input {
			.flex1;
		}
	}
}

// btn
.btn {
	margin: 0 73rpx;
	background-color: @primaryColor;
	color: #ffffff;
	font-size: 33rpx;
}
.btn_active {
	background-color: @hoverColor;
}
</style>
