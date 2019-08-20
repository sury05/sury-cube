<template>
  <v-card class="elevation-12">
    <v-toolbar
      color="primary"
      dark
      flat
    >
      <v-toolbar-title>Make Room</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text icon @click="clickClose">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-form>
        <v-select
          v-model="maxNumberOfPerson"
          :items="items"
          menu-props="auto"
          hide-details
          label="Max number of players"
          prepend-icon="mdi-account-plus"
          single-line
        ></v-select>
        <v-text-field
          id="roomName"
          name="roomName"
          v-model="roomName"
          label="Room Name"
          prepend-icon="mdi-home"
        ></v-text-field>
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
      <v-btn color="primary" @click="makeRoom">GO</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      items: [2,3,4,5],
      maxNumberOfPerson: null,
      roomName: '',
      playerName: '',
    }),
    methods: {
      clickClose() {
        this.$emit('click-close');
      },
      makeRoom() {
        this.$emit('make-room', {
          name: this.roomName,
          maxNumber: this.maxNumberOfPerson,
          players: [this.playerName],
        });
      },
    },
  }
</script>
