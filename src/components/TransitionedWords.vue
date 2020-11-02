<template>  
  <transition-group :data-transitioned-words-id="id" name="list-complete" tag="span" :style="{ '--word-transition-duration' : `${this.transitionDuration}s`} " :class="{ modal: morphToModal }" ref="words" > 
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
       this.items = newWords.map(w => (this.items.find(other => other.word == w) || { id: uniqid(), word: w }));
    },
    morphToModal(isMorphing) {

     if (isMorphing)
     {
        let span = document.createElement('div');
     //   this.$el.closest('.sc-message--text').style.opacity = 0;
        span.innerHTML = "<div>Say yes!</div><button id='ok'>ok!</button>";
        document.body.appendChild(span);
        span.className = "test";
        let r = this.$el.getBoundingClientRect();

        span.querySelector('#ok').addEventListener('click', 
        () => { 
//        span.innerHTML = "<div>Say yes!</div>";
        span.innerHTML = "<div>Say yes!</div>";
      
        let r2 = this.$el.getBoundingClientRect();

        let thing = function() { span.style.display = "none"; document.querySelector('.modal').style.opacity = 1 }

        let chatMessageTextBox = { width: r2.width, height: r2.height, bottom: r2.bottom, top: r2.top, right: r2.right, left: r2.left, duration: .5, fontSize: 14, onComplete: thing };      
        // eslint-disable-next-line no-undef
        gsap.to('.test', chatMessageTextBox);
        
        });

        let from = { width: r.width, height: r.height, bottom: r.bottom, top: r.top, right: r.right, left: r.left };
        // eslint-disable-next-line no-undef
        gsap.fromTo(span, from,  { duration: .5, fontSize: 20, left: 0, right: 0, bottom: 0, top: 0,  width: '100vw', height: '100vh', opacity: .6 });
     }

     // let double = this.$el.cloneNode(true);
     // words.style.position = 'absolute';
      

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


.test {
  font-family: Helvetica Neue,Helvetica,Arial,sans-serif;
  font-weight: 300;
  font-size: 14px;
  line-height: 1.4;
  -webkit-font-smoothing: subpixel-antialiased;
  position:fixed;
  color: #fff;
  background-color: rgb(78, 140, 255); 
  display:inline-flex;
  align-items: center;
  justify-content: center;
}

.test div {
  display: inline-block;
}

</style>