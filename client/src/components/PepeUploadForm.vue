<template>
  <v-dialog
    dark
    v-model="dialog"
    max-width="50%"
    scrollable
    persistent
    :lazy="true"
    :no-click-animation="true"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary" small icon-right dark v-on="on" class="btn-add-pepes">
        Add Pepes
        <v-icon>add</v-icon>
      </v-btn>
    </template>
    <v-card>
      <v-card-title class="my-0 pb-0">
        <span class="headline mx-auto">Upload Pepes</span>
      </v-card-title>
      <v-card-text>
        <file-upload-form
          ref="pepeForm"
          :files="pepes"
          :allowRemove="!submitted"
          v-on:update:files="handleUpdateFiles($event)"
        ></file-upload-form>
      </v-card-text>
      <v-card-actions>
        <v-btn flat @click="dialog = false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          raised
          @click="submitForm()"
          :disabled="submitted || !this.pepes.length"
        >Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FileUploadForm from '@/components/FileUploadForm.vue'
import { savePepeFiles } from '../utils/pepe'

export default {
  name: 'PepeUploadForm',
  components: {
    FileUploadForm
  },
  data: () => ({
    dialog: false,
    submitted: false,
    pepes: []
  }),
  methods: {
    changeStep (value) {
      this.step += value
    },
    handleUpdateFiles (files) {
      this.pepes = [...files]
    },
    submitForm () {
      this.submitted = true
      const self = this
      savePepeFiles(this.pepes).then(updatedPepes => {
        self.dialog = false
        this.$emit('upload-finished', this.pepes)
      })
    }
  },
  watch: {
    dialog (newDialog, oldDialog) {
      // reset state if dialog with file upload has been closed
      if (!newDialog) {
        this.pepes = []
        this.submitted = false
      }
    }
  }
}
</script>
