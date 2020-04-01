/**
 * H5 纯前端压缩图片
 */
export const compressImg = (filePath, width = 500) => { //blob url, 压缩之后的canvas width
	return new Promise((resolve) => {
		let img = new Image();
		img.onload = (e) => {
			//获取原图片的宽高比例
			let whRate = 1
			if (e.path[0] && e.path[0].width) {
				whRate = e.path[0].width / e.path[0].height
			}
			let canvas = document.createElement('canvas');
			document.body.appendChild(canvas)
			let context = canvas.getContext('2d');
			let cW = width
			let cH = width / whRate
			canvas.width = cW;
			canvas.height = cH;
			context.drawImage(img, 0, 0, cW, cH);
			canvas.toBlob((blob) => {
				resolve(blob) //出口
			});
		}
		img.src = filePath
	})
}