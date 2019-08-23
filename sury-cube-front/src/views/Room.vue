<template>
  <div>
    <v-chip class="ma-5" color="primary" large>
      <v-icon left class="ml-5">mdi-gamepad-square</v-icon>
      <span class="mr-5">{{ room.name }}</span>
    </v-chip>
    <div class="mt-12 ml-12">
      <ready-button :joined-number="room.joinedNumber"></ready-button>
    </div>
  </div>
</template>

<script>
import ReadyButton from '../components/buttons/ReadyButton.vue';

export default {
  components: {
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
      room: {
        name: 'My Room',
        maxNumber: 4,
        joinedNumber: 4,
      },
    };
  },
};
</script>

<style scoped>
</style>
