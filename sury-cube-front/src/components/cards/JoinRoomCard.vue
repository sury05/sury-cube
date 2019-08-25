<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Join Room</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text icon @click="clickClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-text-field
          id="playerName"
          name="playerName"
          v-model="playerName"
          label="Player Name"
          prepend-icon="mdi-face"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" @click="joinRoom">GO</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    playerName: '',
  }),
  methods: {
    clickClose() {
      this.$emit('click-close');
    },
    joinRoom() {
      this.$emit('join-room', this.playerName);
    },
  },
};
</script>
