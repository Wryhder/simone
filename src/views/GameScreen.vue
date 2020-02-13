<template>
  <div id="gamescreen">
    <main>
      <PlayArea v-on:button-clicked="handleClick" />
    </main>
    <aside>
      <ScoreBoard />
    </aside>
    <footer>
      <StatusArea/>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import _ from "lodash";

import PlayArea from "../components/PlayArea";
import ScoreBoard from "../components/ScoreBoard";
import StatusArea from "../components/StatusArea";

Object.defineProperty(Vue.prototype, "$_", { value: _ });

@Component({
  components: {
    PlayArea,
    ScoreBoard,
    StatusArea
  }
})
export default class GameScreen extends Vue {
  async mounted() {
    await this.$nextTick();
    // TODO: animate buttons here
  }

  // @Prop({ default: false }) gameStarted!: boolean;
  handleClick() {
    if (isValid(clickTarget)) {
      toggleClass(clickTarget);
      addToArray(clickTarget);
      // max number of buttons allowed in clickedButtons array = numberOfButtonsForCurrentLevel
      if (clickedButtons.length === numberOfButtonsForCurrentLevel) {
        checkForCorrectPattern();
      }
    }
  }

  animateButtons() {
    let animationDelay = 0;
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
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#gamescreen {
  background-image: url('../assets/psycho pass_gamescreen2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: chocolate;
  background-blend-mode: color-burn;
  background-attachment: fixed;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-areas: 
                "main main main aside"
                "main main main aside"
                "footer footer footer aside";
  height: inherit;
  color: white;
}

main {
  grid-area: main;
  height: 30em;
}

aside {
  grid-area: aside;
}

footer {
  grid-area: footer;
  height: 3em;
  border: 10px black inset;
  background-color: black;
  margin-bottom: -10px;
}

aside {
  height: 100%;
  /* border: 1px red solid; */
}
</style>
