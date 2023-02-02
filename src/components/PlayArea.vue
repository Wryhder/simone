<script lang="ts">
import { defineComponent, ref, isProxy, toRaw } from "vue";
import { mapActions, mapWritableState } from "pinia";
import { usePlayerStore } from "../stores/player";

import { isEqual } from "lodash";

import ButtonComp from "./ButtonComp.vue";
import GameOverModal from "./GameOverModal.vue";

let playerGuesses: Array<string>;
let animatedPattern: Array<string>;

export default defineComponent({
  components: {
    ButtonComp,
    GameOverModal,
  },
  data() {
    return {
      playerStore: usePlayerStore(),
      buttonDeck: null as HTMLElement | null,
      isGameOver: true as boolean,
      playerPatternLength: 0 as number,
      timerOff: true as boolean,
      startTime: 0 as number,
      stopTime: 0 as number,
      baseLevelScore: 15 as number,
      patternCount: 1 as number, // Tracks each pattern animation sequence
      buttonBackgroundColours: ["indianred", "blue", "purple", "green"],
      showModal: false as boolean,
    };
  },
  watch: {
    patternCount(newCount: number) {
      switch (true) {
        case newCount === 41:
        case newCount === 31:
        case newCount === 21:
        case newCount === 11:
          this.updateLevel();
          this.initLevelData(this.level);
          this.increaseBaseLevelScore();
          break;
      }
    },
  },
  computed: {
    ...mapWritableState(usePlayerStore, [
      "gameStarted",
      "level",
      "pattern",
      "guessed",
    ]),
    timeTaken() {
      return (this.stopTime - this.startTime) * 0.001; // convert milliseconds to seconds
    },
  },
  methods: {
    ...mapActions(usePlayerStore, [
      "lengthenPattern",
      "savePlayerGuess",
      "clearPlayerGuessArray",
      "initLevelData",
      "savePlayerStats",
    ]),

    attachClickListener() {
      (this.buttonDeck as HTMLElement).addEventListener(
        "click",
        this.manageGamePlay
      );
    },

    removeClickListener() {
      (this.buttonDeck as HTMLElement).removeEventListener(
        "click",
        this.manageGamePlay
      );
    },

    playAnimationSequence() {
      const pattern = this.getPattern();
      const patternCopy = [...this.getPattern()]; // Make a copy we can modify
      let animationCount = 1; // Tracks each colour/button animation in a pattern
      let animationDelay = 0; // CSS animation-delay; needs be to handled conditionally
      const self = this;

      console.log(`playing pattern ${this.patternCount++}`);

      function animateButtons() {
        const buttonColour = patternCopy.shift();
        const buttonToAnimate: HTMLButtonElement = self.getButton(
          buttonColour as string
        );

        console.log("animationCount: ", animationCount);
        console.log("buttonToAnimate: ", buttonToAnimate);

        let previousButtonColour;
        // if this is not the first animation in the sequence (i.e, != pattern[0])
        if (animationCount > 1) {
          previousButtonColour = pattern[animationCount - 2];
          const previousButton: HTMLButtonElement = self.getButton(
            previousButtonColour as string
          );

          console.log("previousButtonColour: ", previousButtonColour);
          console.log(
            "previousButton: removing animationend listener and animation styles..."
          );

          // Remove listener on previous button in pattern (may be current button);
          previousButton.removeEventListener("animationend", animateButtons);
          // Remove any existing animation styles on current AND previous button
          // !!!! Not removing styles on previous button causes buggy animation esp.
          // when the same colour is repeated consecutively (current == previous button)
          self.removeAnimationStyles(previousButton);
          self.removeAnimationStyles(buttonToAnimate);

          console.log("previousButton: ", previousButton);
          console.log("buttonToAnimate: ", buttonToAnimate);
        }

        function endAnimationSequence() {
          // We can start listening for player clicks
          self.attachClickListener();
          buttonToAnimate.removeEventListener(
            "animationend",
            endAnimationSequence
          );
        }

        // Check for end of pattern
        if (animationCount === pattern.length) {
          console.log(
            "Reaching end of animation sequence. Adding listener to trigger " +
              "player click handling..."
          );
          buttonToAnimate.addEventListener(
            "animationend",
            endAnimationSequence
          );
        } else {
          console.log(
            "Adding listener for animationend event to animate next button in pattern..."
          );
          // Set up animation for next colour/button in the pattern
          buttonToAnimate.addEventListener("animationend", animateButtons);
        }

        console.log("Animating button...");

        // For the most part, animation timing is handled conditionally to ensure that
        // it's never unclear when the same button is repeated consecutively in the
        // animation sequence
        if (animationCount > 1) {
          if (buttonColour === previousButtonColour) {
            setTimeout(() => {
              self.animateButton(buttonToAnimate, (animationDelay -= 0.07));
            }, 0); // 0 works; setTimeout() is necessary to maintain the correct sequence
          } else {
            self.animateButton(buttonToAnimate, (animationDelay -= 0.05));
          }
        } else {
          self.animateButton(buttonToAnimate, (animationDelay += 0.5));
        }

        animationCount++;
      }

      animateButtons();
    },

    animateButton(button: HTMLButtonElement, animationDelay: number) {
      const animationDuration = 0.5;

      button.classList.toggle("heartbeat");
      button.style.animationDelay = `${animationDelay}s`;
      button.style.animationDuration = `${animationDuration}s`;
    },

    removeAnimationStyles(button: HTMLButtonElement) {
      if (button.classList.contains("heartbeat")) {
        button.classList.toggle("heartbeat");
      }
      button.removeAttribute("style");
    },

    cleanUpAllButtonAnimationStyles() {
      for (const colour of this.buttonBackgroundColours) {
        const button: HTMLButtonElement = this.getButton(colour as string);
        this.removeAnimationStyles(button);
      }
    },

    getRandomId(): string {
      return this.buttonBackgroundColours[
        Math.floor(Math.random() * this.buttonBackgroundColours.length)
      ];
    },

    getButton(colour: string) {
      return (ref(this.$refs[colour as string]).value as Array<any>)[0].$el;
    },

    getPattern(): Array<string> {
      return this.proxyToArray(this.pattern);
    },

    proxyToArray(proxy: any): Array<string> {
      return isProxy(proxy) ? toRaw(proxy) : proxy;
    },

    manageGamePlay(event: Event) {
      const clickTarget: HTMLButtonElement | EventTarget | null = event.target;

      if (this.isValid(clickTarget) === true) {
        if (this.timerOff) {
          this.timerOff = false;
          this.startTime = Date.now();
        }

        const clickTargetID = (clickTarget as HTMLButtonElement).id;
        this.savePlayerGuess(clickTargetID);

        playerGuesses = this.proxyToArray(this.guessed);
        animatedPattern = this.getPattern();

        this.playerPatternLength = playerGuesses.length;

        console.log("playerGuesses: ", playerGuesses);
        console.log("animatedPattern: ", animatedPattern);

        if (this.isCorrectGuess() === false) {
          this.handleIncorrectGuess();
        }

        if (this.isCorrectPattern() === true) {
          this.handleCorrectPatternGuess();
        }
      }
    },

    isValid(clickTarget: HTMLButtonElement | EventTarget | null) {
      return (
        (clickTarget as HTMLButtonElement).classList.contains(
          "simone-button"
        ) &&
        // playerGuesses and animatedPattern variables are not used here
        // because isValid() is called before they are assigned values
        toRaw(this.guessed).length < toRaw(this.pattern).length
      );
    },

    isCorrectGuess() {
      const playerGuess = playerGuesses[this.playerPatternLength - 1];
      const correctGuess = animatedPattern[this.playerPatternLength - 1];
      return isEqual(playerGuess, correctGuess);
    },

    isCorrectPattern() {
      return (
        this.playerPatternLength === animatedPattern.length &&
        isEqual(playerGuesses, animatedPattern)
      );
    },

    handleIncorrectGuess() {
      console.log("game over");
      this.isGameOver = true;
      this.showModal = true;
    },

    // If pattern is correct, remove listeners, play next pattern
    handleCorrectPatternGuess() {
      this.stopTime = Date.now();
      this.timerOff = true;

      const level = this.level,
        timeTaken = this.timeTaken,
        score = this.getScore(level, timeTaken);
      this.savePlayerStats(level, score, timeTaken);

      console.log("whooo! we'll keep playing!");
      console.log(`score: ${score}, level: ${level}, timeTaken: ${timeTaken}`);

      this.prepForNextPattern();
      this.setUpGamePlay();
    },

    getScore(level: number, timeTaken: number) {
      const score = this.baseLevelScore;
      const adjustedScore = this.adjustScoreByTimeTaken(
        score,
        level,
        timeTaken
      );
      return adjustedScore;
    },

    adjustScoreByTimeTaken(score: number, level: number, timeTaken: number) {
      switch (true) {
        case level === 1 && timeTaken <= 10:
        case level === 2 && timeTaken <= 30:
        case level === 3 && timeTaken <= 60:
        case level === 4 && timeTaken <= 80:
        case level === 5 && timeTaken <= 100:
          score += 5;
          break;
        default:
          score -= 5;
          break;
      }

      return score;
    },

    updateLevel() {
      let patternCount = this.patternCount;

      switch (true) {
        case patternCount > 40 && patternCount <= 50:
        case patternCount > 30 && patternCount <= 40:
        case patternCount > 20 && patternCount <= 30:
        case patternCount > 10 && patternCount <= 20:
          this.level++;
          break;
        default:
          this.level = 1;
          break;
      }
    },

    increaseBaseLevelScore() {
      this.baseLevelScore += 5;
    },

    prepForNextPattern() {
      this.clearPlayerGuessArray();
      this.removeClickListener();
      this.cleanUpAllButtonAnimationStyles();
    },

    setUpGamePlay() {
      this.lengthenPattern(this.getRandomId());

      const timeout = 200; // Mostly to prevent missing the first animation on game start
      setTimeout(this.playAnimationSequence, timeout);
    },

    startGame() {
      this.initLevelData(this.level);

      this.isGameOver = false;
      this.setUpGamePlay();
    },

    saveGame() {},

    loadSavedGame() {},

    restartGame() {
      this.showModal = false;
      this.playerStore.$reset();
    },

    exitGame() {
      this.gameStarted = false;
      this.playerStore.$reset();
    },
  },
  async mounted() {
    await this.$nextTick();

    this.buttonDeck = document.querySelector(
      "#play-area section:first-of-type"
    );
  },
});
</script>

<template>
  <section id="play-area">
    <transition-group tag="section">
      <ButtonComp
        v-for="(_, index) in buttonBackgroundColours.length"
        :key="index"
        :id="`${buttonBackgroundColours[index]}`"
        :ref="`${buttonBackgroundColours[index]}`"
      />
    </transition-group>

    <div class="buttons">
      <button v-if="isGameOver" @click="startGame">Start</button>
      <button v-else @click="saveGame">Save Game and Exit</button>
    </div>

    <Teleport to="body">
      <GameOverModal
        :show="showModal"
        @restart="restartGame"
        @exit="exitGame"
      />
    </Teleport>
  </section>
</template>

<style>
#play-area {
  width: 100%;
  margin: 5em 0 2em 0;
  /* display: flex; */
}

#play-area section:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.heartbeat {
  animation: heartbeat 1s;
}

@keyframes heartbeat {
  0% {
    background-color: skyblue;
  }
  50% {
    transform: perspective(500px) scale3d(2, 0.7, 0.2) translateZ(100px);
  }
  100% {
    transform: none;
  }
}
</style>
