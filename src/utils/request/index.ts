/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-21 11:48:39
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-24 20:50:35
 */
// import Request from './request.js'
import uRequest from './u-request.js'

const request = uRequest({
	baseURL: 'http://192.168.0.13/dwbsapp', //baseURL
	timeout: 12345, // 超时时间，单位毫秒。默认 60 秒
	header: { 'x-custom-header': 'x-custom-header' }, // 设置请求头，建议放在请求拦截器中
	statusCode: [200, 401], // 服务器相应状态码为 200/401 时，网络请求不会 reject。也就是不会被 catch 到。如响应 401 时可以在响应拦截后 await 刷新 token + await 重新请求 + return response。即可实现无痛刷新。
})
console.log(request.interceptors)
// // 请求拦截
request.interceptors.request.use(async (config: any, ...args: any) => {
	// token
	config.header.Authorization = ''
	return config
})
// // 响应s拦截
request.interceptors.response.use(async (response: any, ...args: any) => {
	return response
})
// // 错误监听
request.onerror = (...args: any) => {
	console.log(args)
}
// const request = new Request({
// 	baseURL: 'http://192.168.0.13/dwbsapp', //baseURL
// 	timeout: 12345, // 超时时间，单位毫秒。默认 60 秒
// 	header: { 'x-custom-header': 'x-custom-header' }, // 设置请求头，建议放在请求拦截器中
// 	statusCode: [200, 401], // 服务器相应状态码为 200/401 时，网络请求不会 reject。也就是不会被 catch 到。如响应 401 时可以在响应拦截后 await 刷新 token + await 重新请求 + return response。即可实现无痛刷新。
// })

export default request
