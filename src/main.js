import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueObserveVisibility from 'vue-observe-visibility'
import VueSocketIO from 'vue-socket.io'
import * as io from 'socket.io-client'

Vue.use(VueObserveVisibility)
Vue.config.productionTip = false

Vue.use(new VueSocketIO({
  debug: true,
  connection: io(`${process.env.VUE_APP_SERVICE_API}`)
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
