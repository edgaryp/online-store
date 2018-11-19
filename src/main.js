import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index'
import * as actionTypes from './store/action-types'
import colors from 'vuetify/es5/util/colors'
import Vuetify from 'vuetify'

Vue.config.productionTip = false

Vue.use(Vuetify, {
  theme: {
    primary: '#f60', // #E53935
    secondary: colors.red.lighten4, // #FFCDD2
    accent: colors.indigo.base // #3F51B5
  }
})

new Vue({
  store,
  router,
  created() {
    this.$store.dispatch(actionTypes.GET_PRODUCTS);
  },
  render: h => h(App)
}).$mount('#app')
