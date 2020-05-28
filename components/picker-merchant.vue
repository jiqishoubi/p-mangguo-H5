<template>
	<view>
		<picker mode="multiSelector" range-key="text" :range="range" :value="value" @columnchange="onColumnchange" @change="onChange">
			<text>{{ showText }}</text>
		</picker>
	</view>
</template>

<script>
import mch_zhiguan from './mch_zhiguan.js'
import mch_jiameng from './mch_jiameng.js'
export default {
	data() {
		return {
			source: [
				{
					text: '芒果',
					children: [
						{
							text: '芒果',
							children: [
								{
									text: '芒果',
									key: 'MCH202001070001'
								}
							]
						}
					]
				},
				{
					text: '517在线',
					children: [
						{
							text: '自营店',
							children: [
								{
									text: '自营店',
									key: 'MCH202001060001'
								}
							]
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
			range: [
				[
					{
						text: '芒果'
					},
					{
						text: '517在线'
					}
				],
				[
					{
						text: '芒果'
					}
				],
				[
					{
						text: '芒果',
						key: 'MCH202001070001'
					}
				]
			],
			value: [0, 0, 0],
			showText: '选择商户'
		}
	},
	/**
	 * 周期
	 */
	beforeCreate() {},
	created() {},
	beforeMount() {},
	mounted() {},
	beforeUpdate() {},
	updated() {},
	beforeDestroy() {},
	destroyed() {},
	/**
	 * 方法
	 */
	methods: {
		onColumnchange(e) {
			let d = e.detail
			this.value[d.column] = d.value
			this.range = [this.source, this.source[this.value[0]].children, this.source[this.value[0]].children[this.value[1]].children]
		},
		onChange(e) {
			let valObj = this.source[this.value[0]].children[this.value[1]].children[this.value[2]]
			this.showText = valObj.text
			this.$emit('onConfirm', valObj)
		}
	}
}
</script>

<style lang="less"></style>
