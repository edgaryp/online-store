import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import ProductPage from './views/ProductPage.vue'
import ProductNameFormat from './helpers/product-urls.js'
import BasketPage from './views/BasketPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [
        {
          path: 'product',
          redirect: '/'
        }
      ]
    },
    {
      path: '/product/:currentProductName',
      name: 'productPage',
      component: ProductPage,
      props: (route) => ({
        // replace - to space whitespace
        currentProductName: ProductNameFormat.getProductName(route.params.currentProductName)
      })
    },
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/basket',
      name: 'basketPage',
      component: BasketPage
    }
  ]
})
