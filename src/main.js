import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VueObserveVisibility from 'vue-observe-visibility'
import VueAWN from 'vue-awesome-notifications'

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
