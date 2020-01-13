<template>
  <div>
    <main>
      <PlayArea v-on:button-clicked="handleClick" />
    </main>
    <aside>
      <ScoreBoard />
    </aside>
    <footer>
      <StatusArea />
    </footer>
  </div>
</template>

<script>
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

/*
1. Player loads web page
2. Clicks the 'Start Game' button
3. First level (four buttons) loads, buttons light up in a pattern
4. Player is prompted to repeat pattern
5. If right, next level loads
6. If wrong, game ends

Learn:
- Vue (+ vue-class-components, vue-property-decorators)
- Vuex
- Vue Router
- JavaScript (The JavaScript Handbook, YDKJS, Eloquent JavaScript), TypeScript
- CSS (The CSS Handbook), SCSS
*/
export default class GameScreen extends Vue {
  // @Prop({ default: false }) gameStarted!: boolean;
  // methods: {
  //   handleClick() {
  //     if (isValid(clickTarget)) {
  //       toggleClass(clickTarget);
  //       addToArray(clickTarget);
  //       // max number of buttons allowed in clickedButtons array = numberOfButtonsForCurrentLevel
  //       if (clickedButtons.length === numberOfButtonsForCurrentLevel) {
  //         checkForCorrectPattern();
  //       }
  //     }
  //   },
  //   animateButtons() {
  //     let animationDelay = 0;
  //     const shuffledButtons = _.shuffle(Array.from(buttonList));
  //     for (const button of shuffledButtons) {
  //       button.classList.toggle("heartbeat");
  //       button.setAttribute(
  //         "style",
  //         `animation-delay: ${(animationDelay += 2)}s`
  //       );
  //     }
  //   },
  //   isValid(clickTarget) {
  //     // For a click to be valid:
  //     // 1. Target needs to be a button with class of "button"
  //     // 3. The clickedButtons array must have less than the total number
  //     //    of buttons for that level already in it
  //     // 4. Target must not already be in the clickedButtons array
  //     return (
  //       clickTarget.classList.contains("button") &&
  //       clickedButtons.length < numberOfButtonsForCurrentLevel &&
  //       !clickedButtons.includes(clickTarget)
  //     );
  //   },
  //   // indicate that a button has been clicked
  //   toggleClass(button) {
  //     button.classList.toggle("clicked");
  //   },
  //   // add a button to the clickedButtons array
  //   addToArray(button) {
  //     clickedButtons.push(button);
  //   },
  //   // empty the clickedButtons array
  //   emptyArray() {
  //     clickedButtons = [];
  //   },
  //   checkForCorrectPattern() {
  //     console.log(clickedButtons);
  //   }
  // }
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
</style>
