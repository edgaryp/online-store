import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import {db} from '../config/firestore'
import {products} from '../assets/products'

export const actions = {
  // data from local
  // async [actionTypes.GET_PRODUCTS]({commit}) {
  //   commit(mutationTypes.SET_PRODUCTS, products);
  // },

  // data from firestroe
  async [actionTypes.GET_PRODUCTS]({commit}) {
    try {
      const collectionProducts = await db.collection('products').get();
      collectionProducts.forEach(doc => {
        commit(mutationTypes.SET_PRODUCTS, doc.data());
      });
    } catch(error) {
      commit(mutationTypes.LOG_ERROR, {'actionTypes.GET_PRODUCTS': error});
    }
  },

  async [actionTypes.UPLOAD_PRODUCT]() {
    const collectionProducts = db.collection("products");

    // Delete
    const collectionSnap = await collectionProducts.get();
    collectionSnap.forEach(async (product, index) => {
      await collectionProducts.doc(product.id).delete();
      console.log(`(${index})Deleted: ${product.id} => ${product.data()}`); // eslint-disable-line
    });

    // Add
    products.forEach(async (product, index) => {
      await collectionProducts.add(product);
      console.log(`(${index})Done: ${product.name}`); // eslint-disable-line
    });
  }
}
