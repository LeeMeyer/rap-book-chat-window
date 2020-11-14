<template>  
  <transition-group :data-transitioned-words-id="id" class="words" name="list-complete" tag="div" :style="{ '--word-transition-duration' : `${this.transitionDuration}s`} "> 
    <span
      v-for="item in items"
      :key="item.id"
      class="list-complete-item" :class="{ word: !allowHtml, newline: item.isNewline }">
      <span v-if="allowHtml" v-html="item.prefix + item.word + item.suffix"/>
      <span v-else v-text="item.prefix + item.word + item.suffix"></span>
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
      items: this.tokenize(this.transitionedHtml)
    }
  },
  watch: {
    transitionedHtml(newValue) {
       let newWords = this.tokenize(newValue);
       let oldItems = [...this.items];
       let newItems = newWords.map(newItem => (oldItems.find(old => old.word === newItem.word) && oldItems.splice(oldItems.findIndex(old => old.word === newItem.word), 1).map(old => ({ ...newItem, id: old.id }))[0]) || newItem);
       this.items = newItems;
    }
  },
  methods: {
    tokenize(s) {
       let matches = s.matchAll(/(?<prefix>[^\w\s]*)(?<word>[\w'-]+)(?<suffix>([^\w\s]|\n)*)/g);
       let tokens = [];

       for(let match of matches) {
          let { prefix, word, suffix } = match.groups;
          tokens.push({ prefix, word, suffix, id: uniqid() });
          
          if (suffix === '\n') {
            tokens.push({ prefix: '', word: '', suffix: '', isNewline: true, id: uniqid() })
          }
       }

       return tokens;
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