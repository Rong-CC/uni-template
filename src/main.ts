/*
 * @Description: 
 * @Author: rongcheng
 * @@后台人员: xxx
 * @Date: 2022-10-20 19:55:51
 * @LastEditors: rongcheng
 * @LastEditTime: 2022-10-21 10:28:36
 */
import './composition'
import Vue from 'vue'
import App from './App.vue'


Vue.config.productionTip = false

const app = new (typeof App === 'function' ? App : Vue.extend(Object.assign({ mpType: 'app' }, App)))
app.$mount()
