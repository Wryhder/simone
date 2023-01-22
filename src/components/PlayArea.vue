<script lang="ts">
import { defineComponent, ref, isProxy, toRaw } from "vue";
import { mapActions, mapWritableState } from "pinia";
import { usePlayerStore } from "../stores/player";

import { isEqual } from "lodash";

import ButtonComp from "./ButtonComp.vue";

let playerGuesses: Array<string>;
let animatedPattern: Array<string>;
let count = 1;

export default defineComponent({
  components: {
    ButtonComp,
  },
  data() {
    return {
      buttonDeck: null as HTMLElement | null,
      isGameOver: false as boolean,
      playerPatternLength: 0 as number,
      gameStarted: false as boolean,
      buttonBackgroundColours: ["indianred", "blue", "purple", "green"],
    };
  },
  computed: {
    ...mapWritableState(usePlayerStore, ["pattern", "guessed"]),
  },
  methods: {
    ...mapActions(usePlayerStore, [
      "lengthenPattern",
      "savePlayerGuess",
      "clearPlayerGuessArray",
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

    attachAnimationEndListener() {
      (this.buttonDeck as HTMLElement).addEventListener(
        "animationend",
        this.handleAnimationEnd
      );
    },

    removeAnimationEndListener() {
      (this.buttonDeck as HTMLElement).removeEventListener(
        "animationend",
        this.handleAnimationEnd
      );
    },

    animateButtons() {
      let animationDelay = 0;
      const self = this;

      console.log(`playing pattern ${count++}`);

      for (const colour of this.getPattern()) {
        const button: HTMLButtonElement = (
          ref(self.$refs[colour]).value as Array<any>
        )[0].$el;
        button.classList.toggle("heartbeat");
        button.setAttribute(
          "style",
          `animation-delay: ${(animationDelay += 1)}s`
        );
      }
    },

    handleAnimationEnd() {
      const self = this;

      (function removeAnimationStyles() {
        for (const colour of self.getPattern()) {
          const button: HTMLButtonElement = (
            ref(self.$refs[colour]).value as Array<any>
          )[0].$el;

          button.classList.toggle("heartbeat");
          button.removeAttribute("style");
        }
      })();

      this.removeAnimationEndListener();
      this.attachClickListener();
    },

    getRandomId(): string {
      return this.buttonBackgroundColours[
        Math.floor(Math.random() * this.buttonBackgroundColours.length)
      ];
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
      // Destroy all registered event listeners
      // Show game-over modal (?) and final score
      window.location.reload(); // temporary workaround for testing purposes
    },

    // If pattern is correct, remove listeners, play next pattern
    handleCorrectPatternGuess() {
      console.log("whooo! we'll keep playing!");
      this.clearPlayerGuessArray();
      // Destroy all registered event listeners
      this.removeClickListener();
      // Update player score history ("My Score History") and
      // "Known Latent Criminals" (leaderboard of sorts)
      this.setUpPlayArea();
    },

    setUpPlayArea() {
      this.attachAnimationEndListener();
      this.lengthenPattern(this.getRandomId());
      this.animateButtons();
    },

    startGame() {
      this.gameStarted = true;
      this.setUpPlayArea();
    },

    saveGame() {},

    loadSavedGame() {},

    exitGame() {},
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
      <button v-if="!gameStarted" @click="startGame">Start</button>
      <button v-else @click="saveGame">Save Game and Exit</button>
    </div>
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

.buttons {
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (min-width: 650px) {
  p {
    width: 60%;
  }

  .buttons {
    flex-direction: row;
    justify-content: center;
    margin-right: 0;
  }

  .buttons button:first-of-type {
    margin-right: 60px;
  }
}

.buttons button {
  padding: 10px;
  margin-bottom: 20px;
  color: black;
  font-size: 1em;
  font-family: "Audiowide", cursive;
  border: none;
  box-shadow: 0px 10px 14px -7px #276873;
  background: linear-gradient(to bottom, navajowhite 5%, #77a809 100%);
  border-radius: 10px;
  cursor: pointer;
  width: fit-content;
}

button span {
  vertical-align: super;
  font-size: 11px;
  color: purple;
}
</style>
