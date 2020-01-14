/**
 * 请求公共方法
 */
import {
	globalHost
} from '@/utils/utils.js'

const requestw = ({
	type = 'post',
	url,
	data,
	headers,
}) => {
	return new Promise((resolve, reject) => {
		// url
		let urlTemp = url.indexOf('http') > -1 ? url : globalHost() + url
		// data / token
		let dataTemp = {}
		for (let key in data) {
			if (data[key] !== null && data[key] !== undefined) {
				dataTemp[key] = data[key]
			}
		}
		// headers
		let headersTemp = {
			...headers,
			'content-type': 'application/x-www-form-urlencoded'
		}

		uni.request({
			method: type,
			url: urlTemp,
			data: dataTemp,
			header: headersTemp,
			// dataType	String	否	json	如果设为 json，会尝试对返回的数据做一次 JSON.parse	
			// responseType	String	否	text	设置响应的数据类型。合法值：text、arraybuffer	5+App和支付宝小程序不支持
			success: (res) => {
				resolve(res)
			},
			fail: (err) => {
				reject(err)
			}
		})
	})
}

export default requestw
