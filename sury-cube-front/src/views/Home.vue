<template>
  <v-app id="inspire">
      <v-btn class="mt-5" fixed left fab large dark color="primary" @click="toggleShowMakeRoom">
        <v-icon dark>mdi-plus</v-icon>
      </v-btn>
      <div class="room-card-wrapper">
        <room-card v-for="room in rooms"
                   class="room-card-wrapper--item"
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
import MakeRoomCard from '../components/MakeRoomCard.vue';
import RoomCard from '../components/RoomCard.vue';

export default {
  components: {
    MakeRoomCard,
    RoomCard,
  },
  data() {
    return {
      isShowMakeRoom: false,
      rooms: [
        {
          name: 'gogo',
          state: 'playing',
          players: ['bts','twice'],
          maxNumber: 2,
          joinedNumber: 2,
          hostPlayer: 'bts',
        },
        {
          name: 'temp',
          state: 'waiting',
          players: ['bts','twice'],
          maxNumber: 4,
          joinedNumber: 2,
          hostPlayer: 'twice',
        }],
    }
  },
  methods: {
    toggleShowMakeRoom() {
      this.isShowMakeRoom = !this.isShowMakeRoom;
    },
    makeRoom(newRoom) {
      this.rooms.push({
        ...newRoom,
        state: 'waiting',
        joinedNumber: 1,
        hostPlayer: newRoom.players[0],
      });
      this.toggleShowMakeRoom();
    },
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
    position: absolute;
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
      z-index: 10;
      width: 400px;
    }
  }

</style>
