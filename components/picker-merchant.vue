<template>
	<view>
		<picker mode="multiSelector" range-key="text" :range="range" :value="value" @columnchange="onColumnchange" @change="onChange">
			<text>{{ showText }}</text>
		</picker>
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
						{
							text: '直管店',
							children: [
								{
									text: '龙翔店',
									key: 'MCH202003110027'
								},
								{
									text: '宏润店',
									key: 'MCH202003110025'
								},
								{
									text: '宏泽店',
									key: 'MCH202003110024'
								},
								{
									text: '宏城店',
									key: 'MCH202003110023'
								},
								{
									text: '吉锦店',
									key: 'MCH202003110022'
								},
								{
									text: '佳木店',
									key: 'MCH202003110020'
								},
								{
									text: '金苑店',
									key: 'MCH202003110018'
								},
								{
									text: '佳财店',
									key: 'MCH202003110016'
								},
								{
									text: '荣乐店',
									key: 'MCH202003110015'
								},
								{
									text: '艺境店',
									key: 'MCH202003110013'
								},
								{
									text: '华瑞店',
									key: 'MCH202003110012'
								},
								{
									text: '中兴店',
									key: 'MCH202003110010'
								},
								{
									text: '盛荣店',
									key: 'MCH202003110009'
								},
								{
									text: '鹏博店',
									key: 'MCH202003110007'
								},
								{
									text: '安居店',
									key: 'MCH202003110006'
								},
								{
									text: '腾跃店',
									key: 'MCH202003110005'
								},
								{
									text: '京竹店',
									key: 'MCH202003110004'
								},
								{
									text: '旺福店',
									key: 'MCH202003100003'
								},
								{
									text: '启城店',
									key: 'MCH202003200005'
								},
								{
									text: '南阳湖店',
									key: 'MCH202003240002'
								},
								{
									text: '万荣店',
									key: 'MCH202003300001'
								}
							]
						},
						{
							text: '加盟店',
							children: [
								{
									text: '启茗店',
									key: 'MCH202003110029'
								},
								{
									text: '沈北店',
									key: 'MCH202003110030'
								},
								{
									text: '蒲江店',
									key: 'MCH202003110032'
								},
								{
									text: '方青店',
									key: 'MCH202003110033'
								},
								{
									text: '鸣江店',
									key: 'MCH202003110034'
								},
								{
									text: '锦江店',
									key: 'MCH202003110036'
								},
								{
									text: '道义店',
									key: 'MCH202003110038'
								},
								{
									text: '雨润店',
									key: 'MCH202003110040'
								},
								{
									text: '瑞坤店',
									key: 'MCH202003110041'
								},
								{
									text: '恒星店',
									key: 'MCH202003110043'
								},
								{
									text: '正良店',
									key: 'MCH202003110045'
								},
								{
									text: '兰台店',
									key: 'MCH202003110047'
								},
								{
									text: '鑫恒店',
									key: 'MCH202003110049'
								},
								{
									text: '沈江店',
									key: 'MCH202003110050'
								},
								{
									text: '合胜店',
									key: 'MCH202003110053'
								},
								{
									text: '合汇店',
									key: 'MCH202003110055'
								},
								{
									text: '松江店',
									key: 'MCH202003110054'
								},
								{
									text: '惠盛店',
									key: 'MCH202003110052'
								},
								{
									text: '万钰店',
									key: 'MCH202003110051'
								},
								{
									text: '合冠店',
									key: 'MCH202003110048'
								},
								{
									text: '名旺店',
									key: 'MCH202003110046'
								},
								{
									text: '永兴店',
									key: 'MCH202003110044'
								},
								{
									text: '应昌店',
									key: 'MCH202003110042'
								},
								{
									text: '蒲星店',
									key: 'MCH202003110039'
								},
								{
									text: '博信店',
									key: 'MCH202003110037'
								},
								{
									text: '陵江店',
									key: 'MCH202003110035'
								},
								{
									text: '廊桥店',
									key: 'MCH202003110031'
								},
								{
									text: '旭辉店',
									key: 'MCH202003110028'
								},
								{
									text: '富城店',
									key: 'MCH202003110026'
								},
								{
									text: '万晶店',
									key: 'MCH202003110021'
								},
								{
									text: '盛京店',
									key: 'MCH202003110019'
								},
								{
									text: '蓝湾店',
									key: 'MCH202003110017'
								},
								{
									text: '小石城店',
									key: 'MCH202003110014'
								},
								{
									text: '顺城店',
									key: 'MCH202003110011'
								},
								{
									text: '万尚店',
									key: 'MCH202003110008'
								},
								{
									text: '鸿锦店',
									key: 'MCH202003110003'
								},
								{
									text: '万景店',
									key: 'MCH202003110002'
								},
								{
									text: '馨丰店',
									key: 'MCH202003100004'
								},
								{
									text: '棠颂店',
									key: 'MCH202003100002'
								},
								{
									text: '合顺店',
									key: 'MCH202003100001'
								},
								{
									text: '名旺店',
									key: 'MCH202003110046'
								},
								{
									text: '郡江店',
									key: 'MCH202003200001'
								},
								{
									text: '银河城店',
									key: 'MCH202003200002'
								},
								{
									text: '北昌店',
									key: 'MCH202003200003'
								},
								{
									text: '鑫悦店',
									key: 'MCH202003200004'
								},
								{
									text: '富航店',
									key: 'MCH202003240001'
								},
								{
									text: '安佳店',
									key: 'MCH202003250001'
								},
								{
									text: '泰都店',
									key: 'MCH202003300002'
								}
							]
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
			this.showText = valObj.text;
			this.$emit('onConfirm', valObj);
		}
	}
};
</script>

<style lang="less"></style>
