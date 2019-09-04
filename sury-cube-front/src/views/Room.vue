<template>
  <div class="room-wrapper">
    <room-information-card class="room-information-card" :room="room"></room-information-card>
    <div class="ready-button-wrapper" v-if="room.state === 'waiting'">
      <ready-button :joined-number="room.joinedNumber"
                    :ready-number="room.readyNumber"
                    @click-ready="clickReadyButton">
      </ready-button>
    </div>
    <div v-else-if="room.state === 'playing'">
      <div class="left-card-area">
        <div v-for="(value, index) in new Array(100)" :key="index" style="background-color: gray"></div>
      </div>
      <div class="player-card-wrapper">
        <div v-for="({id, color, number}) in cards" :key="id">
          <rummi-chip :id="id" :color="color" :number="number" @drop-card="dropCard"></rummi-chip>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import ReadyButton from '../components/buttons/ReadyButton.vue';
import RoomInformationCard from '../components/cards/RoomInformationCard.vue';
import { sendReadyRoom } from '../socket/send-message';
import RummiChip from '../components/RummiChip.vue';
import { getRoom } from '../services/room';
import { getUserName } from '../storage/localstorage';

export default {
  components: {
    RummiChip,
    RoomInformationCard,
    ReadyButton,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      xPosition: 0,
      yPosition: 0,
    };
  },
  async mounted() {
    await this.getRoom();
  },
  computed: {
    ...mapState([
      'playerName',
      'rooms',
    ]),
    cards() {
      return this.room.cards.players[getUserName()];
    },
    room() {
      return this.$store.state.rooms.filter(({ id }) => id === this.id)[0] || {};
    },
  },
  methods: {
    async getRoom() {
      const room = await getRoom(this.id, getUserName());
      this.$store.commit('updateRoom', room);
    },
    clickReadyButton(readyNumber) {
      sendReadyRoom({ id: this.id, readyNumber });
    },
    dropCard(id, xPosition, yPosition) {
      console.log(id, xPosition, yPosition);
    },
  },
};
</script>

<style scoped>
  .room-wrapper {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

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
  .left-card-area {
    padding-top: 100px;
    display: grid;
    grid-template-columns: repeat(10, 80px);
    grid-column-gap: 5px;
    grid-row-gap: 10px;
    grid-template-rows: repeat(3, 120px);
  }
  .player-card-wrapper {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    width: 800px;
  }
</style>
