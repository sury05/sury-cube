<template>
  <v-app id="inspire">
      <v-btn class="mt-5" fixed left fab large dark color="primary" @click="toggleShowMakeRoom">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <div class="room-card-wrapper">
        <room-card v-for="room in rooms"
                   :key="room.id"
                   class="room-card-wrapper--item"
                   :id="room.id"
                   :name="room.name"
                   :state="room.state"
                   :players="room.players"
                   :max-number="room.maxNumber"
                   :joined-number="room.joinedNumber"
        />
      </div>
      <div class="make-room-card-wrapper" v-if="isShowMakeRoom">
        <div class="make-room-card-wrapper--overlay"></div>
        <make-room-card class="make-room-card-wrapper--item"
                        @click-close="toggleShowMakeRoom"
                        @make-room="makeRoom"
        />
      </div>
  </v-app>
</template>

<script>
import { mapState } from 'vuex';

import MakeRoomCard from '../components/cards/MakeRoomCard.vue';
import RoomCard from '../components/cards/RoomCard.vue';
import { sendMakeRoom } from '../socket/send-message';

export default {
  components: {
    MakeRoomCard,
    RoomCard,
  },
  data() {
    return {
      isShowMakeRoom: false,
    };
  },
  methods: {
    toggleShowMakeRoom() {
      this.isShowMakeRoom = !this.isShowMakeRoom;
    },
    makeRoom(newRoom) {
      sendMakeRoom(newRoom);
      this.toggleShowMakeRoom();

      this.$router.push(`/room/${newRoom.id}`);
    },
  },
  computed: {
    ...mapState([
      'rooms',
    ]),
  },
};
</script>

<style scoped lang="scss">
  .room-card-wrapper {
    padding: 100px 100px;
    display: grid;
    grid-template-columns: 350px 350px 350px;
    grid-column-gap: 50px;
    grid-row-gap: 50px;

    &--item {
      width: 350px;
    }
  }

  .make-room-card-wrapper {
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
