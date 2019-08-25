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
      <v-btn :disabled="isPlaying || isFulled" color="primary" @click="clickJoin">JOIN</v-btn>
    </v-card-actions>

    <div class="join-room-card-wrapper" v-if="isShowJoinRoom">
      <div class="join-room-card-wrapper--overlay"></div>
      <join-room-card class="join-room-card-wrapper--item"
                      @click-close="toggleShowJoinRoom"
                      @join-room="joinRoom"
      />
    </div>
  </v-card>
</template>

<script>
import JoinRoomCard from './JoinRoomCard.vue';

export default {
  components: { JoinRoomCard },
  props: {
    id: {
      type: String,
      required: true,
    },
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
    },
  },
  data() {
    return {
      isShowJoinRoom: false,
    };
  },
  computed: {
    currentCapacity() {
      return `${this.joinedNumber} / ${this.maxNumber}`;
    },
    isPlaying() {
      return this.state === 'playing';
    },
    isFulled() {
      return this.joinedNumber >= this.maxNumber;
    },
  },
  methods: {
    clickJoin() {
      this.toggleShowJoinRoom();
    },
    toggleShowJoinRoom() {
      this.isShowJoinRoom = !this.isShowJoinRoom;
    },
    joinRoom(playerName) {
      if (this.joinedNumber < this.maxNumber) {
        this.$store.dispatch('joinRoomAndSendMessage', { id: this.id, playerName });
        this.toggleShowJoinRoom();
        this.$router.push(`/room/${this.id}`);
      } else {
        alert('Full');
        this.toggleShowJoinRoom();
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .join-room-card-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;

  &--overlay {
     position: absolute;
     z-index: 0;
     width: 100%;
     height: 100%;
     background-color: black;
     opacity: 0.6;
   }

  &--item {
     position: absolute;
     width: 400px;
   }
  }
</style>
