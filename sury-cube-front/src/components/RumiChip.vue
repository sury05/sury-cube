<template>
  <v-card
    class="mx-auto chip"
  >
    <span :class="red--text">{{number}}</span>
  </v-card>
</template>

<script>
export default {
  props: {
    color: {
      type: Number,
      default: 0,
    },
    number: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style scoped>
.chip {
  width: 50px;
  height: 150px;
  background-color: #FFF8E1;
}
</style>
