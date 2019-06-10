<template>
  <div>
    <div class="pepes">
      <div class="pepe-wrapper" v-for="n in pepes" :key="n.name">
        <img
          class="pepe"
          :class="{selected: n.selected}"
          @click="selectPepe(n)"
          :src="n.href"
          alt="a sub pepe drawing"
        >
      </div>
    </div>
    <v-btn
      @click="deletePepes"
    >
      Delete
    </v-btn>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  data: function () {
    return {
      pepes: [
        {
          name: 'dante',
          href: '/static/dante.png'
        },
        {
          name: 'foszki',
          href: '/static/foszki.png'
        },
        {
          name: 'hope',
          href: '/static/hope.png'
        },
        {
          name: 'hereza',
          href: '/static/hereza.png'
        },
        {
          name: 'port80se',
          href: '/static/port80se.png'
        }]
    }
  },
  methods: {
    selectPepe (pepe) {
      this.$set(pepe, 'selected', (!pepe.selected))
      // console.log(this.pepes) // !hero.selected
    },
    deletePepes () {
      for (let pepe in this.pepes) {
        // console.log(this.pepes[pepe])
        if (this.pepes[pepe].selected) {
          this.pepes.splice(pepe, 1)
        }
      }
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
