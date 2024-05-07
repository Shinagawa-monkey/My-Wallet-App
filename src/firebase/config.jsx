import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyAWgCFlEjqzLKSzaZykuUJj8PaItSUKMwo',
  authDomain: 'my-wallet-site.firebaseapp.com',
  projectId: 'my-wallet-site',
  storageBucket: 'my-wallet-site.appspot.com',
  messagingSenderId: '270768100443',
  appId: '1:270768100443:web:c0124e0ae54093305a9b7e',
}

//init firebase
firebase.initializeApp(firebaseConfig)

//init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()

//timestamp
const timestamp = firebase.firestore.Timestamp

export { projectFirestore, projectAuth, timestamp }
