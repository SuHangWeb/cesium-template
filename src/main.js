import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import 'github-markdown-css';

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control
import '@/assets/iconfont/iconfont.css';

//拷贝
import VueClipBoard from 'vue-clipboard2'
Vue.use(VueClipBoard)


//引入cesium相关文件
var cesium = require('cesium/Cesium');
var widgets = require('cesium/Widgets/widgets.css');
Vue.prototype.cesium = cesium
Vue.prototype.widgets = widgets

// import '@supermap/iclient3d-vue-for-webgl/lib/theme/index.css'
// import webgl3d from "@supermap/iclient3d-vue-for-webgl"
// app.use(webgl3d)  

import VueClipboard from "vue-clipboard2";
VueClipboard.config.autoSetContainer = true
Vue.use(VueClipboard);


import highlight from '@/common/highlight'
Vue.use(highlight)

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
