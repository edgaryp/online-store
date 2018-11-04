import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'

export const actions = {
  [actionTypes.GET_PRODUCTS]({commit}, value) {
    commit(mutationTypes.SET_PRODUCTS, value);
  }
}