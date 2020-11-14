<template>
<div>  


    <button @click="changeCode">test time</button>

     <pre>
       <code>
          <TransitionedWords :transitionedHtml="codeness" :allowHtml="true" /> 
       </code>    
     </pre>

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
      <template v-slot:header>
          </template>
          <template v-slot:text-message-body="{ message }">
            <div style="padding: 5px;">
              <TransitionedWords :id="message.id" :transitionedHtml="message.data.text" :transitionDuration="animationDuration" />    
            </div>
              <div class="score-section animate__animated" :style="{ 'animation-delay': message.scoreAnimatedEntranceDelay }" :class="message.author == 'me' ? 'animate__lightSpeedInRight' : 'animate__lightSpeedInLeft'" @click="explainScore(message, $event)">
                  <span class="score">
                    <span class="rap-star animate__animated" :class="{ animate__flip: message.oldScore < message.score }" :style="{ 'animation-delay': `${animationDuration}s` }" /> 
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
/*eslint-disable*/
import { mapState } from 'vuex';
import Prism from 'prismjs';
import 'prismjs/themes/prism-solarizedlight.css'

import useRhymeHighlight from './use-rhyme-highlight';
import TransitionedWords from './TransitionedWords'
import AnimatedNumber from './AnimatedNumber'
import ScoreExplanationModal from './ScoreExplanationModal';


let code2 = `let useRhymeHighlighter = function()  {
    const colorsSeed = uniqid();
    let chat = ref(null);
    
    let updateHighlights = function() {
      let myInput = chat.value.$el.querySelector('[contenteditable=true]');
      let rhymeMarker = new marker(myInput);
      let rhymeGroups = rhymeDetector(myInput.innerText);
      let colors = colourer({ luminosity: 'light', count: rhymeGroups.length, seed: colorsSeed });
      let rhymeStyles = {};
      
      colors.forEach((color, i) => {
        rhymeStyles[\'rhyme-group-\${{i}}\'] = { 'background-color': color };
      });
      
      const sheet = styler.createStyleSheet(rhymeStyles);
      sheet.attach();
      
      let savedSel = ranger.saveSelection();
          rhymeMarker.unmark({
            done: () => {
              rhymeGroups.forEach((group, i) =>
                rhymeMarker.mark(group.join(' '), { accuracy: { value: "exactly", limiters: [",", ".", "-", "\"", "'", "!", "?", "_", "@"] }, className: sheet.classes[\'rhyme-group-\${i}\'] }));
                ranger.restoreSelection(savedSel, true);
            }
          });
    };
    
    let mounted = onMounted(() => {
      let input = chat.value.$el.querySelector('[contenteditable=true]');
      input.addEventListener('input', updateHighlights);
      input.addEventListener('focus', () => setTimeout(updateHighlights, 50));
    });
    
    return { mounted, chat, updateHighlights };
}


//this is the component JS
export default {
  name: 'RhymeHighlight',
  setup() {
    return useRhymeHighlighter()
  }
};
`;

let code = `export default {
  name: 'RhymeHighlight',
    props: {
    content: {
      default: '',
      type: String,
    },
  },
  mounted() {
   this.markInstance = new mark(this.$refs.myInput);
   this.updateHighlights();
   this.colorsSeed = uniqid();
  },
  methods: {
    updateHighlights()
    {
      let rhymeGroups = findRhymes(this.text() || '');
      let colors = randomColor({
        luminosity: 'light',
        count: rhymeGroups.length,
        seed: this.colorsSeed
      });
      
      let rhymeStyles = {};
      
      
      colors.forEach((color, index) => {
        rhymeStyles['rhyme-group-\${index}'] = { 'background-color': color }
      });
      
      const sheet = jss.createStyleSheet(rhymeStyles);
      sheet.attach();
      let savedSel = rangy.saveSelection();
      this.markInstance.unmark({
        done: () => {
          rhymeGroups.forEach((group, i) =>
             this.markInstance.mark(group.join(' '), { accuracy: { value: "exactly", limiters: [",", ".", "-", "\"", "'", "!", "?", "_", "@"] }, className: sheet.classes['rhyme-group-\${i}'] }));
          rangy.restoreSelection(savedSel, true);
        }
      });
    }
  }
};`;


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
      
      refactored: false,
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
      messageStyling: true,
      codeness: Prism.highlight(code.replaceAll("=>", "=˃").replaceAll("`", '\''), Prism.languages.javascript, 'javascript')
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
    },
    changeCode() {
      this.codeness = Prism.highlight(code2.replaceAll("=>", "=˃"), Prism.languages.javascript, 'javascript');
      this.refactored = true;
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

pre {
 
  background: rgba(76, 175, 80, 0.1);
  margin: 20px;
  padding: 20px;
  padding-top: 0;
}

</style>