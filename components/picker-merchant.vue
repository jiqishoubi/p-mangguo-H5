<template>
	<view>
		<picker mode="multiSelector" range-key="text" :range="range" :value="value" @columnchange="onColumnchange" @change="onChange"><text>{{showText}}</text></picker>
	</view>
</template>

<script>
export default {
	data() {
		return {
			source: [
				{
					text: '芒果',
					children: [
						{
							text: '芒果',
							children: [{ text: '芒果', key: 'MCH202001070001' }]
						}
					]
				},
				{
					text: '517在线',
					children: [
						{
							text: '自营店',
							children: [{ text: '自营店', key: 'MCH202001060001' }]
						},
						{
							text: '直管店',
							children: [{ text: '旺福店', key: 'MCH202003100003' }]
						},
						{
							text: '加盟店',
							children: [{ text: '合顺店', key: 'MCH202003100001' }, { text: '棠颂店', key: 'MCH202003100002' }, { text: '馨丰店', key: 'MCH202003100004' }]
						}
					]
				}
			],
			range: [[{ text: '芒果' }, { text: '517在线' }], [{ text: '芒果' }], [{ text: '芒果', key: 'MCH202001070001' }]],
			value: [0, 0, 0],
			showText:'选择商户',
		};
	},
	// computed: {
	// 	range() {
	// 		return [this.source, this.source[this.value[0]].children, this.source[this.value[1]].children[this.value[2]].children];
	// 	}
	// },
	// watch:{
	// 	value(){
	// 		this.range=[this.source, this.source[this.value[0]].children, this.source[this.value[1]].children[this.value[2]].children];
	// 	}
	// },
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
			let d = e.detail;
			this.value[d.column] = d.value;
			this.range = [this.source, this.source[this.value[0]].children, this.source[this.value[0]].children[this.value[1]].children];
		},
		onChange(e) {
			let valObj = this.source[this.value[0]].children[this.value[1]].children[this.value[2]];
			this.showText=valObj.text
			this.$emit('onConfirm', valObj);
		}
	}
};
</script>

<style lang="less"></style>
