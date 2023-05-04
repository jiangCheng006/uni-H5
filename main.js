import Vue from 'vue'
import App from './App'

import store from './store'
Vue.prototype.$store = store

Vue.config.productionTip = false

App.mpType = 'app'

import base from 'config/base.config.js' // 常用配置，全局变量
Vue.use(base)

import ajax from 'common/Ajax/index.js' // Ajax方法挂载
Vue.use(ajax)

const app = new Vue({
    ...App
})
app.$mount()
