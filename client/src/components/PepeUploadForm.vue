<template>
  <v-dialog
    v-model="dialog"
    max-width="50%"
    scrollable
    persistent
    :lazy="true"
    :no-click-animation="true"
  >
    <template v-slot:activator="{ on }">
      <v-btn color="primary" icon absolute dark fab bottom right v-on="on" class="btn-add-pepes">
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
          v-on:update:files="handleUpdateFiles($event)"
        ></file-upload-form>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="green darken-1"
          dark
          raised
          @click="submitForm()"
          :disabled="submitted || !this.pepes.length"
        >Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import FileUploadForm from "@/components/FileUploadForm.vue";
import { savePepeFiles, createPepeRecords } from "../utils/pepe";

export default {
  name: "PepeUploadForm",
  components: {
    FileUploadForm
  },
  data: () => ({
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
      const self = this;
      savePepeFiles(this.pepes).then(updatedPepes => {
        self.dialog = false;
        this.$emit("upload-finished", this.pepes);
      });
    }
  },
  watch: {
    dialog(newDialog, oldDialog) {
      // reset state if dialog with file upload has been closed
      if (!newDialog) {
        this.pepes = [];
        this.submitted = false;
      }
    }
  }
};
</script>

<style scoped>
.btn-add-pepes {
  bottom: 1rem;
  right: 1rem;
}

.list-item-img {
  object-fit: contain;
  width: 100%;
}
</style>
