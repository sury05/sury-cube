<template>
  <draggable @end="dropCard">
    <div
      class="mx-auto chip"
    >
      <div class="circle">
        <div :class="[colorClass, 'text']">{{number}}</div>
      </div>
    </div>
  </draggable>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: 'red',
    },
    number: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    colorClass() {
      return `${this.color}--text`;
    },
  },
  methods: {
    dropCard(event) {
      const { originalEvent } = event;
      this.$emit('drop-card', this.id, originalEvent.clientX, originalEvent.clientY);
    },
  },
};
</script>

<style scoped>
  .chip {
    width: 80px;
    height: 120px;
    background-color: #ffeec3;
    display: flex;
    justify-content: center;
    box-shadow: 1px 2px 8px 0px gray;
  }
  .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10px;
    width: 70px;
    height: 70px;
    border-radius: 50%;
    background: radial-gradient( ellipse, white, #f8f5dd, #f7e6bb);
  }
  .text {
    font-size: 45px;
    font-weight: bold;
  }
</style>
