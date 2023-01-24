import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    playerName: "",
    sessionScores: [] as Array<number>,
    pattern: [] as Array<string>,
    guessed: [] as Array<string>,
  }),
  getters: {
    doubleCount: (state) => state.numberOfButtonsForCurrentLevel * 2,
  },
  actions: {
    lengthenPattern(id: string) {
      this.pattern.push(id);
    },
    savePlayerGuess(colour: string) {
      this.guessed.push(colour);
    },
    clearPlayerGuessArray() {
      this.guessed = [];
    },
  },
});
