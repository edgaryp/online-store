import * as getterTypes from './getter-types'

export const getters = {
  [getterTypes.GET_CURRENT_PRODUCT](state) {
    return state.products.find(product => {
      return product.name === state.currentProductName;
    });
  },
  [getterTypes.GET_CATEGORY](state) {
    const categories = [];
    state.products.forEach(product => {
      if(product.category && !categories.includes(product.category)) {
        categories.push(product.category);
      }
    });
    return categories;
  },
  [getterTypes.GET_PRICE_RANGE_LIST](state) {
    const priceRangelist = [];
    state.priceFilterRange.forEach(element => {
      priceRangelist.push(element.filter);
    });
    return priceRangelist;
  }
}