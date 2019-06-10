<template>
  <div>
    <div class="pepes">
      <div class="pepe-wrapper" v-for="n in 24" :key="n">
        <img
          class="pepe"
          :src="'http://lorempixel.com/500/500/sports/' + (n % 10)"
          alt="a sub pepe drawing"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Gallery",
  data: function() {
    return {
      publicPath: process.env.BASE_URL,
    };
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
  justify-content: center;
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
