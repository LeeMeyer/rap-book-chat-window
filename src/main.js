import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import Chat from 'vue-beautiful-chat'
import VueCompositionAPI from '@vue/composition-api'

Vue.use(VueCompositionAPI);
Vue.use(Chat)

Vue.use(VueCompositionAPI)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
