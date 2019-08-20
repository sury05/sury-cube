<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>{{ name }}</v-toolbar-title>
    </v-toolbar>
    <v-card-text>
      <v-text-field
        id="currentCapacity"
        :label="currentCapacity"
        name="currentCapacity"
        prepend-icon="mdi-account-plus"
      ></v-text-field>
      <v-select
        v-model="players"
        :items="players"
        attach
        chips
        label="Players"
        prepend-icon="mdi-face"
        multiple
      ></v-select>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn :disabled="isPlaying" color="primary">JOIN</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
    export default {
      props: {
        name: {
          type: String,
          default: 'Empty',
        },
        state: {
          type: String,
          default: 'waiting',
        },
        players: {
          type: Array,
          required: true,
        },
        maxNumber: {
          type: Number,
          required: true,
        },
        joinedNumber: {
          type: Number,
          required: true,
        }
      },
      computed: {
        currentCapacity() {
          return `${this.joinedNumber} / ${this.maxNumber}`;
        },
        isPlaying() {
          return this.state === 'playing';
        }
      },
    }
</script>

<style scoped>

</style>
