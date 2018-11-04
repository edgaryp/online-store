import * as firebase from 'firebase'

const config = {
  apiKey: "AIzaSyDtiq9T9zoVXvuSoU1Rz9c-yr4AwRWmHfg",
  authDomain: "fir-ecfc5.firebaseapp.com",
  projectId: "fir-ecfc5"
}

firebase.initializeApp(config);

export const db = firebase.firestore();