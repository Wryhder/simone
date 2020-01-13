import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberOfButtonsForCurrentLevel: 4,
    playerName: "",
    sessionScores: []
  },
  mutations: {},
  actions: {},
  modules: {}
});
