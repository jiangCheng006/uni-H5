import {
	base
} from 'config/base.config'

const METHODS = [{
		name: ['get', 'GET', 'Get'],
		value: 'GET'
	},
	{
		name: ['post', 'POST', 'Post'],
		value: 'POST'
	},
	{
		name: ['put', 'PUT', 'Put'],
		value: 'PUT'
	},
	{
		name: ['delete', 'DELETE', 'Delete'],
		value: 'DELETE'
	},
	{
		name: ['connect', 'CONNECT', 'Connect'],
		value: 'CONNECT'
	},
	{
		name: ['head', 'HEAD', 'Head'],
		value: 'HEAD'
	},
	{
		name: ['options', 'OPTIONS', 'Options'],
		value: 'OPTIONS'
	},
	{
		name: ['trace', 'TRACE', 'Trace'],
		value: 'TRACE'
	}
]

/*
 * 检查一个字符串(str)是否以指定的字符串(target)结尾
 */
function confirmEnding(str, target) {
	let result = false
	if (str.substring(str.length - target.length, str.length) === target) {
		result = true;
	}
	return result;
}


function Ajax(opt) {
	let method = ''
	if (opt.method && opt.method !== '') {
		method = METHODS.map(t => {
			if (t.name.some((el) => {
					return el === opt.method
				})) {
				return t.value
			} else {
				return ''
			}
		}).filter(t => t !== '')[0]
	} else {
		console.log('请给ajax请求传入method' + JSON.stringify(opt))
	}
	let url = ''
	if (opt.url) {
		if (!opt.exceptHost) {
			if (opt.isAuthSys) { // 是否是权限系统接口
				url = opt.url
			} else {
				url = base.HOST + opt.url
			}
		} else { // 如果请求是其他服务器上的接口
			url = opt.url
		}
		let getTimestamp
		if (!/\?/.test(url)) {
			getTimestamp = '?timestamp=' + new Date().getTime()
		} else {
			getTimestamp = '&timestamp=' + new Date().getTime()
		}
		url = url + getTimestamp
	} else {
		console.log('请给ajax请求传入url' + JSON.stringify(opt))
	}
	let COOKIES = uni.getStorageSync('COOKIES') || ''
	let header = {}
	if (COOKIES !== '') {
		header = {
			cookie: COOKIES
		}
	} else {
		header = {}
	}
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method,
			header: {
				...header,
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			data: opt.data,
			success: (res) => {
				if (res.header['Set-Cookie'] && res.header['Set-Cookie'] !== '') {
					uni.setStorageSync('COOKIES', res.header['Set-Cookie'])
				}
				if (res.data.code === 200) {
					resolve(res.data)
				} else {
					if (res && res.data && (res.data.code === 8302)) { // 8302(未登录)
						// uni.removeStorageSync('token')
						// uni.showModal({
						// 	content: res.data.message,
						// 	showCancel: false
						// })
						// uni.navigateTo({
						// 	url: '/pages/user/login'
						// })
					}
					console.log('异常请求体', opt.data)
					resolve(res.data)
				}
			},
			fail: (err) => {
				// 					uni.showModal({
				// 						content: err.errMsg,
				// 						showCancel: false
				// 					})
				console.log('接口异常调用' + err.errMsg)
				reject(new Error(err.errMsg))
			},
			complete: () => {}
		})
	})
}
export default Ajax
