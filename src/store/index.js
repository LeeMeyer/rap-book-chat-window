import Vue from 'vue';
import Vuex from 'vuex';
import uniqid from 'uniqid';
import detectRhymes from 'rhyme-detector';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isChatOpen: false,
    messageForWhichToExplainScore: null,
    scoreExplanantionModalIsOpen: false,
    messageList: [
      { id: uniqid('message'), type: 'text', author: `me`, data: { text: `my reaction to your abstraction it leaks more than a facebook account I'll do the lifecycle with your mum till she calls opponent component don't unmount` }, score: 0, oldScore: 0, scoreAnimatedEntranceDelay : 0, scoreExplanation: '' },
      { id: uniqid('message'), type: 'text', author: `user1`, data: { text: `No.` }, score: 0, oldScore: 0, scoreAnimatedEntranceDelay : 0, scoreExplanation: '' }
    ],
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
    ]
  },
  mutations: {
    init(state) {
      state.messageList.forEach(m => {
        let score = detectRhymes(m.data.text).flat().length * 10;
        m.score = score;
        m.oldScore = score;
      });
    },
    openChatWindow(state) {
      
      state.isChatOpen = true
      state.newMessagesCount = 0;

      let latest = state.messageList; 
      
      if (latest.length > 10)
      {
        latest = state.messageList.slice(1).slice(-10)
      }

      latest.forEach((m, i) => m.scoreAnimatedEntranceDelay = `${i * .5}s`);
    },
    closeChatWindow(state) {
      state.isChatOpen = false;
    },
    sendMessage(state, text) {
      if (text.length > 0) {
        state.newMessagesCount = state.isChatOpen ? state.newMessagesCount : state.newMessagesCount + 1;
        this.commit('onMessageWasSent', { id: uniqid("message"), author: 'me', type: 'text', data: { text } });
      }
    },
    onMessageWasSent(state, message) {
      
      message.id = uniqid("message");

      let rhymeGroups = detectRhymes(message.data.text);
      let score = rhymeGroups.flat().length * 10;
      
      message.oldScore = score;
      message.score = score;
      message.scoreAnimatedEntranceDelay = "0s";
      message.scoreExplanation="";
      state.messageList = [ ...state.messageList, message ]
    },
    updateOldScore(state, message) 
    {
      const m = state.messageList.find(m=>m.id === message.id);      
      m.oldScore = m.score;
    },
    editMessage(state, message){
      const m = state.messageList.find(m=>m.id === message.id);      
      m.oldScore = m.score;
      m.isEdited = true;
      m.data.text = message.data.text;
      m.score = detectRhymes(message.data.text).flat().length * 10;
    },
    explainScore(state, message) {
      const m = state.messageList.find(m=>m.id === message.id);
      state.scoreExplanantionModalIsOpen = true;
      state.messageForWhichToExplainScore = m;
    },
    closeScoreExplantion(state) {
      state.scoreExplanantionModalIsOpen = false;
    }
  }
})