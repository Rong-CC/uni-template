/*
 * @Description:
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-20 19:55:51
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-25 13:51:30
 */
import './composition'
import './uni.scss'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import $storage from './utils/storage/index.js'
Vue.config.productionTip = false
Vue.prototype.$storage = $storage
Vue.prototype.$uRouter = router // 当前路由对象，保存路由当前信息
// Vue.prototype.$uRouter = route // 路由对象，保存了实例方法
import uView from 'uview-ui'
Vue.use(uView)
// 如此配置即可
// uni.$u.config.unit = 'rpx'
const app = new (
	typeof App === 'function' ? App : Vue.extend(Object.assign({ mpType: 'app' }, App))
)()
app.$mount()
