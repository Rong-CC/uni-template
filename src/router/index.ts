/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-21 10:47:07
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-24 20:40:56
 */
// import uRouter from '../utils/router/index'
import $router, { $route } from '../utils/router/index.js'
const myRouter = $router
const myRoute = $route
myRouter.beforeEach = (to: any, next: any) => {
	// 注册全局前置守卫
	if (to.path.includes('/test')) {
		// 可以通过传一个回调给 next 来访问 $router 实例, 会返回一个 reject('在全局前置守卫 next 中重定向路由')
		next((vm: any) => {
			vm.push('/redirect')
		})
	} else if (to.path.includes('/redirect')) {
		next(false) //  中断当前的导航,会返回一个 reject('在全局前置守卫 next 中取消路由')
	} else {
		next() // 一定要调用该方法来 resolve 这个钩子
	}
}
export default {
	router: myRouter,
	route: myRoute,
}
