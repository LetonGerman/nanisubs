<template>
  <div class="wrapper">
    <div class="pepes">
      <div class="pepe-wrapper" v-for="pepe in pepes" :key="pepe.name">{{ pepe.name }}</div>
      <pepe-upload-form></pepe-upload-form>
    </div>
  </div>
</template>

<script>
import { db } from "../utils/firebase";
import PepeUploadForm from '@/components/PepeUploadForm.vue'
export default {
  name: "Dashboard",
  components: {
    PepeUploadForm
  },
  data: function() {
    return {
      pepes: []
    };
  },
  firestore: {
    pepes: db.collection("pepes")
  },
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
