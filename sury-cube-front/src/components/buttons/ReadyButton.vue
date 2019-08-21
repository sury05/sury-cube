<template>
  <v-btn class="mx-2" style="width:250px;height: 250px;" fab dark color="primary" @click="toggleButton">
    <div style="display: flex; flex-direction: column;">
      <div style="font-size: 30px;" class="pb-3">{{ buttonText }}</div>
      <div>
        <v-icon medium :dense="false" v-for="n in joinedNumber">
          {{ readyNumber < n ? 'mdi-account-remove-outline' : 'mdi-account-check' }}
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
        required: true,
      },
    },
    data() {
      return {
        readyNumber: 0,
        buttonText: 'PLAY',
      }
    },
    methods: {
      toggleButton() {
        if(this.buttonText === 'PLAY') {
          this.readyNumber++;
          this.buttonText = 'WAITING...';
        } else {
          this.readyNumber--;
          this.buttonText = 'PLAY';
        }
      }
    },
  }
</script>

<style scoped>

</style>
