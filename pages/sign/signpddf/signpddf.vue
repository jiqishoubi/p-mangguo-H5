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
			src:
				'https://lexinapp.bld365.com/pdfweb/web/index.html?pdfurl=http://filedown.thinkerjet.com/lexin/20191119/PROTOCOL_20191119094833_%E7%94%A8%E5%B7%A5%E7%AD%BE%E7%BA%A6%E4%B8%89%E6%96%B9%E5%8D%8F%E8%AE%AE.pdf&iphone=130****2424&token=TK8628101DA82B785697649C706B5FE0AA&employeeCode=EMP2019073000163&base=https://pay.bld365.com&time=Wed Jan 08 2020 15:46:59 GMT+0800 (中国标准时间)&statusName=%E5%B7%B2%E7%AD%BE%E7%BA%A6'
		};
	},
	onLoad(option) {
		// const item = JSON.parse(decodeURIComponent(option.obj));
		// this.src = '';
		// var userInfo = uni.getStorageSync('userInfo');
		// var employee = item;
		// console.log(userInfo);
		// console.log(employee);
		// var pdfurl = employee.PROTOCOL;
		// var iphone = userInfo.PHONE_NUMBER_HID;
		// var token = userInfo.TOKEN;
		// var employeeCode = employee.EMPLOYEE_CODE;
		// var statusName = employee.STATUS_NAME;
		// let src =
		// 	'https://lexinapp.bld365.com/pdfweb/web/index.html?pdfurl=' +
		// 	encodeURI(pdfurl) +
		// 	'&iphone=' +
		// 	encodeURI(iphone) +
		// 	'&token=' +
		// 	encodeURI(token) +
		// 	'&employeeCode=' +
		// 	encodeURI(employeeCode) +
		// 	'&base=' +
		// 	encodeURI(globalHost()) +
		// 	'&time=' +
		// 	new Date() +
		// 	'&statusName=' +
		// 	encodeURI(statusName);
		// console.log(src);
		// this.src = src;
	}
};
</script>

<style lang="less"></style>
