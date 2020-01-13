import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    numberOfButtonsForCurrentLevel: 4,
    playerName: "",
    sessionScores: []
  },
  mutations: {
    increment(state) {
      state.numberOfButtonsForCurrentLevel++;
    },
    reset(state) {
      // reset current level
    }
  },
  actions: {},
  modules: {}
});
