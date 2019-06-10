import { firebase } from 'firebase'

const firebaseConfig = {
  apiKey: 'apiKey',
  authDomain: 'authDomain',
  databaseURL: 'databaseURL',
  projectId: 'projectId',
  storageBucket: 'storageBucket',
  messagingSenderId: 'messagingSenderId',
  appId: 'appId'
}
firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()

export const storage = firebase.storage()

db.settings({ timestampsInSnapshots: true })

export default firebase.firestore
