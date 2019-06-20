import { db, fireStorage } from './firebase'

const savePepeFile = pepe => {
  const task = fireStorage
    .ref()
    .child(`pepes/${pepe.tempId}`)
    .put(pepe.fileBlob)
  task.on(
    'state_changed',
    snapshot => updateProgress(snapshot, pepe, task),
    error => handleTaskError(error, pepe),
    () => savePepeRecord(task, pepe)
  )
  return task
}

const updateProgress = (snapshot, pepe, task) => {
  pepe.progress = Math.floor(
    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
  )
  return task
}

const handleTaskError = (error, pepe) => {
  switch (error.code) {
    case 'storage/unauthorized':
      pepe.errorMessage = "You don't have access to upload files"
      break
    case 'storage/canceled':
      pepe.errorMessage = 'Upload has been canceled'
      break
    default:
      pepe.errorMessage = 'Unknown error occured'
      break
  }
  if (error) {
    pepe.hasError = true
    throw new Error(pepe.errorMessage)
  }
}

const savePepeRecord = (task, pepe) => {
  return task.snapshot.ref.getDownloadURL().then(downloadURL => {
    pepe.fileUrl = downloadURL
    console.log(db)
    return db
      .collection('pepes')
      .add({
        name: pepe.name,
        fileName: `${pepe.name}.${pepe.fileBlob.type.split('/').pop()}`,
        username: pepe.username,
        description: pepe.description,
        fileUrl: downloadURL,
        timestamp: db.Timestamp.now()
      })
      .catch(error => handleTaskError({ code: null, message: error }, pepe))
  })
}

export const savePepeFiles = pepes => {
  return Promise.all(pepes.map(pepe => savePepeFile(pepe)))
}
