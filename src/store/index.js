import Vue from 'vue';
import Vuex from 'vuex';
import uniqid from 'uniqid';
import detectRhymes from 'rhyme-detector';
import evanYou from '../assets/evanyou.png';
import zuckerberg from '../assets/zuck3.png';


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isChatOpen: false,
    messageForWhichToExplainScore: null,
    scoreExplanantionModalIsOpen: false,
    messageList: [
      { id: uniqid('message'), type: 'text', author: `user1`, data: { text: "What up Vue JS! You're for noobs, I guess. Your loser friendliness allows pests do deploy a mess!" }, score: 0, oldScore: 0, scoreAnimatedEntranceDelay : 0, scoreExplanation: '' }
    ],
    participants: [
      {
        id: 'user1',
        name: 'Matteo',
        imageUrl: zuckerberg
      },
      {
        id: 'me',
        name: 'Support',
        imageUrl: evanYou
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
  },
  getters: {
      getScoreExplanation(state) {
        let rhymeGroups = detectRhymes(state.messageForWhichToExplainScore.data.text);
        return rhymeGroups.reduce((a, c) => a + `Rhyming ${c.map(w => `"${w}"`).join(' and ')} scores ${c.length * 10} points!\n\n\n`, '');
      },
      getTotalScoreForUser: (state) => (user) => {
        return state.messageList.filter(m => m.author === user.id).reduce((a, c) => a + c.score, 0);
      }
    } 
})