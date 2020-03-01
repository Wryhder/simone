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

<script>
import { Component, Vue, Prop } from "vue-property-decorator";

import PlayArea from "../components/PlayArea";
import ScoreBoard from "../components/ScoreBoard";
import StatusArea from "../components/StatusArea";

@Component({
  components: {
    PlayArea,
    ScoreBoard,
    StatusArea
  }
})
export default class GameScreen extends Vue {}
</script>

<style>
#gamescreen {
  min-height: 100vh;
  background-image: url('../assets/psycho pass_gamescreen2.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: chocolate;
  background-blend-mode: color-burn;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
}

footer {
  height: 3em;
  border: 10px white inset;
  background-color: black;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
}

main {
  margin-bottom: 3em;
}

@media screen and (min-width: 650px) {
  #gamescreen {
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
    margin-bottom: 0;
}

aside {
  grid-area: aside;
}

footer {
  grid-area: footer;
  height: 3em;
    border: 10px white inset;
  background-color: black;
  margin-bottom: -10px;
    position: static;
}

aside {
  height: 100%;
  /* border: 1px red solid; */
}
}
</style>
