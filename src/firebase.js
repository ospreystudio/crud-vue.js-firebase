import firebase from 'firebase/app'

import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'



var firebaseConfig = {
    apiKey: "AIzaSyCdMRTQiceYBKbSKfBERhEp-tqw0npowLM",
    authDomain: "build-a-crud.firebaseapp.com",
    projectId: "build-a-crud",
    storageBucket: "build-a-crud.appspot.com",
    messagingSenderId: "692480906325",
    appId: "1:692480906325:web:2fe95680e8015bbc90f0dc"
  };

  firebase.initializeApp(firebaseConfig)

  // utils

  const db = firebase.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()

  //collections

const usersCollection = db.collection('users')

const gamesCollection = db.collection('games')

export {
    db,
    auth,
    storage,
    usersCollection,
    gamesCollection

}

