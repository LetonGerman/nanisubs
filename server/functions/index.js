const functions = require('firebase-functions')
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccount.json')
const firebaseConfig = require('./firebaseConfig')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: firebaseConfig.databaseURL,
  storageBucket: firebaseConfig.storageBucket
})
exports.removeLinkedFiles = functions.firestore
  .document('pepes/{pepeID}')
  .onDelete((snap, context) => {
    const { tempId } = snap.data()
    if (tempId !== null && tempId !== undefined) {
      return admin
        .storage()
        .bucket()
        .getFiles({ directory: 'pepes/' })
        .then(data => {
          return data[0].find(
            file => file.name.replace('pepes/', '') === tempId
          )
        })
        .then(fileToRemove => {
          return fileToRemove.delete()
        })
        .then(data => {
          console.log('successfully removed a file named ' + tempId)
          return data
        })
        .catch(error => {
          return console.error(error)
        })
    } else {
      return null
    }
  })
