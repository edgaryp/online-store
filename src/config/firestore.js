import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDtiq9T9zoVXvuSoU1Rz9c-yr4AwRWmHfg",
  authDomain: "fir-ecfc5.firebaseapp.com",
  projectId: "fir-ecfc5"
}

firebase.initializeApp(config);

const db = firebase.firestore();

class Firebase {
  static async get(collection) {
    return await db.collection(collection).get();
  }
  static async batchUpdateCollection(data) {
    /**
    |--------------------------------------------------
    | Add, modify and delete all document fields in single collection
    | argument will need
    | obj -> to be merged into document
    | collect -> name of collection
    |--------------------------------------------------
    */
    const {collection, obj} = data;
    try {
      const promise = await this.get(collection);
      promise.forEach(async doc => {
        try {
          const promise = await db.collection(collection).doc(doc.id);
          promise.set(obj, {
            merge: true
          });
        } catch(error) {
          console.log('set() got error'); // eslint-disable-line
          throw error;
        }
      });
    } catch(error) {
      console.log('get() got error'); // eslint-disable-line
      throw error;
    }
  }
}

export {db, Firebase};