<template>
  <div class="form-wrapper">
    <v-dialog v-model="dialog" max-width="50%" scrollable :lazy="true" :no-click-animation="true">
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
            <file-upload-form ref="pepeForm" :files="pepes" v-on:update:files="handleUpdateFiles($event)"></file-upload-form>
          </template>
          <template v-if="step === 2">
            
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
          <v-btn color="green darken-1" v-if="step === 3" dark raised @click="submitForm()">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FileUploadForm from '@/components/FileUploadForm.vue';
export default {
  name: "PepeUploadForm",
  components: {
    FileUploadForm
  },
  data: () => ({
    step: 1,
    dialog: false,
    pepes: []
  }),
  methods: {
    changeStep(value) {
      this.step += value;
    },
    handleUpdateFiles(files) {
      this.pepes = [...files]
    }
  },
  watch: {
    dialog(newDialog, oldDialog) {
      // reset state if dialog with file upload has been closed
      if (!newDialog) {
        this.pepes = [];
        this.$refs.pepeForm.resetForm();
      }
    }
  }
};
</script>
