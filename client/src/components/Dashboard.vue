<template>
  <v-layout class="pepes" row wrap>
    <v-flex md3 sm6 xs12 v-for="pepe of pepes" :key="pepe.id">
      <v-img  :src="pepe.fileUrl" :key="pepe.id" lazy-src="static/pepe_placeholder.gif"></v-img>
    </v-flex>
    <pepe-upload-form @upload-finished="handleUploadFinished($event)"></pepe-upload-form>
    <v-snackbar v-model="toast" top color="success" :timeout="5000">
      {{toastMessage}}
      <v-btn dark flat @click="toast = false">Close</v-btn>
    </v-snackbar>
  </v-layout>
</template>

<script>
import { db } from "../utils/firebase";
import PepeUploadForm from "@/components/PepeUploadForm.vue";
export default {
  name: "Dashboard",
  components: {
    PepeUploadForm
  },
  data: function() {
    return {
      pepes: [],
      toast: false,
      toastMessage: ""
    };
  },
  methods: {
    handleUploadFinished(event) {
      this.toast = true;
      this.toastMessage = `Successfully uploaded ${event.length} ${
        event.length === 1 ? "file" : "files"
      }`;
    }
  },
  firestore: {
    pepes: db.collection("pepes").orderBy('timestamp', "desc")
  }
};
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
