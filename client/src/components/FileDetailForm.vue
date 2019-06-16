<template>
  <v-form v-model="valid" ref="detailsForm">
    <v-container grid-list-xl v-for="(file, index) of files" :key="index">
      <v-layout>
        <v-flex xs12 sm2>
            <v-img :src="file.src" :alt="file.name"></v-img>
        </v-flex>
        <v-flex xs12 sm9>
          <v-text-field v-model="file.name" label="File Name" maxlength="128"></v-text-field>
          <v-text-field v-model="file.username" label="Twitch User Name" maxlength="128"></v-text-field>
          <v-textarea v-model="file.description" label="Description" maxlength="255"></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
export default {
  name: "FilesDetailForm",
  data: () => ({
    valid: true
  }),
  props: {
    files: {
      type: Array,
      default: []
    }
  },
};
</script>

