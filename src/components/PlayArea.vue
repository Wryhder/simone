<template>
  <section id="play-area">
      <transition-group tag="section">
    <Button
          v-for="(item, index) in numberOfButtonsForCurrentLevel"
          :key="index"
        v-bind:class="[
          buttonBackgroundColours[index % buttonBackgroundColours.length]
        ]"
    />
    </transition-group>

    <div class="buttons">
      <button @click="loadNextLevel">Load Next Level</button>
      <button @click="replayCurrentLevel">Replay</button>
      <button @click="resetLevel">Reset</button>
    </div>
  </section>
</template>

<script lang="ts">
import { mapState } from "vuex";
import { Component, Vue, Prop } from "vue-property-decorator";
import _ from "lodash";

import Button from "./Button.vue";

Object.defineProperty(Vue.prototype, "$_", { value: _ });

@Component({
  components: {
    Button
  },
  computed: {
    ...mapState(["numberOfButtonsForCurrentLevel"])
  }
})
export default class PlayArea extends Vue {
  buttonDeck: HTMLParagraphElement | null;
  buttonList: NodeListOf<Element>;
  isGameOver: boolean;
  playerPatternLength: number;
  shuffledButtons: Array<HTMLButtonElement>;
  clickedButtons: Array<EventTarget>;
  buttonBackgroundColours: Array<String>;

  created() {
    this.buttonBackgroundColours = ["indianred", "blue", "purple", "green"];
  }

  async mounted() {
    this.$nextTick();

    this.buttonDeck = document.querySelector(
      "#play-area section:first-of-type"
    );
    this.buttonList = document.querySelectorAll("#simone-button");
    this.shuffledButtons = _.shuffle(Array.from(this.buttonList));
    this.playerPatternLength = 0;
    this.isGameOver = false;

    this.animateButtons(this.attachListeners);
  }

  attachListeners() {
    this.buttonDeck.addEventListener("click", this.manageGamePlay);
  }

  manageGamePlay() {
    const clickTarget: EventTarget | null = event.target;

    if (!this.isValid(clickTarget)) {
      console.log(clickTarget);
      this.isGameOver = true;
    }
    }

  animateButtons(callback?: CallableFunction) {
    let animationDelay = 0;
    let self = this;
    let lastAnimatedButton = this.shuffledButtons[
      this.shuffledButtons.length - 1
    ];

    for (const button of this.shuffledButtons) {
      button.classList.toggle("heartbeat");
      button.setAttribute(
        "style",
        `animation-delay: ${(animationDelay += 2)}s`
      );
    }
    
    function handleAnimationEnd() {
      for (const button of self.buttonList) {
        button.classList.toggle("heartbeat");
        button.removeAttribute("style");
  }

      lastAnimatedButton.removeEventListener(
        "animationend",
        handleAnimationEnd
    );

      if (typeof callback === "function") callback();
  }

    lastAnimatedButton.addEventListener("animationend", handleAnimationEnd);
  }

  isValid(clickTarget: EventTarget | null) {
    this.playerPatternLength += 1;

    // For a click to be valid:
    // 1. Target needs to be a button with id of "simone-button"
    // 2. Target's click order should match the button
    //  in an equivalent position in the shuffledButtons array
    // e.g target === shuffledButtons[targetClickOrder]
    // 3. TODO:
    return (
      clickTarget.id === "simone-button" &&
      // Substract 1 from this.playerPatternLength since array indexing starts from 0
      clickTarget === this.shuffledButtons[this.playerPatternLength - 1] &&
      this.buttonList.length <= this.numberOfButtonsForCurrentLevel
    );
  }
  }
</script>

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
  animation: heartbeat 3s;
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

button {
  font-size: 1em;
}
</style>
