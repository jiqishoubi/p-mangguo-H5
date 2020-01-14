/**
 * 获取mp 胶囊信息
 */
export const getMenuButtonInfo_MP = () => {
	return new Promise(async (resolve) => {
		let res = wx.getMenuButtonBoundingClientRect()
		resolve(res)
	})
}

/**
 * 补全mp导航栏 height
 */
export const completeNavbarHeight_MP = () => {
	return new Promise(async (resolve) => {
		let res = await getMenuButtonInfo_MP()
		let height = res.top + res.height + 10
		resolve(height)
	})
}
