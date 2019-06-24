<template>
  <v-layout class="pepes" row wrap>
    <v-flex md3 sm6 xs12 v-for="pepe of pepes" :key="pepe.id">
      <v-img :src="pepe.fileUrl" :key="pepe.id" lazy-src="static/pepe_placeholder.gif"></v-img>
    </v-flex>
  </v-layout>
</template>

<script>
import { db } from '../utils/firebase'
export default {
  name: "Gallery",
  data: function() {
    return {
      pepes: []
    };
  },
  firestore: {
    pepes: db.collection("pepes").orderBy("timestamp", "desc")
  }
};
</script>

<style scoped>
body {
  background-color: black;
}

.pepes {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
}

.pepe-wrapper {
  flex: 0 0 25%;
  overflow: hidden;
}

.pepe {
  object-fit: contain;
  width: 100%;
}
</style>
