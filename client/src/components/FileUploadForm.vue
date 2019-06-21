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
          <v-list>
            <v-subheader>Selected Files</v-subheader>
            <template v-for="(file, index) in files">
              <v-list-tile :key="index">
                <v-flex xs2 sm1 class="mr-4">
                  <v-img :src="file.src" class="list-item-img"></v-img>
                </v-flex>
                <v-list-tile-content>
                  <v-list-tile-title v-html="file.name"></v-list-tile-title>
                  <v-list-tile-sub-title v-html="file.username"></v-list-tile-sub-title>
                </v-list-tile-content>
                <v-list-tile-action>
                  <v-tooltip bottom v-if="file.hasError">
                    <template v-slot:activator="{ on }">
                      <v-icon color="red" v-on="on">warning</v-icon>
                    </template>
                    <span>{{file.errorMessage}}</span>
                  </v-tooltip>
                  <v-progress-circular
                    v-else-if="!file.hasError && file.progress !== null"
                    :rotate="-90"
                    :size="32"
                    :value="file.progress"
                    :color="file.progress === 100 ? 'green' : 'primary'"
                  >
                    <span class="caption" v-if="file.progress < 100">{{ file.progress }}%</span>
                    <v-icon v-else small>check</v-icon>
                  </v-progress-circular>
                </v-list-tile-action>
                <v-list-tile-action>
                  <v-btn icon @click="removeFile(file, i)" :disabled="file.progress !== null">
                    <v-icon>delete</v-icon>
                  </v-btn>
                </v-list-tile-action>
              </v-list-tile>
            </template>
          </v-list>
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
              fileBlob: file,
              progress: null,
              username: "",
              description: "",
              tempId: Date.now()
                .toString(32)
                .substring(2)
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