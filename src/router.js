import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ProductPage from './views/ProductPage.vue'
import ProductNameFormat from './helpers/product-urls.js'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/:currentProductName',
      name: 'productPage',
      component: ProductPage,
      props: (route) => ({
        // replace - to space whitespace
        currentProductName: ProductNameFormat.getProductName(route.params.currentProductName)
      })
    }
  ]
})
