<template>
  <div>
 <div class="pepes">
  <img class="pepe" v-for="(pepe, index) in images" v-bind:key="index" v-bind:src="pepe" alt="a sub pepe drawing">
   <p>{{ pepe }}</p>
 </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data: function () {
    return {
      publicPath: process.env.BASE_URL,
      images:
        ['/static/foszki.png', '/static/hereza.png', '/static/hope.png', '/static/port80se.png', '/static/dante.png']
    }
  }
}
</script>

<style scoped>
  body {
    background-color: black;
  }

  .pepes {
    display: flex;
    flex-wrap: wrap;
  }

  .pepe {
    flex: 0 0 25%;
  }
</style>
