<template>
	<view>
		<view class="list">
			<block v-if="taskList.length > 0">
				<task-item
					v-for="(item, index) in taskList"
					:key="index"
					:icon="item.icon"
					:title="item.title"
					:registered="item.registered"
					:desc="item.desc"
					:address="item.address"
					:need="item.need"
					:reward="item.reward"
					@mTap="clickTask(item)"
				></task-item>
			</block>
		</view>
	</view>
</template>

<script>
import taskItem from '@/components/task-item.vue';

export default {
	data() {
		return {
			taskList: [
				{
					icon: 'icon',
					title: 'title',
					registered: 'registered',
					desc: 'desc',
					address: 'address',
					need: 'need',
					reward: 'reward'
				}
			]
		};
	},
	components: {
		taskItem
	},
	methods:{
		clickTask(item){
			console.log(item)
		}
	}
};
</script>

<style lang="less"></style>
