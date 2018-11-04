import * as mutationTypes from './mutation-types'

export const mutations = {
  [mutationTypes.SET_PRODUCTS](state, value) {
    state.products = value;
  }
}