<template>  
  <!--<span class="modal" ref="modalWords">
      {{ messageText }}
</span>-->
    <TransitionedWords class="modal" ref="modalWords" :transitionedHtml="messageText" :transitionDuration="transitionDuration" />    
</template>

<script>
import TransitionedWords from './TransitionedWords'
import { mapState } from 'vuex';


export default {
  components: {
    TransitionedWords
  },
  name: 'ScoreExplanationModal',
  data() {
      return {
        messageText: '',
        transitionDuration: 0
      }
  },
  computed: mapState({
    messageForWhichToExplainScore: state => state.messageForWhichToExplainScore,
    scoreExplanantionModalIsOpen: state => state.scoreExplanantionModalIsOpen
  }),
  watch: {
    scoreExplanantionModalIsOpen(value) {

        let chatMessageElementToMorph = document.querySelector(`[data-transitioned-words-id=${this.messageForWhichToExplainScore.id}]`);
        let r = chatMessageElementToMorph.getBoundingClientRect();
        
        let from = { width: r.width, height: r.height, bottom: r.bottom, top: r.top, right: r.right, left: r.left };
    
        this.messageText = this.messageForWhichToExplainScore.data.text; 

        if (value) {
            chatMessageElementToMorph.style.opacity = 0;
            // eslint-disable-next-line no-undef
            gsap.fromTo(this.$refs.modalWords.$el, from,  { duration: .5, fontSize: 20, left: 0, right: 0, bottom: 0, top: 0,  width: '100vw', height: '100vh', opacity: .6  });
        }
    }
  }
 };
</script>

<style>
.modal {
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

.modal div {
  display: inline-block;
}

.modal {
    position: fixed;
}
</style>