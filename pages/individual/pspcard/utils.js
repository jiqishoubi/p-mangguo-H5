import requestw from '@/utils/requestw.js'
import allApiStr from '@/utils/allApiStr.js'
import {
	userInfoKey
} from '@/utils/const.js'

/**
 * 获取芒果userInfo  用token换
 */
export const getUserInfoAjax = (token) => {
	return new Promise(async (resolve) => {
		let res = await requestw({
			type: 'get',
			url: allApiStr.getUserInfoApi,
			data: {
				token
			},
		})
		if (res.data && res.data.resultCode == '200' && res.data.value) {
			uni.setStorageSync(userInfoKey, res.data.value) //保存到localStorage
		}
		resolve(res.data)
	})
}
