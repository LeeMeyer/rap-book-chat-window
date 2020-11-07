<template>  
  <transition-group :data-transitioned-words-id="id" class="words" name="list-complete" tag="div" :style="{ '--word-transition-duration' : `${this.transitionDuration}s`} " ref="words" > 
    <span
      v-for="item in items"
      v-bind:key="item.id"
      class="list-complete-item" :class="{ newline: item.word === '\n', word: !item.word.match(/^\W+$/g)  }"
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
    id: {
      type: String
    }
  },
  data() {
    return {  
      items: this.tokenize(this.transitionedHtml).map(w => ({ id: uniqid(), word: w })),
      nextNum: 10 
    }
  },
  watch: {
    transitionedHtml(newValue) {
       let newWords = this.tokenize(newValue);
       let oldItems = [...this.items];
       console.log(JSON.stringify(oldItems));
       let newItems = newWords.map(w => (oldItems.find(old => old.word === w) && oldItems.splice(oldItems.findIndex(old => old.word === w), 1)[0]) || { id: uniqid(), word: w });
       console.log(newItems.filter(w => !w.word))
       this.items = newItems;
    }
  },
  methods: {
    tokenize(s) {
      let tokens = s.match(/(\w|'|<|>|\/)+|\s+|\W/g) || [];
      return tokens.map(t => t.toLowerCase() === '<br>' ? "\n" : t);
    }
  }
 };
</script>

<style>
.list-complete-item {
  transition: all var(--word-transition-duration);
  display: inline-block;
}

.word::before {
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