<template>
  <v-card
    class="mx-auto"
  >
    <v-card-title class="d-flex justify-space-between">
      <div class="d-flex align-center">
        <div>{{room.name}}</div>&nbsp;&nbsp;
        <span class="grey--text subtitle-1">{{`(${room.joinedNumber}/${room.maxNumber})`}}</span>
      </div>
      <v-card-actions>
        <v-btn
          icon
          @click="show = !show"
        >
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card-title>
    <v-expand-transition>
      <div v-show="show">
        <v-card-text>
          <div class="grey--text subtitle-1">{{`players: ${playerNames}`}}</div>
          <div class="grey--text subtitle-1">{{`state: ${room.state}`}}</div>
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    room: {
      type: Object,
      default: () => ({
        id: '',
        name: '',
        players: [],
        joinedNumber: 0,
        maxNumber: 0,
        readyNumber: 0,
        state: '',
      }),
    },
  },
  data: () => ({
    show: false,
  }),
  computed: {
    playerNames() {
      if (this.room.players) {
        return this.room.players.map(player => player.name);
      }
      return [];
    },
  },
};
</script>

<style scoped>

</style>
