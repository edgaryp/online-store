import * as getterTypes from './getter-types'

export const getters = {
  [getterTypes.GET_CURRENT_PRODUCT](state) {
    return state.products.find(product => {
      return product.name === state.currentProductName;
    });
  }
}