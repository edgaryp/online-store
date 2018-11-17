import Vue from 'vue'
import Vuex from 'vuex'
import {actions} from './actions'
import {mutations} from './mutations'
import {getters} from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    products: [],
    currentProductName: null,
    loadingErros: [],
    appliedFilters: [],
    priceFilterRange: [
      { type: 'price', filter: '$30 and under$30 and under$30 and under$30 and under', min: 0, max: 30 },
      { type: 'price', filter: '$30 and under', min: 0, max: 30 },
      { type: 'price', filter: '$30 - $50', min: 30, max: 50 },
      { type: 'price', filter: '$50 - $100', min: 50, max: 100 },
      { type: 'price', filter: '$100 - $500', min: 100, max: 500 },
      { type: 'price', filter: '$500 - $2000', min: 500, max: 2000 },
      { type: 'price', filter: '$2000+', min: 2000, max: 9999999 }
    ]
  },
  mutations,
  actions,
  getters
})
