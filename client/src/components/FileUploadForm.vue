<template>
  <v-form v-model="valid" ref="filesForm">
    <v-container grid-list-xl>
      <v-layout flex-child wrap>
        <v-flex xs12 d-flex>
          <v-sheet
            class="d-flex dropzone"
            height="200"
            @dragenter.stop.prevent
            @dragover.stop.prevent
            @drop.stop.prevent="handleInputFileChange($event)"
          >
            <input
              type="file"
              multiple="true"
              accept="image/*"
              ref="fileUpload"
              class="input-file-upload"
              @change="handleInputFileChange($event)"
            >
            <button type="button" class="upload-trigger headline" @click="triggerInput()">
              <v-icon size="80px" color="grey lighten-3" class="icon-upload">photo_library</v-icon>Select or drop files
            </button>
          </v-sheet>
        </v-flex>
        <v-flex xs12 v-if="files.length > 0">
          <h3 class="heading">Selected Files</h3>
          <v-layout>
            <v-flex xs12>
              <v-layout row wrap>
                <v-flex xs6 sm4 md3 v-for="(file, i) in files" :key="i">
                  <v-card tile>
                    <v-img :src="file.src" height="100%" max-height="100px"></v-img>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn icon @click="removeFile(file, i)">
                        <v-icon>delete</v-icon>
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "FileUploadForm",
  data: () => ({
    valid: true
  }),
  props: {
    files: {
      type: Array,
      default: []
    }
  },
  methods: {
    resetForm() {
      // reset form and memory clean up for the object urls
      this.$refs.filesForm.reset();
      for (let file of this.files) {
        window.URL.revokeObjectURL(file.src);
      }
    },
    triggerInput() {
      // trigger the native file selector
      this.$refs.fileUpload.click();
    },
    removeFile(file, index) {
      // remove the file and clean up
      this.files.splice(index, 1);
      window.URL.revokeObjectURL(file);
    },
    handleInputFileChange(event) {
      let inputFiles;
      if (event.type === "change") {
        // triggered from file selector
        inputFiles = [...event.target.files];
      } else if (event.type === "drop") {
        // triggered by drag & drop
        inputFiles = [...event.dataTransfer.files];
      }
      if (inputFiles.length > 0) {
        // concat all files
        const updatedFiles = [
          ...this.files,
          ...inputFiles
            .filter(file => file.type.startsWith("image/"))
            .map(file => ({
              src: window.URL.createObjectURL(file),
              name: file.name,
              fileBlob: file
            }))
        ];
        // notify parent cmp that files have changed
        this.$emit("update:files", updatedFiles);
      }
    }
  }
};
</script>

<style scoped>
.dropzone {
  position: relative;
  border: 2px dashed rgba(0, 0, 0, 0.5);
}
.input-file-upload {
  display: none;
}

.icon-upload {
  display: block;
  opacity: 1;
}

.upload-trigger {
  z-index: 1;
}
</style>