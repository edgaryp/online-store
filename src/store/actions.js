// /* eslint-disable */
import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import {db} from '../config/firestore'
import * as firebase from 'firebase'

export const actions = {
  async [actionTypes.INIT_FIREBASE_STORE]({commit}) {
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
      } else {
        // User is signed out.
      }
    });
  },

  async [actionTypes.GET_PRODUCTS]({commit}) {
    const collectionProducts = await db.collection('products').get();
    collectionProducts.forEach(doc => {
      commit(mutationTypes.SET_PRODUCTS, doc.data());
    });
  },

  async [actionTypes.POST_PRODUCT_TO_CART](undefined, data) {
    /**
    |--------------------------------------------------
    | Data structure for carts in firestore
    | (C): Collection, (D): Document
    | carts(C) -> session uid(D) -> product id(C) -> product fields(D)
    | each products have 4 varitions, it will be stored at same lavel, this will make query easier for bakset
    |--------------------------------------------------
    */
    const {collection, currentProduct, uid, quantity, selectedAttributes} = data;
    const {productId} = currentProduct;
    const colRef = await db.collection(collection).doc(uid).collection(`${productId}_${selectedAttributes.split(' ').join('_')}`);
    const getColRef = await colRef.get();
    if(getColRef.empty) {
      await colRef.add({...currentProduct, selectedAttributes, quantity});
    } else {
      const currentDoc = await colRef.doc(getColRef.docs[0].id);
      const {quantity: currentQuantity} = await currentDoc.get().then(doc => doc.data());
      await currentDoc.set({
        ...currentProduct,
        selectedAttributes,
        quantity: currentQuantity + quantity
      },  {
        merge: true
      });
    }
  }

  // async [actionTypes.GET_BASKETS]({state, commit}, data) {
  //   const {uid, } = state.sessionStatus;
  //   const collectionRef = await db.collection('baskets').where()
  // }

  // async [actionTypes.UPLOAD_PRODUCT]({}, data) {
    // const collectionProducts = await db.collection("user").get();
    // collectionProducts.forEach(async doc => {
      // db.collection("user").doc(doc.id).update({
      //   productId: firebase.firestore.FieldValue.delete()
      // }).then(() => {
      //   console.log(doc.data());
      // });
      // promise.set({
      //   productId: doc.id
      // }, { merge: true })
      // console.log(doc.data());
    // });

    // // Delete
    // const collectionSnap = await collectionProducts.get();
    // collectionSnap.forEach(async (product, index) => {
    //   await collectionProducts.doc(product.id).delete();
    //   console.log(`(${index})Deleted: ${product.id} => ${product.data()}`); // eslint-disable-line
    // });

    // // Add
    // products.forEach(async (product, index) => {
    //   await collectionProducts.add(product);
    //   console.log(`(${index})Done: ${product.name}`); // eslint-disable-line
    // });
  // }, 
}
