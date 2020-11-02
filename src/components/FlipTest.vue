  
<template>
  <div class="wrap">
    <Flipper :flip-key="key">
      <Flipped :on-start="handleStart" flip-id="square" v-if="!open">
        <div class="square" @click="toggle">hello world how are you world hello world how are you worldhello world how are you worldhello world how are you worldhello world how are you worldhello world how are you worldhello world how are you worldhello world how are you worldhello world how are you worldhello world how are you worldhello world how are you worldhello world how are you worldhello world how are you worldhello world how are you world</div>
      </Flipped>
      <Flipped flip-id="square" v-else>
        <div class="full-screen-square" @click="toggle">hello world</div>
      </Flipped>
    </Flipper>
  </div>
</template>

<script>

import { Flipper, Flipped } from "vue-flip-toolkit";
export default {
  name: "double",
  components: {
    Flipper,
    Flipped
  },
  data() {
    return {
      open: false
    };
  },
  methods: {
    toggle() {
      this.open = !this.open;
    },
    handleStart(el) {
      console.log("Starting", el);
    },
    handleComplete(el) {
      console.log("Complete", el);
    }
  },
  computed: {
    key() {
      return this.open.toString();
    }
  }
};
</script>

<style scoped>
.square {
  width: 5rem;
  cursor: pointer;
  background-color: #7971ea;
}
.full-screen-square {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  cursor: pointer;
  background-color: #ff4c46;
  z-index: 1;
}
</style>