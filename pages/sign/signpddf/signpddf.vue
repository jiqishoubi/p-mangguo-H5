<template>
	<view>
		<view style="text-align: center;padding-top: 50rpx;">加载中...</view>
		<web-view :src="src"></web-view>
	</view>
</template>

<script>
import { globalHost } from '@/utils/utils.js';

export default {
	data() {
		return {
			src:''
		};
	},
	onLoad(option) {
		this.src=`https://lexinapp.bld365.com/pdfweb/web/index.html?pdfurl=${option.pdfUrl}&iphone=130****2424&token=TK8628101DA82B785697649C706B5FE0AA&employeeCode=EMP2019073000163&base=https://pay.bld365.com&time=Wed Jan 08 2020 15:46:59 GMT+0800 (中国标准时间)&statusName=%E5%B7%B2%E7%AD%BE%E7%BA%A6`
	}
};
</script>

<style lang="less"></style>
