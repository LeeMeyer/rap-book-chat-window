<template>
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
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="true"
      :disableUserListToggle="false"
      :messageStyling="messageStyling"  
      @edit="editMessage" >
      <template v-slot:text-message-body="{ message }">
        <div style="padding: 5px;">
           <TransitionedWords :transitionedHtml="message.data.text" :transitionDuration="animationDuration" />    
        </div>
          <div class="score-section animate__animated" :style="{ 'animation-delay': message.scoreAnimatedEntranceDelay }" :class="message.author == 'me' ? 'animate__lightSpeedInRight' : 'animate__lightSpeedInLeft'" @click="explainScore(message)">
              <span class="score">
                <span class="rap-star animate__animated" :class="{ animate__bounce: message.oldScore < message.score }" :style="{ 'animation-delay': `${animationDuration}s` }" /> 
                <AnimatedNumber :number="message.score" :delay="message.oldScore < message.score ? animationDuration * 2 : animationDuration" @animation-complete="$store.commit('updateOldScore', message)" />
                <span class="explain-score-button">
                <span class="text">why?</span>
            </span>
          </span>
        </div>
    </template>
    </beautiful-chat>
</template>

<script>
import useRhymeHighlight from './use-rhyme-highlight';
import TransitionedWords from './TransitionedWords'
import AnimatedNumber from './AnimatedNumber'
import { mapState } from 'vuex';

export default {
  components: {
    TransitionedWords,
    AnimatedNumber
  },
  name: 'app',
  setup() {     
      return useRhymeHighlight(); 
  },
  data() {
    return {
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
    participants: state => state.participants
  }),
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
      this.$store.commit('explainScore', message);
    },
    updateOldScore(message) {
      this.$store.commit('updateOldScore', message);
    }
  }
}
</script>

<style lang="scss">

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