import * as getterTypes from './getter-types'
import SortProducts from '@/helpers/sort.js'

export const getters = {
  async [getterTypes.GET_CURRENT_PRODUCT_P](state) {
    const currentProduct = await state.products.find(product => {
      return product.name === state.currentProductName;
    });
    return currentProduct;
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
  },
  [getterTypes.GET_FILTERED_PRODUCTS](state) {
    const result = [];
    state.products.forEach(product => {
      for(const key in state.appliedFilters) {
        const currentFilter = state.appliedFilters[key];
        const matchCategory = product.category === currentFilter.filter;
        const matchSearch = product.name.includes(currentFilter.filter) || product.description.includes(currentFilter.filter) || product.price.includes(currentFilter.filter);
        const matchPrice = parseInt(product.price) >= currentFilter.min && parseInt(product.price) <= currentFilter.max;

        if(matchCategory || matchSearch || matchPrice) {
          result.push(product);
        }
      }
    });
    return state.appliedFilters.length <= 0 ? SortProducts.sorting([...state.products], state.appliedSort) : SortProducts.sorting(result, state.appliedSort);
  }
}