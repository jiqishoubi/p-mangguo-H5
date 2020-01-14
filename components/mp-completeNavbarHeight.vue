/** * 补全微信小程序空白navbar，因为小程序永远都有一个胶囊按钮 */
<template>
	<view :style="'height:' + height + 'px;' + (styleStr ? styleStr : '')"></view>
</template>

<script>
import { completeNavbarHeight_MP } from '@/utils/utils_mp.js';

export default {
	data() {
		return {
			height: 0
		};
	},
	props: {
		styleStr: {
			type: String,
			required: false
		}
	},
	/**
	 * 周期
	 */
	beforeCreate() {},
	async created() {
		// #ifdef MP-WEIXIN
		this.height = await completeNavbarHeight_MP();
		// #endif
	},
	beforeMount() {},
	mounted() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {}
};
</script>

<style lang="less"></style>
