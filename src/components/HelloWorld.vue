<template>
<div>
    <beautiful-chat ref="chat"
      :participants="participants"
      :titleImageUrl="titleImageUrl"
      :onMessageWasSent="onMessageWasSent"
      :messageList="messageList"
      :newMessagesCount="newMessagesCount"
      :isOpen="isChatOpen"
      :close="closeChat"
      :open="openChat"
      :showEmoji="true"
      :showFile="true"
      :showEdition="true"
      :showDeletion="false"
      :deletionConfirmation="false"
      :showTypingIndicator="showTypingIndicator"
      :showLauncher="false"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="true"
      :disableUserListToggle="false"
      :messageStyling="messageStyling"  
      @edit="editMessage" >

      <template v-slot:header>
          </template>
          <template v-slot:text-message-body="{ message }">
            <div style="padding: 5px;">
              <TransitionedWords  :id="message.id" :transitionedHtml="message.data.text" :transitionDuration="animationDuration" :morphToModal="!!message.scoreExplanation" />    
            </div>
              <div class="score-section animate__animated" :style="{ 'animation-delay': message.scoreAnimatedEntranceDelay }" :class="message.author == 'me' ? 'animate__lightSpeedInRight' : 'animate__lightSpeedInLeft'" @click="explainScore(message, $event)">
                  <span class="score">
                    <span class="rap-star animate__animated" :class="{ animate__heartBeat: message.oldScore < message.score }" :style="{ 'animation-delay': `${animationDuration}s` }" /> 
                    <AnimatedNumber :number="message.score" :delay="message.oldScore < message.score ? animationDuration * 2 : animationDuration" @animation-complete="$store.commit('updateOldScore', message)" />
                    <span class="explain-score-button">
                    <span class="text">why?</span>
                </span>
              </span>
            </div>
        </template>
      </beautiful-chat>
      <ScoreExplanationModal />
    </div>
</template>

<script>
import useRhymeHighlight from './use-rhyme-highlight';
import TransitionedWords from './TransitionedWords'
import AnimatedNumber from './AnimatedNumber'
import ScoreExplanationModal from './ScoreExplanationModal';
import { mapState } from 'vuex';


export default {
  components: {
    TransitionedWords,
    AnimatedNumber,
    ScoreExplanationModal
  },
  name: 'app',
  setup() {     
      return useRhymeHighlight(); 
  },
  data() {
    return {
      displayOverlay: false,
      animationDuration: 1,
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      showTypingIndicator: '', 
      colors: {
        header: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        launcher: {
          bg: '#4e8cff'
        },
        messageList: {
          bg: '#ffffff'
        },
        sentMessage: {
          bg: '#4e8cff',
          text: '#ffffff'
        },
        receivedMessage: {
          bg: '#eaeaea',
          text: '#222222'
        },
        userInput: {
          bg: '#f4f7f9',
          text: '#565867'
        }
      }, 
      alwaysScrollToBottom: true, 
      messageStyling: true 
    }
  },
  computed: mapState({
    messageList: state => state.messageList,
    isChatOpen: state => state.isChatOpen,
    newMessagesCount: state => state.newMessagesCount,
    participants: state => state.participants,
    messageForWhichToExplainScore: state => state.messageForWhichToExplainScore 
  }), 
  mounted() {
    this.$store.commit('openChatWindow');
  },
  methods: {
    sendMessage (text) {
      this.$store.commit('sendMessage', text);
    },
    onMessageWasSent (message) {
      this.$store.commit('onMessageWasSent', message);
    },
    openChat () {
      this.$store.commit('openChatWindow');
    },
    closeChat () {
     this.$store.commit('closeChatWindow');
    },
    editMessage(message){
      this.$store.commit('editMessage', message);
    },
    explainScore(message) {
      //this.displayOverlay = true;
      //let parentMessage = event.target.closest('.sc-message--text');
      this.$store.commit('explainScore', message);
      //let r = event.target.getBoundingClientRect();
      //let from = { width: r.width, height: r.height, bottom: r.bottom, top: r.top, right: r.right, left: r.left };
     // let chatRect = document.querySelector('.sc-chat-window').getBoundingClientRect();
      //let to = {  /* bottom: 0, top: 0, right: 0, left: 0, marginTop: '5vh',  marginLeft: '5vw', marginRight: '5vw',  width: '90vw', height: '90vh', */ duration: .25,  ease: "none" };

      //let messageClone = parentMessage.cloneNode(true);
     // let element = document.createElement('div');
     // element.style.position = 'absolute';
    //  element.style.zIndex = 1;
      //element.className = "sc-message--text";
     // element.style.backgroundColor = "blue";

     // document.body.appendChild(element);

      // eslint-disable-next-line no-undef
     // gsap.fromTo(element, from, to);

    },
    updateOldScore(message) {
      this.$store.commit('updateOldScore', message);
    }
  }
}
</script>

<style lang="scss">
#modal {
  position: absolute;
  z-index: 1;
  background-color: rgb(78, 140, 255);
  border-radius: 10px;
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.sc-message {
  margin-top: 20px;
}

.sc-user-input--text {
  width: 250px;
}

.sc-message--content {
  padding-top: 20px;
}

.score-section {
  position: absolute; 
  margin-top:5px; 
  margin-bottom: 5px; 
  cursor: pointer; 
  white-space:nowrap; 
  color: black; 
  right:50px;
}

.rap-star {
  display: inline-block;
}

.rap-star::after {
  content: '⭐'
}

.explain-score-button
{
  text-transform: uppercase;
  position: absolute;
}

.explain-score-button .text {
  text-decoration: underline;
}

.explain-score-button::before {
  content: '\a0('
}

.explain-score-button::after {
  content: ')'
}

</style>