import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import * as actionTypes from './store/action-types'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  created() {
    this.$store.dispatch(actionTypes.GET_PRODUCTS);
  },
  render: h => h(App)
}).$mount('#app')
