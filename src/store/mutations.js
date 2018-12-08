// /* eslint-disable */
import * as mutationTypes from './mutation-types'

export const mutations = {
  [mutationTypes.SET_PRODUCTS](state, product) {
    state.products.push(product);
  },
  [mutationTypes.LOG_ERROR](state, error) {
    state.loadingErros.push(error);
  },
  [mutationTypes.CLEAR_APPLIED_FILTER](state) {
    state.appliedFilters = [];
  },
  [mutationTypes.SET_APPLIED_SORT](state, sort) {
    state.appliedSort = sort;
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
            min: getPriceFilterRange[0].min,
            max: getPriceFilterRange[0].max
          })
        })
        break;
      case 'search':
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
        state.loadingErros.push({'mutationTypes.SET_APPLIED_FILTERS': 'Filter type is not found'});
    }
  },
  [mutationTypes.SET_SELECTED_ATTRIBUTE](state, value) {
    state.selectedAttribute = value;
  },
  [mutationTypes.SET_ACTIVATED_SLIDE](state, value) {
    state.activatedSlide = value;
  },
  [mutationTypes.SET_SESSION_DETAILS](state, value) {
    const {user, isAnonymous, uid} = value;
    state.sessionStatus.user = user;
    state.sessionStatus.isAnonymous = isAnonymous;
    state.sessionStatus.uid = uid;
  }
}
