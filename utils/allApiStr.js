const host_baidu = 'http://1.2.4.30:7238'

const api = {
	//注册个体工商
	//身份证
	ocrApi: '/app/image/upload', //ocr识别
	getSmsApi: '/app/wechat/html/user/register/sendSMSCaptcha', //获取验证码

	//百度H5视频活体检测
	getVoiceCountApi: host_baidu + '/api/randomKey', //获取语音码
	checkVideoApi: host_baidu + '/api/videoLiveCheck', //视频检测
}

export default api
