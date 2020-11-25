<template>
    <transition name="modal-transition" duration="500" @after-enter="okButtonExited = false" @before-leave="okButtonExited = true">
      <div v-show="scoreExplanantionModalIsOpen" ref="modal" class="modal">
          <div>
              <div class="content" ref="content">
                  <TransitionedWords ref="modalWords" :transitionedHtml="messageText" :transitionDuration="transitionDuration" />
                  <div class="button-section">
                    <m-fab :class="{ 'ok-enter': !okButtonExited }" :exited="okButtonExited" @click="$store.commit('closeScoreExplantion')">OK</m-fab>
                  </div>
              </div>
          </div>
      </div>
    </transition>   
</template>

<script>
import TransitionedWords from './TransitionedWords'
import { mapState } from 'vuex';
import Vue from 'vue';
import fab from 'material-components-vue/dist/fab';
import "material-components-vue/dist/fab/fab.min.css";

Vue.use(fab);

export default {
  components: {
    TransitionedWords
  },
  name: 'ScoreExplanationModal',
  data() {
      return {
        messageText: '',
        transitionDuration: 0,
        okButtonExited: true
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

          let color = this.messageForWhichToExplainScore.author === "me" ? "#fff" : "#000";

          let backgroundColor = this.messageForWhichToExplainScore.author === "me" ? "rgba(78, 140, 255, .8)" : "rgba(234, 234, 234, .8)";
          
          let from = { width: r.width, height: r.height, bottom: r.bottom, top: r.top, right: r.right, left: r.left, opacity: 1, color: color, backgroundColor: backgroundColor.replace('.8', '1') };

          this.$refs.content.style.maxWidth = `${from.width}px`;

          if (value) {
          
              // eslint-disable-next-line no-undef
              gsap.fromTo(this.$refs.modal, from, { left: 0, right: 0, bottom: 0, top: 0,  width: '100vw', height: '100vh', backgroundColor: backgroundColor, onComplete: this.morphText });
              // eslint-disable-next-line no-undef
              gsap.to(this.$refs.content, { width: '40vw', maxWidth: 500, fontSize: '20px' }, 0);
          }
          else {
            // eslint-disable-next-line no-undef 
            gsap.to(this.$refs.modal, { ...from, onComplete: () => chatMessageElementToMorph.style.opacity = 1  } );
            // eslint-disable-next-line no-undef           
            gsap.to(this.$refs.content, { fontSize: '14px', width: "100vw", maxWidth: r.width }, 0);
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
          this.messageText = this.$store.getters.getScoreExplanation;
      }
  }
 };
</script>

<style lang="scss">
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
  z-index: 2;

  .content {
    display: inline-block;

    .button-section
    {
      display: flex;
      margin-top: 10px;
      justify-content: flex-end;

      .ok-enter {
        transition-delay: .5s;
      }
    }
  }
}
</style>