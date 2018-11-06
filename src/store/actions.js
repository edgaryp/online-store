import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import {db} from '../config/firestore'

export const actions = {
  async [actionTypes.GET_PRODUCTS]({commit}) {
    try {
      const collectionProducts = await db.collection('products').get();
      collectionProducts.forEach(doc => {
        commit(mutationTypes.SET_PRODUCTS, doc.data());
      });
    } catch(error) {
      commit(mutationTypes.LOG_ERROR, {'actionTypes.GET_PRODUCTS': error});
    }
  }
}