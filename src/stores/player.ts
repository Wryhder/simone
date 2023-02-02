import { defineStore } from "pinia";

type levelData = {
  scores: Array<number>;
  playTimes: Array<number>;
};

export const usePlayerStore = defineStore("player", {
  state: () => ({
    playerName: "",
    level: 1 as number,
    sessionScores: {
      level1: {} as levelData,
      level2: {} as levelData,
      level3: {} as levelData,
      level4: {} as levelData,
      level5: {} as levelData,
    },
    pattern: [] as Array<string>,
    guessed: [] as Array<string>,
    gameStarted: false as boolean,
  }),
  getters: {
    // doubleCount: (state) => state.numberOfButtonsForCurrentLevel * 2,
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
    initLevelData(level: number) {
      const key = `level${level}` as keyof typeof this.sessionScores;

      (this.sessionScores[key] as levelData) = {
        scores: [],
        playTimes: [],
      };
    },
    savePlayerStats(level: number, score: number, timeTaken: number) {
      const key = `level${level}` as keyof typeof this.sessionScores;

      (this.sessionScores[key] as levelData).scores.push(score);
      (this.sessionScores[key] as levelData).playTimes.push(timeTaken);
    },
  },
});
