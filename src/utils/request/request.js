/*
 * @Description:  请求封装
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-21 11:48:33
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-24 19:53:02
 */

import { requestProp, Timer } from './request'
class Request {
	constructor(option: requestProp) {
		this.baseURL = option.baseURL
		this.statusCode = option.statusCode
		this.timeout = option.timeout
		console.log(option)
	}
	get() {}
	post() {}
	options() {}
	uploadFile() {}
	downloadFile() {}
	//错误函数集合
	onerror() {}
	file(method: string, url: string, data: any, header: any, reqIntercept: any, resIntercept: any) {
		let timer: Timer
		let requestTask
		let aborted: boolean = false
		let overtime: boolean = false
		let progressUpdateHandle: any
		const abort = () => {
			// abort 取消请求方法
			aborted = true // 将请求状态标记为已取消
			requestTask ? requestTask.abort() : '' // 执行取消请求方法
		}
		// progressUpdateHandle 监听上传进度变化回调，onProgressUpdate 监听上传进度变化
		const onProgressUpdate = (e: any) => (progressUpdateHandle = e)
		return new Proxy(
			new Promise((_resolve, _reject) => {
				this.interceptors.request
					.intercept(
						{ header: header || {}, body: data.formData || {} },
						method,
						url,
						data,
						reqIntercept
					)
					.then(async ({ header, body, cancel }) => {
						if (aborted || cancel) {
							await this.onerror(method, url, data, '网络请求失败:主动取消')
							return _reject('网络请求失败:主动取消')
						}
						requestTask = uni[method]({
							url: url[0] === '/' ? this.baseURL + url : url,
							name: data.name,
							header,
							filePath: data.filePath,
							formData: body,
							success: async (res) => {
								clearInterval(timer)
								!this.statusCode.includes(res.statusCode)
									? await this.onerror(
											method,
											url,
											data,
											`网络请求异常：服务器响应异常：状态码：${res.statusCode}`
									  )
									: ''
								this.interceptors.response.intercept(
									this.statusCode.includes(res.statusCode) ? _resolve : _reject,
									{
										success: this.statusCode.includes(res.statusCode),
										...res,
									},
									method,
									url,
									data,
									_reject,
									resIntercept
								) // 执行响应拦截器
							},
							fail: async (res) => {
								clearInterval(timer)
								!overtime &&
									(await this.onerror(
										method,
										url,
										data,
										aborted ? '网络请求失败：主动取消' : '网络请求失败:URL无效|无网络|DNS解析失败'
									))
								aborted
									? _reject('网络请求失败：主动取消')
									: _reject('网络请求失败:(URL无效|无网络|DNS解析失败)')
							},
						})
						// 监听下载进度变化
						requestTask.onProgressUpdate = onProgressUpdate(progressUpdateHandle)
						timer = setTimeout(async () => {
							// 将状态标记为超时，不会被 fail 中的 onerror 重复执行
							overtime = true
							requestTask.abort() // 执行取消请求方法
							await this.onerror(method, url, data, '网络请求失败：超时取消')
							_reject('网络请求时间超时') // reject 原因
						}, this.timeout) // 设定检测超时定时器
					})
			}),
			{
				get: (target, prop) => {
					if (prop === 'abort') {
						return abort
					} else {
						if (Reflect.get(target, prop) && Reflect.get(target, prop).bind) {
							return Reflect.get(target, prop).bind(target)
						} else {
							return Reflect.get(target, prop)
						}
					}
				},
			}
		)
	}
	// request
	request(
		method: string,
		url: string,
		data: any,
		header: any,
		reqIntercept: any,
		resIntercept: any
	) {
		let timer: Timer
		let requestTask // requestTask 网络请求 task 对象
		let aborted = false // aborted 请求是否已被取消
		let overtime = false // overtime 请求是否超时
		const abort = () => {
			// timer 检测超时定时器，requestTask 网络请求 task 对象，aborted 请求是否已被取消，abort 取消请求方法
			aborted = true // 将请求状态标记为已取消
			requestTask ? requestTask.abort() : '' // 执行取消请求方法
		}
		return new Proxy(
			new Promise((resolve, reject) => {
				this.interceptors.request
					.intercept({ header: header || {}, body: data || {} }, method, url, data, reqIntercept)
					.then(async ({ header, body: data, cancel }) => {
						// 等待请求拦截器里的方法执行完
						if (aborted || cancel) {
							// 如果请求已被取消,停止执行,返回 reject
							await this.onerror(method, url, data, '网络请求失败：主动取消')
							return reject('网络请求失败：主动取消')
						}
						requestTask = uni.request({
							url: url[0] === '/' ? this.baseURL + url : url,
							data,
							method,
							header,
							success: async (res) => {
								//网络请求
								clearTimeout(timer) // 清除检测超时器
								!this.statusCode.includes(res.statusCode)
									? await this.onerror(
											method,
											url,
											data,
											`网络请求异常：服务器响应异常：状态码：${res.statusCode}`
									  )
									: ''
								this.interceptors.response.intercept(
									this.statusCode.includes(res.statusCode) ? resolve : reject,
									{
										success: this.statusCode.includes(res.statusCode),
										...res,
									},
									method,
									url,
									data,
									reject,
									reqIntercept
								) // 执行相应拦截器
							},
							fail: async (res) => {
								// console.log(res, 'res')
								clearTimeout(timer) // 清楚检测超时定时器
								!overtime &&
									(await this.onerror(
										method,
										url,
										data,
										aborted ? '网络请求失败：主动取消' : '网络请求失败:(URL无效|无网络|DNS解析失败)'
									))
								aborted
									? reject('网络请求失败：主动取消')
									: reject('网络请求失败:(URL无效|无网络|DNS解析失败)')
							},
						})
						timer = setTimeout(async () => {
							overtime = true
							requestTask.abort()
							await this.onerror(method, url, data, '网络请求失败：超时取消')
							reject('网络请求时间超时') // reject 原因
						}, this.timeout || 10000) // 设定检测定时器
					})
			}),
			{
				get: (target, prop) => {
					if (prop === 'abort') {
						return abort
					} else {
						if (Reflect.get(target, prop) && Reflect.get(target, prop).bind) {
							return Reflect.get(target, prop).bind(target)
						} else {
							return Reflect.get(target, prop)
						}
					}
				},
			}
		)
	}
	interceptors: {
		// 拦截器
		request: {
			interceptors: [],
				use(fun) {
					console.log(fun)
					this.interceptors.push(fun) 
				},
				async intercept(config, method, url, data, reqIntercept) {
					if (!reqIntercept) { // 如果请求允许被拦截
						for (let i = 0; i < this.interceptors.length; i ++) {
							config = await this.interceptors[i](config, method, url, data)
						}
					}
					return config
				}
		},
		response: {
			interceptors: [],
			use(fun, err) { this.interceptors.push(fun) },
			async intercept(STATUS, response, method, url, data, reject, resIntercept) {
				try{
					if (!resIntercept) { // 如果请求允许被拦截
						for (let i = 0; i < this.interceptors.length; i ++) {
							response = await this.interceptors[i](response, method, url, data)
						}
					}
					if (response.success) {
						return STATUS(typeof response.data === 'string' ? JSON.parse(response.data) : response.data)
					} else {
						delete response.success
						return STATUS(response, method, url, data)
					}
				}catch(e){
					reject(e)
				}
			}
		}

	}
}

module.exports Request