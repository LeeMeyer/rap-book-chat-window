import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isChatOpen: false,
    messageList: [
      { id: 1, type: 'text', author: `me`, data: { text: `Say yes!` }, score: 65, oldScore: 65, scoreAnimatedEntranceDelay : 0 },
      { id: 2, type: 'text', author: `user1`, data: { text: `No.` }, score: 65, oldScore: 65, scoreAnimatedEntranceDelay : 0 }
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
        this.commit('onMessageWasSent', { author: 'me', type: 'text', data: { text } });
      }
    },
    onMessageWasSent(state, message) {
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
      m.score -= 5;
      m.scoreBoostsCount++;
    },
    explainScore(state, message) {
      message.data.text = 'yes boss Say like a';
    }
  }
})