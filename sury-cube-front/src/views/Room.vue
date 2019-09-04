<template>
  <div>
    <room-information-card class="room-information-card" :room="room"></room-information-card>
    <div class="ready-button-wrapper" v-if="room.state === 'waiting'">
      <ready-button :joined-number="room.joinedNumber"
                    :ready-number="room.readyNumber"
                    @click-ready="clickReadyButton">
      </ready-button>
    </div>
  </div>
</template>

<script>
import ReadyButton from '../components/buttons/ReadyButton.vue';
import RoomInformationCard from '../components/cards/RoomInformationCard.vue';
import { sendReadyRoom } from '../socket/send-message';

export default {
  components: {
    RoomInformationCard,
    ReadyButton,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  computed: {
    room() {
      return this.$store.state.rooms.filter(({ id }) => id === this.id)[0] || {};
    },
  },
  methods: {
    clickReadyButton(readyNumber) {
      sendReadyRoom({ id: this.id, readyNumber });
    },
  },
};
</script>

<style scoped>
  .room-information-card {
    position: fixed;
    top: 0;
    width: 400px;
    z-index: 10;
  }
  .ready-button-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
