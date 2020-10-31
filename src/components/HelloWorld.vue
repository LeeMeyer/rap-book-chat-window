<template>
  <div class="hello">
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa" target="_blank" rel="noopener">pwa</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-router" target="_blank" rel="noopener">router</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-vuex" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-unit-jest" target="_blank" rel="noopener">unit-jest</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
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
      :showLauncher="true"
      :showCloseButton="true"
      :colors="colors"
      :alwaysScrollToBottom="alwaysScrollToBottom"
      :disableUserListToggle="false"
      :messageStyling="messageStyling"  
      @edit="editMessage" >
      <template v-slot:text-message-body="{ message }">
        <div style="padding: 5px;">
           <TransitionedWords :transitionedHtml="message.data.text"/>    
        </div>
          <div class="score-section animate__animated" :style="{ 'animation-delay': message.animatedScoreDelay }" :class="message.author == 'me' ? 'animate__lightSpeedInRight' : 'animate__lightSpeedInLeft'"  @click="clickScore(message)">
              <span class="score"><AnimatedNumber :number="message.score"/>
                <span class="explain-score-button">
                <span class="text">why?</span>
            </span>
          </span>
        </div>
    </template>
    </beautiful-chat>
  </div>
  </div>
</template>

<script>
import useRhymeHighlight from './use-rhyme-highlight';
import TransitionedWords from './TransitionedWords'
import AnimatedNumber from './AnimatedNumber'

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
      participants: [
        {
          id: 'user1',
          name: 'Matteo',
          imageUrl: 'https://avatars3.githubusercontent.com/u/1915989?s=230&v=4'
        },
        {
          id: 'me',
          name: 'Support',
          imageUrl: 'https://avatars3.githubusercontent.com/u/37018832?s=200&v=4'
        }
      ], // the list of all the participant of the conversation. `name` is the user name, `id` is used to establish the author of a message, `imageUrl` is supposed to be the user avatar.
      titleImageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png',
      messageList: [
          { id: 1, type: 'text', author: `me`, data: { text: `Say yes!` }, score: 65 },
          { id: 2, type: 'text', author: `user1`, data: { text: `No.` }, score: 65 }
      ], // the list of the messages to show, can be paginated and adjusted dynamically
      newMessagesCount: 0,
      isChatOpen: false, // to determine whether the chat window should be open or closed
      showTypingIndicator: '', // when set to a value matching the participant.id it shows the typing indicator for the specific user
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
      }, // specifies the color scheme for the component
      alwaysScrollToBottom: true, // when set to true always scrolls the chat to the bottom when new events are in (new message, user starts typing...)
      messageStyling: true // enables *bold* /emph/ _underline_ and such (more info at github.com/mattezza/msgdown)
    }
  },
  methods: {
    afterEnter() {
      console.log('please!')
    },
    sendMessage (text) {
      if (text.length > 0) {
        this.newMessagesCount = this.isChatOpen ? this.newMessagesCount : this.newMessagesCount + 1
        this.onMessageWasSent({ author: 'me', type: 'text', data: { text } })
      }
    },
    onMessageWasSent (message) {
      this.messageList = [ ...this.messageList, message ]
    },
    openChat () {
      this.isChatOpen = true
      this.newMessagesCount = 0;

      let latest = this.messageList; 
      
      if (latest.length > 10)
      {
        latest = this.messageList.slice(1).slice(-10)
      }

      latest.forEach((m, i) => m.animatedScoreDelay = `${i * .5}s`);

    },
    closeChat () {
      this.isChatOpen = false
    },
    handleScrollToTop () {
      // called when the user scrolls message list to top
      // leverage pagination for loading another page of messages
    },
    handleOnType() {
    },
    editMessage(message){
      const m = this.messageList.find(m=>m.id === message.id);
      m.isEdited = true;
      m.data.text = message.data.text;
      m.score = 102;      
    },
    clickScore(message) {
      message.data.text = 'yes boss Say like a';
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

.score::before {
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