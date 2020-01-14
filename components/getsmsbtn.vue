<template>
	<view>
		<view v-if="!timer" @tap="getSms" :style="styleStr">获取验证码</view>
		<view v-else class="second">{{ second }}s</view>
	</view>
</template>

<script>
import requestw from '@/utils/requestw.js';

export default {
	data() {
		return {
			second: 0,
			timer: null
		};
	},
	props: ['limitSecond', 'allUrl', 'phoneNumber', 'styleStr'],
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
	destroyed() {},
	/**
	/**
	 * 方法
	 */
	methods: {
		async getSms() {
			// uni.showLoading({
			// 	title: '请稍候...',
			// 	mask: true
			// });
			// let postData = {
			// 	phoneNumber: this.phoneNumber
			// };
			// let res = await requestw({
			// 	url: this.allUrl,
			// 	data: postData
			// });
			this.bgTimer();
		},
		bgTimer() {
			let timer = setInterval(() => {
				let nextSecond = this.second - 1;
				if (nextSecond < 0) {
					this.endTimer();
					return;
				}
				this.second = nextSecond;
			}, 1000);
			this.timer = timer;
		},
		endTimer() {
			clearInterval(this.timer);
			this.timer = null;
			this.second = this.limitSecond;
		}
	}
};
</script>

<style lang="less">
.second {
	color: #bcbcbc;
}
</style>
