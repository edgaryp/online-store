import * as actionTypes from './action-types'
import * as mutationTypes from './mutation-types'
import {db} from '../config/firestore'
// import {products} from '../assets/products'

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

  async [actionTypes.POST_PRODUCT_TO_CART](undefined, data) {
    /**
    |--------------------------------------------------
    | Data structure for carts in firestore
    | (C): Collection, (D): Document
    | carts(C) -> session uid(D) -> product id(C) -> product fields(D)
    | each products have 4 varitions, it will be stored at same lavel, this will make query easier for bakset
    |--------------------------------------------------
    */
    const {collection, obj: currentProduct} = data;
    const {uid, productId, quantity, selectedAttributes} = currentProduct;
    try {
      const collectionRef = await db.collection(collection).doc(uid).collection(`${productId}_${selectedAttributes.split(' ').join('_')}`);
      const checkIfProductInCart = await collectionRef.get();
      // Check if this product is already exist in carts for current session
      if(checkIfProductInCart.empty) {
        // Adding products to the cart
        await collectionRef.add({collection, ...currentProduct});
        console.log('Product added:', {...currentProduct}); // eslint-disable-line
      } else {
        const isSelectedAttributesExist = await collectionRef.where('selectedAttributes', '==', selectedAttributes).get();
        if(!isSelectedAttributesExist.empty) {
          isSelectedAttributesExist.forEach(async doc => {
            const productInCart = doc.data();
            try {
              await collectionRef.doc(doc.id).set({
                // If any products details changed, overwrites them.
                ...currentProduct,
                // Increase the quantity as this product+selectedAttributes is already exist.
                quantity: productInCart.quantity + quantity
              }, {
                merge: true
              });
            } catch(error) {
              console.error("Error adding document: ", error); // eslint-disable-line
            }
          });
        } else {
          await collectionRef.add({collection, ...currentProduct});
        }
      }
    } catch(error) {
      console.error("Error adding document: ", error); // eslint-disable-line
    }
  }
}
