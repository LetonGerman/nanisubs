<template>
  <div>
 <div class="pepes">
  <img class="pepe" v-for="n in 24" v-bind:key="n" v-bind:src="'http://lorempixel.com/500/500/sports/' + (n % 10)" alt="a sub pepe drawing">
   <p>{{ n }}</p>
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
  img {
    size: 100px;
  }
</style>
