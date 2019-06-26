<template>
  <v-container fluid fill-height>
    <v-layout>
      <v-flex xs12 sm4 offset-sm4 align-self-center>
        <v-card dark>
          <v-card-title>
            <h2 class="heading mx-auto">Login</h2>
          </v-card-title>
          <v-card-text>
            <v-form @submit.prevent="handleSubmit($event)" @keypress.enter="handleSubmit">
              <v-container>
                <v-layout column>
                  <v-flex xs12>
                    <v-text-field v-model="email" type="email" name="email" label="Email" required></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="password"
                      :append-icon="showPass ? 'visibility' : 'visibility_off'"
                      :type="showPass ? 'text' : 'password'"
                      name="password"
                      label="Password"
                      @click:append="showPass = !showPass"
                      required
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12 class="text-xs-center">
                    <v-btn color="success" type="submit" raised>Submit</v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="toast" top color="error" :timeout="5000">
      {{toastMessage}}
      <v-btn dark flat @click="toast = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      password: '',
      email: '',
      showPass: false,
      toast: false,
      toastMessage: ''
    }
  },
  methods: {
    handleSubmit (event) {
      this.$store.dispatch('userLogin', {
        email: this.email,
        password: this.password
      })
    }
  }
}
</script>
