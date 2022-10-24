/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-22 16:00:34
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-24 11:25:04
 */
interface requestProp {
	baseURL: string
	timeout: number
	headers: object
	statusCode: number[]
}
interface InterceptorsRequestProp {
	interceptors: Array
	use: (fun) => {}
	intercept: (config, method, url, data, reqIntercept) => {}
}
interface InterceptorsResponseProp {
	interceptors: Array
	use: (fun) => {}
	intercept: (STATUS, response, method, url, data, reject, resIntercept) => {}
}
interface interceptorsProp {
	request: InterceptorsRequestProp
	response: InterceptorsResponseProp
}
type Timer = ReturnType<typeof setTimeout>
export { requestProp, Timer, interceptorsProp }
