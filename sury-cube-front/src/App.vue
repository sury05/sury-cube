<template>
  <v-app>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

import { getRooms } from './services/room';

export default {
  name: 'App',
  components: {
  },
  async mounted() {
    const rooms = await getRooms();
    this.$store.commit('setRooms', rooms);
  },
  data: () => ({
    //
  }),
};
</script>
