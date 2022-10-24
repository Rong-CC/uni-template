/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-20 19:55:51
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-24 20:51:13
 */
import './composition'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import $storage from './utils/storage/index.js'
Vue.config.productionTip = false
// console.log(router, ':router')
Vue.prototype.$storage = $storage
Vue.prototype.$uRouter = router // 当前路由对象，保存路由当前信息
// Vue.prototype.$uRouter = route // 路由对象，保存了实例方法
const app = new (
	typeof App === 'function' ? App : Vue.extend(Object.assign({ mpType: 'app' }, App))
)()
app.$mount()
