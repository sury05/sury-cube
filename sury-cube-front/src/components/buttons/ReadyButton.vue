<template>
  <v-btn class="mx-2 ready-button" fab dark color="primary" @click="toggleButton">
    <div style="display: flex; flex-direction: column;">
      <div style="font-size: 30px;" class="pb-3">{{ buttonText }}</div>
      <div>
        <v-icon :dense="false" medium
                v-for="n in joinedNumber"
                :key="n">
          {{ (readyNumber < n) ? 'mdi-account-remove-outline' : 'mdi-account-check' }}
        </v-icon>
      </div>
    </div>
  </v-btn>
</template>

<script>
export default {
  props: {
    joinedNumber: {
      type: Number,
      default: 0,
    },
    readyNumber: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      buttonText: 'READY!',
    };
  },
  methods: {
    toggleButton() {
      let resultNumber = this.readyNumber;
      if (this.buttonText === 'READY!') {
        resultNumber += 1;
        this.buttonText = 'WAITING...';
      } else {
        resultNumber -= 1;
        this.buttonText = 'READY!';
      }
      this.$emit('click-ready', resultNumber);
    },
  },
};
</script>

<style scoped>
  .ready-button {
    width:250px;
    height: 250px;
  }
</style>
