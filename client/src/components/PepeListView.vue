<template>
  <v-list dark two-line>
    <slot name="listHeader">
    </slot>
    <template v-for="(pepe, index) in pepes">
      <v-list-tile :key="index">
        <v-flex xs8 sm2>
          <v-img :src="pepe.src" contain height="64px"></v-img>
        </v-flex>
        <v-list-tile-content>
          <v-list-tile-title v-html="pepe.name"></v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action v-if="showProgress">
          <v-tooltip bottom v-if="pepe.hasError">
            <template v-slot:activator="{ on }">
              <v-icon color="red" v-on="on">warning</v-icon>
            </template>
            <span>{{pepe.errorMessage}}</span>
          </v-tooltip>
          <v-progress-circular
            light
            v-else-if="!pepe.hasError && pepe.progress !== null"
            :rotate="-90"
            :size="32"
            :value="pepe.progress"
            :color="pepe.progress === 100 ? 'green' : 'primary'"
          >
            <span class="caption" v-if="pepe.progress < 100">{{ pepe.progress }}%</span>
            <v-icon v-else small>check</v-icon>
          </v-progress-circular>
        </v-list-tile-action>
        <v-list-tile-action v-if="allowRemove">
          <v-btn icon @click="removePepe(pepe, index)">
            <v-icon>delete</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </template>
  </v-list>
</template>

<script>
export default {
  name: 'PepeListView',
  props: ['pepes', 'allowRemove', 'showProgress'],
  methods: {
    removePepe (pepe, index) {
      this.$emit('pepe:remove', pepe, index)
    }
  }
}
</script>
