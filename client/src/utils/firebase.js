import firebaseConfig from './firebaseConfig'
import firebase from 'firebase/app'
import storage from 'firebase/storage'
import firestore from 'firebase/firestore'

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
db.Timestamp = firebase.firestore.Timestamp

export const fireStorage = firebase.storage()

export default firebase
