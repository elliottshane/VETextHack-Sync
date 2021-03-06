import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
const config = require('./config');
var SyncClient = require('twilio-sync');
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    team1Phone: "9093031305",
    team2Phone: "9093031385",
    results: {
      team1Name: "Team 1",
      team1Calls: 0,
      team1Score: 0,
      team1SMSScore: 0,
      team2Name: "Team 2",
      team2Calls: 0,
      team2SMSScore: 0,
      team2Score: 0
    }
  },
  mutations: {
      setResults(state,payload){

      let team1 = payload.filter(function(item){
        return item.number === '+1' + state.team1Phone && item.hasOwnProperty('score');
      }); 
      let team2 = payload.filter(function (item) {
        return item.number === '+1' + state.team2Phone && item.hasOwnProperty('score');
      }); 
      let team1J = payload.filter(function (item) {
        return item.number === '+1' + state.team1Phone && item.hasOwnProperty('Jscore');
      });
      let team2J = payload.filter(function (item) {
        return item.number === '+1' + state.team2Phone && item.hasOwnProperty('Jscore');
      }); 
     
      state.results.team1Calls = team1.length;
      state.results.team2Calls = team2.length;
      state.results.team1SMSScore = team1.reduce(function (a, b) { return Number(a) + Number(b.score); }, 0);
      state.results.team2SMSScore = team2.reduce(function (a, b) { return Number(a) + Number(b.score); }, 0);
      console.log(team1J,team2J)
      state.results.team1Score = team1J.reduce(function (a, b) { return Number(a) + Number(b.Jscore); }, 0);
      state.results.team2Score = team2J.reduce(function (a, b) { return Number(a) + Number(b.Jscore); }, 0);

      
      //console.log(state.results);
      }
  },
  actions: {
    loadResults({commit}){
      axios
        .get("https://jasmine-gull-2964.twil.io/sync-token?key="+config.key)
        .then(function(response){
        
          var syncClient = new SyncClient(response.data.token);
         
          syncClient.list('VETextHack').then(function (list) {
           
            list.getItems().then(function (listData) {
              var respData = listData.items.map(item => item.data.value);
           
              commit('setResults', respData);
              list.on('itemAdded', function (e) {

                list.getItems().then(function (listData) {
                respData = listData.items.map(item => item.data.value);
                console.log(respData);
                commit("setResults", respData);
                });
              });
            });
        });
    });
  }
},
getters:{
    team1Phone(state){
      return state.team1Phone;
    },
    team2Phone(state) {
      return state.team2Phone;
    },
    results(state){
      return state.results;
    },
    team1SMSScore(state){
      return state.results.team1SMSScore;
    },
    team2SMSScore(state) {
      return state.results.team2SMSScore;
    },
    team1Score(state) {
      return state.results.team1Score;
    },
    team2Score(state) {
      return state.results.team2Score;
    }
      
}
})
