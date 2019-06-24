<template>
  <v-layout class="pepes" row wrap>
    <v-flex xs12 sm8 offset-sm2>
      <v-list dark three-line>
        <v-subheader>All Pepes</v-subheader>
        <template v-for="(pepe, index) in pepes">
          <v-list-tile :key="index">
            <v-avatar tile size="80" class="mr-3">
              <v-img :src="pepe.fileUrl" contain class="list-item-img"></v-img>
            </v-avatar>
            <v-list-tile-content>
              <v-list-tile-title v-html="pepe.name"></v-list-tile-title>
              <v-list-tile-sub-title v-html="pepe.username"></v-list-tile-sub-title>
            </v-list-tile-content>
            <v-list-tile-action>
              <v-btn icon @click="removepepe(pepe, i)">
                <v-icon>delete</v-icon>
              </v-btn>
            </v-list-tile-action>
          </v-list-tile>
        </template>
      </v-list>
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
    },
    removepepe(pepe, index) {
      this.pepes.splice(index, 1)
    }
  },
  firestore: {
    pepes: db.collection("pepes").orderBy("timestamp", "desc")
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
