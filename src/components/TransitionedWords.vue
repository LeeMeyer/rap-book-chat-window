<template>  
  <transition-group :data-transitioned-words-id="id" class="words" name="list-complete" tag="div" :style="{ '--word-transition-duration' : `${this.transitionDuration}s`} " :class="{ modal: morphToModal }" ref="words" > 
    <span
      v-for="item in items"
      v-bind:key="item.id"
      class="list-complete-item" :class="{ newline: item.word == '\n' }"
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
    },
    morphToModal: {
      type: Boolean,
      default: false
    },
    id: {
      type: String
    }
  },
  data() {
    return {  
      items: this.transitionedHtml.split(' ').map(w => ({ id: uniqid(), word: w })),
      nextNum: 10 
    }
  },
  watch: {
    transitionedHtml(newValue) {
       let newWords = newValue.split(' ');
       this.items = newWords.map((w, i) => (newWords.lastIndexOf(w) === i && this.items.find(other => other.word === w)) || { id: uniqid(), word: w });
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
{
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
}

.words {
  display: inline-block;
}

.newline {
  display: block;
  margin-bottom: 5px; 
}
</style>