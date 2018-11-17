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
  },
  [mutationTypes.CLEAR_APPLIED_FILTER](state) {
    state.appliedFilters = [];
  },
  [mutationTypes.SET_APPLIED_FILTERS](state, value) {
    state.appliedFilters = state.appliedFilters.filter(filter => filter.type != value.type);
    switch(value.type) {
      case 'category':
        value.filters.forEach(filter => {
          state.appliedFilters.push({
            type: value.type,
            filter: filter
          })
        });
        break;
      case 'price':
        value.filters.forEach(filter => {
          const getPriceFilterRange = state.priceFilterRange.filter(item => item.filter === filter) || null;
          state.appliedFilters.push({
            type: value.type,
            filter: filter,
            min: getPriceFilterRange[0].min || null,
            max: getPriceFilterRange[0].max || null
          })
        })
        break;
      case 'search':
        // state.appliedFilters = state.appliedFilters.filter(item => item.filter === value.filter);
        if(value.filter) {
          state.appliedFilters.push({
            type: value.type,
            filter: value.filter
          })
        } else {
          state.appliedFilters = state.appliedFilters.filter(item => item.filter != value.filter);
        }
        break;
      default:
        state.loadingErros.push({'mutationTypes.SET_APPLIED_FILTERS': 'Filter type has to be category or price'});
    }
  }
}
