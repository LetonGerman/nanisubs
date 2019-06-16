<template>
  <div class="form-wrapper">
    <v-dialog v-model="dialog" max-width="50%" scrollable persistent :lazy="true" :no-click-animation="true">
      <template v-slot:activator="{ on }">
        <v-btn color="primary" absolute dark fab bottom right v-on="on">
          <v-icon>add</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="my-0 pb-0">
          <span class="headline mx-auto">Upload Pepes</span>
        </v-card-title>
        <v-stepper :value="step" class="elevation-0 pb-3">
          <v-stepper-header class="elevation-0">
            <v-stepper-step step="1" :complete="step > 1">Select Pepes</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="2" :complete="step > 2">Add Pepe info</v-stepper-step>
            <v-divider></v-divider>
            <v-stepper-step step="3" :complete="step > 3">Verify Pepes</v-stepper-step>
          </v-stepper-header>
        </v-stepper>
        <v-card-text>
          <template v-if="step === 1">
            <file-upload-form
              ref="pepeForm"
              :files="pepes"
              v-on:update:files="handleUpdateFiles($event)"
            ></file-upload-form>
          </template>
          <template v-if="step === 2">
            <file-detail-form ref="detailsForm" :files="pepes"></file-detail-form>
          </template>
          <template v-if="step === 3">
            <v-list three-line>
              <template v-for="(pepe, index) in pepes">
                <v-list-tile :key="index">
                  <v-flex xs2 sm1 class="mr-4">
                    <v-img :src="pepe.src" class="list-item-img"></v-img>
                  </v-flex>
                  <v-list-tile-content>
                    <v-list-tile-title v-html="pepe.name"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="pepe.username"></v-list-tile-sub-title>
                  </v-list-tile-content>
                  <v-list-tile-action>
                    <v-tooltip bottom v-if="pepe.hasError">
                      <template v-slot:activator="{ on }">
                        <v-icon color="red" v-on="on">warning</v-icon>
                      </template>
                      <span>{{pepe.errorMessage}}</span>
                    </v-tooltip>
                    <v-progress-circular
                      v-else-if="!pepe.hasError && pepe.progress !== null"
                      :rotate="-90"
                      :size="32"
                      :value="pepe.progress"
                      :color="pepe.progress === 100 ? 'green' : 'primary'"
                    >
                      <span v-if="pepe.progress < 100">{{ pepe.progress }}</span>
                      <v-icon v-else small>check</v-icon>
                    </v-progress-circular>
                  </v-list-tile-action>
                </v-list-tile>
              </template>
            </v-list>
          </template>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn raised @click="changeStep(-1)" v-if="step > 1">Back</v-btn>
          <v-btn
            color="blue darken-1"
            v-if="step < 3"
            raised
            @click="changeStep(1)"
            :disabled="!this.pepes.length"
          >Next</v-btn>
          <v-btn color="green darken-1" v-if="step === 3" dark raised @click="submitForm()" :disabled="submitted">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FileUploadForm from "@/components/FileUploadForm.vue";
import FileDetailForm from "@/components/FileDetailForm.vue";
import { firebase, fireStorage } from "../utils/firebase";

export default {
  name: "PepeUploadForm",
  components: {
    FileUploadForm,
    FileDetailForm
  },
  data: () => ({
    step: 1,
    dialog: false,
    submitted: false,
    pepes: []
  }),
  methods: {
    changeStep(value) {
      this.step += value;
    },
    handleUpdateFiles(files) {
      this.pepes = [...files];
    },
    submitForm() {
      this.submitted = true;
      const uploadPromises = this.pepes.map(pepe => {
        const task = fireStorage
          .ref()
          .child(`pepes/${pepe.name}`)
          .put(pepe.fileBlob);
        return task.on(
          "state_changed",
          snapshot => updateProgress(snapshot, pepe),
          error => handleTaskError(error, pepe),
          () => {
            task.snapshot.ref.getDownloadURL().then(url => {
              pepe.fileUrl = url;
            });
            return pepe;
          }
        );
      });
      Promise.all(uploadPromises).then(updatedPepes => {
        console.log(updatedPepes)
        console.log(updatedPepes.map(pepe => pepe.fileUrl))
      })
    }
  },
  watch: {
    dialog(newDialog, oldDialog) {
      // reset state if dialog with file upload has been closed
      if (!newDialog) {
        this.pepes = [];
        this.step = 1;
      }
    }
  }
};

function updateProgress(snapshot, file) {
  file.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  return file;
}

function handleTaskError(error, pepe) {
  console.log(error, pepe);
  switch (error.code) {
    case "storage/unauthorized":
      pepe.errorMessage = "You don't have access to upload files";
      break;
    case "storage/canceled":
      pepe.errorMessage = "Upload has been canceled";
      break;
    case "storage/unknown":
      pepe.errorMessage = "Unknown error occured";
      break;
  }
  pepe.hasError = true;
  return pepe;
}
</script>

<style scoped>
.list-item-img {
  object-fit: contain;
  width: 100%;
}
</style>
