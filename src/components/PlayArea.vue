<template>
  <section id="play-area">
      <transition-group tag="section">
    <Button
      v-for="n in numberOfButtonsForCurrentLevel"
        :key="n"
      @click="$emit('button-clicked')"
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
    Button,
  },
  computed: {
    ...mapState(["numberOfButtonsForCurrentLevel"])
  }
})
export default class PlayArea extends Vue {
  clickedButtons: Array<EventTarget>;


  manageGamePlay() {
    if (this.isValid(clickTarget)) {
      this.toggleClass(clickTarget);
      this.addToArray(clickTarget);
      // max number of buttons allowed in clickedButtons array = numberOfButtonsForCurrentLevel
      if (this.clickedButtons.length === this.numberOfButtonsForCurrentLevel) {
        this.checkForCorrectPattern();
    }
    }
  }

  animateButtons() {
    let animationDelay = 0;
    const buttonList = document.querySelectorAll("#simone-button");
    const shuffledButtons = _.shuffle(Array.from(buttonList));
    for (const button of shuffledButtons) {
      button.classList.toggle("heartbeat");
      button.setAttribute(
        "style",
        `animation-delay: ${(animationDelay += 2)}s`
      );
    }
  }

  isValid(clickTarget) {
    // For a click to be valid:
    // 1. Target needs to be a button with class of "button"
    // 3. The clickedButtons array must have less than the total number
    //    of buttons for that level already in it
    // 4. Target must not already be in the clickedButtons array
    return (
      clickTarget.classList.contains("button") &&
      clickedButtons.length < numberOfButtonsForCurrentLevel &&
      !clickedButtons.includes(clickTarget)
    );
  }

  // indicate that a button has been clicked
  toggleClass(button) {
    button.classList.toggle("clicked");
  }

  // add a button to the clickedButtons array
  addToArray(button) {
    clickedButtons.push(button);
  }

  // empty the clickedButtons array
  emptyArray() {
    clickedButtons = [];
  }

  checkForCorrectPattern() {
    console.log(clickedButtons);
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
