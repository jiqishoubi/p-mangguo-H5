<template>
	<view>
		<!-- 类型 -->
		<view class="form_item">
			<image class="form_item_icon" src="https://cdn.s.bld365.com/mangguologin_form_item_icon_03.png"></image>
			<picker mode="multiSelector" range-key="text" :range="range" :value="value" @columnchange="onColumnchange">
				<text>{{ showText }}</text>
			</picker>
			<view style="padding-left: 10rpx;">&gt;</view>
		</view>

		<!-- 门店 -->
		<view class="form_item">
			<image class="form_item_icon" src="https://cdn.s.bld365.com/mangguologin_form_item_icon_03.png"></image>
			<j-picker showKey="text" valKey="key" :options="merchantList" :val="mchValue" @sure="jpickerChange"></j-picker>
		</view>
	</view>
</template>

<script>
import jPicker from '@/components/jPicker.vue'
import mangguo_mch from './mangguo.js'
//517
import mch_zhiguan from './mch_zhiguan.js'
import mch_jiameng from './mch_jiameng.js'
import mch_ziying from './mch_ziying.js'

const propsFunc = ['onConfirm']

export default {
	components: {
		jPicker
	},
	data() {
		return {
			source: [
				{
					text: '芒果',
					children: [
						{
							text: '芒果',
							children: mangguo_mch
						}
					]
				},
				{
					text: '517在线',
					children: [
						{
							text: '自营店',
							children: mch_ziying
						},
						//直管店
						{
							text: '直管店',
							children: mch_zhiguan
						},
						//加盟店
						{
							text: '加盟店',
							children: mch_jiameng
						}
					]
				}
			],

			//类型
			value: [0, 0], // [0, 0],
			//门店
			mchValue: ''
		}
	},
	computed: {
		range() {
			try {
				return [this.source, this.source[this.value[0]].children]
			} catch (e) {
				return []
			}
		},
		showText() {
			try {
				return this.source[this.value[0]].children[this.value[1]].text
			} catch (e) {
				return '请选择类型'
			}
		},
		//门店
		merchantList() {
			try {
				return this.source[this.value[0]].children[this.value[1]].children
			} catch (e) {
				return []
			}
		}
	},
	/**
	 * 方法
	 */
	methods: {
		onColumnchange(e) {
			let d = e.detail
			let value = JSON.parse(JSON.stringify(this.value))
			value[d.column] = d.value
			this.value = value

			this.mchValue = ''

			this.$emit(propsFunc[0], this.mchValue)
		},
		//jPicker
		//带搜索的picker
		jpickerChange(selectedObj) {
			this.mchValue = selectedObj.key

			this.$emit(propsFunc[0], this.mchValue)
		}
	} //methods end
}
</script>

<style lang="less">
@import '~utils/utils.less';
@import './index.less';
</style>
