import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueObserveVisibility from 'vue-observe-visibility'
import VueAWN from 'vue-awesome-notifications'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import Chartkick from 'vue-chartkick'
import Chart from 'chart.js'

Vue.use(Chartkick.use(Chart))
Vue.use(VueAWN)
Vue.use(VueObserveVisibility)
Vue.config.productionTip = false

Vue.directive('capitalizeText', {
  bind: function (el, binding) {
    el.style.textTransform = 'capitalize'
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
