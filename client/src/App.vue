<template>
  <v-app dark id="app">
    <v-toolbar app flat dense  class="navigation">
      <v-btn flat icon :to="{name: 'Home'}">😤</v-btn>
      <v-spacer></v-spacer>
      <div class="hidden-sm-and-down">
        <v-btn flat :to="{name: 'Dashboard'}" v-if="isAuthenticated">Dashboard</v-btn>
        <v-btn flat color="green" :to="{name: 'Login'}" v-if="!isAuthenticated">Log In</v-btn>
        <v-btn flat color="red" v-if="isAuthenticated" @click="handleLogout">Log Out</v-btn>
      </div>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    isAuthenticated () {
      return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    handleLogout () {
      this.$store.dispatch('userSignOut')
    }
  }
}
</script>

<style>
.navigation .v-btn--active::before {
  background: none;
}
</style>
