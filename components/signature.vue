<template>
	<view class="cat-signature" @touchmove.stop.prevent="moveHandle">
		<view class="content">
			<canvas
				class="firstCanvas"
				:canvas-id="canvasId"
				@touchmove="move"
				@touchstart="start($event)"
				@touchend="end"
				@touchcancel="cancel"
				@longtap="tap"
				disable-scroll="true"
				@error="error"
			/>
			<view class="btns" style="display: none;">
				<view class="btn" @tap="clear">重置</view>
				<view class="btn" @tap="save">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
var content = null;
var touchs = [];
var canvasw = 0;
var canvash = 0;
//获取系统信息
uni.getSystemInfo({
	success: function(res) {
		canvasw = res.windowWidth;
		canvash = (canvasw * 9) / 16;
	}
});

export default {
	name: 'cat-signature',
	props: {
		canvasId: {
			type: String,
			default: 'firstCanvas'
		}
	},
	data() {
		return {
			signImage: '',
			hasDh: false
		};
	},
	created(options) {
		this.getInfo();
	},
	methods: {
		getInfo() {
			//获得Canvas的上下文
			content = uni.createCanvasContext(this.canvasId, this);
			//设置线的颜色
			content.setStrokeStyle('#000');
			//设置线的宽度
			content.setLineWidth(5);
			//设置线两端端点样式更加圆润
			content.setLineCap('round');
			//设置两条线连接处更加圆润
			content.setLineJoin('round');
		},
		//
		moveHandle() {},
		// 画布的触摸移动开始手势响应
		start(e) {
			let point = {
				x: e.touches[0].x,
				y: e.touches[0].y
			};
			touchs.push(point);
			this.hasDh = true;
		},
		// 画布的触摸移动手势响应
		move: function(e) {
			let point = {
				x: e.touches[0].x,
				y: e.touches[0].y
			};
			touchs.push(point);
			if (touchs.length >= 2) {
				this.draw(touchs);
			}
		},

		// 画布的触摸移动结束手势响应
		end: function(e) {
			//清空轨迹数组
			for (let i = 0; i < touchs.length; i++) {
				touchs.pop();
			}
		},

		// 画布的触摸取消响应
		cancel: function(e) {
			// console.log("触摸取消" + e)
		},

		// 画布的长按手势响应
		tap: function(e) {
			// console.log("长按手势" + e)
		},

		error: function(e) {
			// console.log("画布触摸错误" + e)
		},

		//绘制
		draw: function(touchs) {
			let point1 = touchs[0];
			let point2 = touchs[1];
			// console.log(JSON.stringify(touchs))
			content.moveTo(point1.x, point1.y);
			content.lineTo(point2.x, point2.y);
			content.stroke();
			content.draw(true);
			touchs.shift();
		},
		//清除操作
		clear: function() {
			//清除画布
			content.clearRect(0, 0, canvasw, canvash);
			content.draw(true);
			this.hasDh = false;
			this.$emit('clear');
		},
		save() {
			var that = this;
			if (!this.hasDh) {
				uni.showToast({ title: '请先签字', icon: 'none' });
				return;
			}
			uni.showLoading({ title: '生成中...', mask: true });
			setTimeout(() => {
				uni.canvasToTempFilePath(
					{
						canvasId: this.canvasId,
						success: function(res) {
							that.signImage = res.tempFilePath;
							that.$emit('save', res.tempFilePath);
							uni.hideLoading();
							that.hasDh = false;
						},
						fail: function(err) {
							console.log(err);
							uni.hideLoading();
						}
					},
					this
				);
			}, 100);
		}
	}
};
</script>

<style lang="scss">
.cat-signature {
	display: block;
	z-index: 11;
	.content {
		display: block;
		margin: auto;
		background: #fff;
		// canvas
		.firstCanvas {
			background-color: #fff;
			width: 100%;
			height: 400upx;
		}
		// canvas

		// .btns {
		// 	padding: 0 15px;
		// 	height: 100upx;
		// 	overflow: hidden;
		// 	bottom: 10upx;
		// 	margin: auto;
		// 	display: flex;
		// 	justify-content: space-between;
		// 	.btn {
		// 		width: 40%;
		// 		text-align: center;
		// 		font-size: 28upx;
		// 		height: 60upx;
		// 		line-height: 60upx;
		// 		background-color: #999;
		// 		color: #fff;
		// 		border-radius: 6upx;
		// 	}
		// }
	}
}
</style>
