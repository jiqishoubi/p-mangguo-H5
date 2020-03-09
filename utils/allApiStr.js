import {host_baidu} from '@/utils/consts.js'

const api = {
	//登录页
	getSmsLogin: '/app/individual/sendSMSCaptcha',
	loginApi: '/app/individual/login', //登录按钮 如果实名了 会有实名信息

	//注册个体工商
	getUserInfoApi: '/app/individual/getUserInfo', //获取芒果userInfo
	//身份证
	ocrApi: '/app/image/upload', //ocr识别
	getSmsPsp: '/app/individual/register/sendSMSCaptcha', //获取验证码
	realNameApi: '/app/individual/register', //注册实名
	signApi: '/app/company/bindEmployee', //签约
	getProtocolApi: '/app/bind/getProtocol', //获取签约协议
	getProtocolSignApi: '/app/bind/querySignProtocol', //获取签约协议 签约后的

	//百度H5视频活体检测
	getVoiceCountApi: host_baidu + '/api/randomKey', //获取语音码
	checkVideoApi: host_baidu + '/api/videoLiveCheck', //视频检测
	saveLiveResultApi: '/app/individual/saveLiveResult', //保存活体检测信息(检测成功才保存)

	//手写签名
	saveSignatureApi: '/app/individual/saveHandWriteSignature', //保存手写签名
}

export default api
