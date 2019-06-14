import Vue from 'vue'
import Vuex from 'vuex'
const config = require('./config');
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    results: {
      team1Name: "Team 1",
      team1Calls: 0,
      team1Score: 65,
      team1SMSScore: 75,
      team2Name: "Team 2",
      team2Calls: 3,
      team2SMSScore: 50,
      team2Score: 80
    }
  },
  mutations: {

  },
  actions: {

  }
})
