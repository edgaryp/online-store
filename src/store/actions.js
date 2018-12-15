// /* eslint-disable */
import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import {db} from '../config/firestore'
import * as firebase from 'firebase'

export const actions = {
  async [actionTypes.INIT_FIREBASE_STORE]({commit, dispatch}) {
    firebase.auth().signInAnonymously().catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({errorCode, errorMessage}); // eslint-disable-line
    });
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in.
        const {isAnonymous, uid} = user;
        commit(mutationTypes.SET_SESSION_DETAILS, {user, isAnonymous, uid});
        dispatch(actionTypes.GET_BAKSET);
      } else {
        // User is signed out.
      }
    });
  },

  async [actionTypes.GET_PRODUCTS]({commit}) {
    try {
      const collectionProducts = await db.collection('products').get();
      if(collectionProducts.empty) {
        throw new Error('No products found');
      } else {
        collectionProducts.forEach(doc => {
          commit(mutationTypes.SET_PRODUCTS, doc.data());
        });
      }
    } catch(error) {
      throw error;
    }
  },

  async [actionTypes.POST_PRODUCT_TO_CART]({dispatch}, data) {
    /**
    |--------------------------------------------------
    | Data structure for carts in firestore
    | (C): Collection, (D): Document
    | basket(C) -> session uid(D) -> -> items(c) -> product id(C) -> product fields(D)
    | each products have 4 varitions, it will be stored at same lavel, this will make query easier for bakset
    |--------------------------------------------------
    */
    const {currentProduct, uid, quantity, selectedAttributes} = data;
    const {productId} = currentProduct;
    const itemRef = await db.collection('basket').doc(uid).collection('items').doc(`${productId}_${selectedAttributes.split(' ').join('_')}`);
    const getDocRef = await itemRef.get();
    if(!getDocRef.exists) {
      await itemRef.set({
        ...currentProduct,
        selectedAttributes,
        quantity,
        subTotalPrice: quantity * currentProduct.price,
      });
    } else {
      const {quantity: currentQuantity} = getDocRef.data();
      const newQuantity = currentQuantity + quantity;
      const newSubTotalPrice = newQuantity * currentProduct.price;
      await itemRef.set({
        ...currentProduct,
        selectedAttributes,
        quantity: newQuantity,
        subTotalPrice: newSubTotalPrice,
      }, {
        merge: true
      });
    }
    await dispatch(actionTypes.UPDATE_TOTAL_PRICE, quantity * currentProduct.price);
    dispatch(actionTypes.GET_BAKSET);
  },

  async [actionTypes.GET_BAKSET]({state, commit}) {
    const docRef = await db.collection('basket').doc(state.sessionStatus.uid);
    const [uidDoc, itemsCol] = await Promise.all([
      docRef.get().then(doc => doc.data()),
      docRef.collection('items').get()
    ]);
    let basketItems = [];
    if (!itemsCol.empty) {
      await itemsCol.forEach(doc => {
        basketItems.push(doc.data());
      });
      commit(mutationTypes.SET_BASKET, {basketItems, totalPrice: uidDoc.totalPrice});
    }
  },

  async [actionTypes.UPDATE_TOTAL_PRICE]({state}, newAmount) {
    const docRef = await db.collection('basket').doc(state.sessionStatus.uid);
    const uidDoc = await docRef.get().then(doc => doc.data());
    const currentTotalPrice = uidDoc ? uidDoc.totalPrice : 0;
    docRef.set({
      totalPrice: currentTotalPrice + newAmount
    }, {
      merge: true
    });
  },

  async [actionTypes.UPDATE_PRODUCT](undefined, data) {
    /**
    |--------------------------------------------------
    | Update products. Data argument should be an object.
    |--------------------------------------------------
    */
    db.collection('products').get().then(snhapshots => {
      snhapshots.forEach(doc => {
        db.collection('products').doc(doc.id).set(data, { merge: true })
      })
    })
  }
}
