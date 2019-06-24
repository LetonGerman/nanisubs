<template>
  <v-container fluid>
    <v-layout class="pepes" row wrap>
      <v-flex xs12 sm8 offset-sm2>
        <pepe-list-view :pepes="pepes" :allowRemove="true" @pepe:remove="removePepe">
          <span slot="listHeader">All Pepes</span>
        </pepe-list-view>
      </v-flex>
      <pepe-upload-form @upload-finished="handleUploadFinished($event)"></pepe-upload-form>
      <v-snackbar v-model="toast" top color="success" :timeout="5000">
        {{toastMessage}}
        <v-btn dark flat @click="toast = false">Close</v-btn>
      </v-snackbar>
    </v-layout>
  </v-container>
</template>

<script>
import { db } from '../utils/firebase'
import { removePepe } from '../utils/pepe'
import PepeUploadForm from '@/components/PepeUploadForm'
import PepeListView from '@/components/PepeListView'
export default {
  name: 'Dashboard',
  components: {
    PepeUploadForm,
    PepeListView
  },
  data: function () {
    return {
      pepes: [],
      toast: false,
      toastMessage: ''
    }
  },
  methods: {
    handleUploadFinished (event) {
      this.toast = true
      this.toastMessage = `Successfully uploaded ${event.length} ${
        event.length === 1 ? 'file' : 'files'
      }`
    },
    removePepe (pepe, index) {
      removePepe(pepe).then(() => {
        this.toast = true
        this.toastMessage = 'Successfully removed pepe'
      })
    }
  },
  firestore: {
    pepes: db.collection('pepes').orderBy('timestamp', 'desc')
  }
}
</script>

<style scoped>
.wrapper {
  color: #fff;
}

.pepes {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.pepe-wrapper {
  flex: 0 0 10%;
  overflow: hidden;
}

.pepe {
  object-fit: contain;
  width: 100%;
}

img.selected {
  border: solid green 2px;
}
</style>
