<script>
export default {
	globalData: {
		text: 'text'
	},
	// 赋值：getApp().globalData.text = 'test'

	// 取值：console.log(getApp().globalData.text) // 'test'

	onLaunch: function() {
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style>
/*每个页面公共css */
view,
input {
	font-size: 24rpx;
}

/* *********************样式修正********************* */

/* #ifdef H5 */
.pspcard_tongyi_checkbox .uni-checkbox-input {
	width: 32rpx !important;
	height: 32rpx !important;
}

.pspcard_tongyi_checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
	font-size: 32rpx;
}

/* #endif */

/* #ifdef MP-WEIXIN */
.pspcard_tongyi_checkbox .wx-checkbox-input {
	width: 32rpx !important;
	height: 32rpx !important;
}

.pspcard_tongyi_checkbox .wx-checkbox-input.wx-checkbox-input-checked:before {
	font-size: 32rpx;
}

/* #endif */
</style>
