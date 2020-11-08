<template>  
  <transition-group :data-transitioned-words-id="id" class="words" name="list-complete" tag="div" :style="{ '--word-transition-duration' : `${this.transitionDuration}s`} " ref="words"> 
    <span
      v-for="item in items"
      :key="item.id"
      class="list-complete-item" :class="{ newline: item.word.indexOf('\n') > -1, word: !allowHtml && item.word.match(/^[^\W<>]+$/g)  }">
      <span v-if="allowHtml" v-html="item.word"></span>
      <span v-else v-text="item.word">aaa</span>
    </span>
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
    },
    allowHtml: {
      type: Boolean, 
      default: false
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
       let newItems = newWords.map(w => (oldItems.find(old => old.word === w) && oldItems.splice(oldItems.findIndex(old => old.word === w), 1)[0]) || { id: uniqid(), word: w });
       this.items = newItems;
    }
  },
  methods: {
    tokenize(s) {
        let tokens = s.match(/\n|(\w|')+|(<[^<>]+>[^<>]+<\/[^<>]+>)|\s+|\W/g) || [];
        return tokens.map(t => t.toLowerCase() === '<br>' || t.toLowerCase() === '\n' || t.toLowerCase() ===  '↵' ? "\n" : t);
    }
  }
 };
</script>

<style>
.list-complete-item {
  transition: all var(--word-transition-duration);
  display: inline-block;
  height: 3px;
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
}
</style>