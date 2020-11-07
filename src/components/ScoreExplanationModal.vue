<template>
    <transition name="displayModalElement" duration="500">
      <div v-show="scoreExplanantionModalIsOpen" ref="modal" class="modal">
          <div>
              <div class="content" ref="content">
                  <TransitionedWords ref="modalWords" :transitionedHtml="messageText" :transitionDuration="transitionDuration" />
                  <button v-if="scoreExplanantionModalIsOpen" @click="$store.commit('closeScoreExplantion')" >OK</button>
              </div>
          </div>
      </div>
    </transition>   
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
        
        if (this.messageForWhichToExplainScore) 
        {
          let chatMessageElementToMorph = document.querySelector(`[data-transitioned-words-id=${this.messageForWhichToExplainScore.id}]`);
          let r = chatMessageElementToMorph.getBoundingClientRect();
          
          this.messageText = this.messageForWhichToExplainScore.data.text;
          chatMessageElementToMorph.style.opacity = 0;

          let from = { width: r.width, height: r.height, bottom: r.bottom, top: r.top, right: r.right, left: r.left, opacity: 1 };

          this.$refs.content.style.maxWidth = `${from.width}px`;
      
          if (value) {
              // eslint-disable-next-line no-undef
              gsap.fromTo(this.$refs.modal, from, { left: 0, right: 0, bottom: 0, top: 0,  width: '100vw', height: '100vh', backgroundColor: "rgba(78, 140, 255, .9)", onComplete: this.morphText });
              // eslint-disable-next-line no-undef
              gsap.to(this.$refs.content, { width: '40vw', maxWidth: 500, fontSize: '20px' }, 0);
          }
          else {
            // eslint-disable-next-line no-undef 
            gsap.to(this.$refs.modal, { ...from, onComplete: () => chatMessageElementToMorph.style.opacity = 1  } );
            // eslint-disable-next-line no-undef           
            gsap.to(this.$refs.content, { fontSize: '14px', width: "100vw", maxWidth: r.width }, 0);

            this.transitionDuration = .5;
            this.messageText = this.messageForWhichToExplainScore.data.text;
          }
        }
      
    },
    messageForWhichToExplainScore(value, oldValue) {
      if (oldValue && oldValue != value)
      {
        document.querySelector(`[data-transitioned-words-id=${oldValue.id}]`).style.opacity = 1;
      }
    }
  },
  methods: {
      morphText() {
          this.transitionDuration = 1; 
          this.messageText = "Rhyming reaction and abstraction earns 10 points! \n Rhyming your and more scores 10 points! \n Rhyming account unmount scores 10 points! \n Rhyming opponent and component scores 10 points!";
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
  position: absolute;
  color: #fff;
  background-color: rgb(78, 140, 255); 
  display:inline-flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  position: fixed;
  -webkit-overflow-scrolling: auto;
}

.modal .content {
  display: inline-block;
}
</style>