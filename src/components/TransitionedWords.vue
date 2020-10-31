<template>  
  <transition-group name="list-complete" tag="span" :style="{ '--word-transition-duration' : `${this.transitionDuration}s`} " > 
    <span
      v-for="item in items"
      v-bind:key="item.id"
      class="list-complete-item"
    >{{item.word}}</span>
  </transition-group>
</template>

<script>

const uniqid = require('uniqid');

export default{
  name: 'TransitionedWords',
  props: {
     transitionedHtml: {
      type: String,
      default: ''
    },
    transitionDuration: {
      type: Number,
      default: 1
    }
  },
  data() {
    return { items: this.transitionedHtml.split(' ').map(w => ({ id: uniqid(), word: w })),
    nextNum: 10 }
  },
  watch: {
    transitionedHtml(newValue) {
       let newWords = newValue.split(' ');
       this.items = newWords.map(w => (this.items.find(other => other.word == w) || { id: uniqid(), word: w }));
    }
  }
 };
</script>

<style>
.list-complete-item {
  transition: all var(--word-transition-duration);
  display: inline-block;
}

.list-complete-item::after {
  content: '\a0';
}

.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}
</style>