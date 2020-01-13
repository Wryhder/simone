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

Object.defineProperty(Vue.prototype, '$_', { value: _ });

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
*/

export default class GameScreen extends Vue {
  
};
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
