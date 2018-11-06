import * as mutationTypes from './mutation-types'

export const mutations = {
  [mutationTypes.SET_PRODUCTS](state, product) {
    state.products.push(product);
  },
  [mutationTypes.LOG_ERROR](state, error) {
    state.loadingErros.push(error);
  },
  [mutationTypes.SET_CURRENT_PRODUCT_NAME](state, currentProductName) {
    state.currentProductName = currentProductName;
  }
}