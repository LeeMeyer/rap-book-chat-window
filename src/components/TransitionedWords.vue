<template>  
  <transition-group :data-transitioned-words-id="id" class="words" name="list-complete" tag="div" :style="{ '--word-transition-duration' : `${this.transitionDuration}s`}" @after-leave="$emit('complete')" > 
    <span
      v-for="item in items"
      :key="item.id"
      class="list-complete-item" :class="{ spaced: !allowHtml, newline: item.isNewline }">
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
       let newItems = newWords.map(newItem => (oldItems.find(old => this.tokensMatch(old, newItem)) && oldItems.splice(oldItems.findIndex(old => this.tokensMatch(old, newItem)), 1).map(old => ({ ...newItem, id: old.id }))[0]) || newItem);
       this.items = newItems;
    }
  },
  methods: {
    tokenize(s) {
      
       let matches = [];
       
       if (!this.allowHtml) {
          matches = s.matchAll(/(?<prefix>[^\w\s]*)(?<word>[\w'-]+)(?<suffix>([^\w\s]|\n)*)/g);
       }
       else {
         matches = s.matchAll(/(?<word>\n|(\w|')+|(<[^<>]+>[^<>]+<\/[^<>]+>)|\s+|\W)(?<suffix>(\n)*)/g);
       }

       let tokens = [];

       for(let match of matches) {
          let { prefix, word, suffix } = match.groups;
          tokens.push({ prefix: prefix || '', word, suffix: suffix.trim() || '', id: uniqid() });
          
          if (suffix.indexOf('\n') > -1) {
            tokens.push({ prefix: '', word: '', suffix: '', isNewline: true, id: uniqid() })
          }
       }

       return tokens;
    },
    tokensMatch(t1, t2) {
      return t1.word.trim() === t2.word.trim();
    }
  }
 };
</script>

<style scoped>
.list-complete-item {
  transition: all var(--word-transition-duration);
  display: inline-block;
  height: 3px;
}

.spaced::before {
  content: '\a0';
}

.list-complete-enter, .list-complete-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.list-complete-leave-active {
  position: absolute;
}

.newline {
  display: block;
}
</style>