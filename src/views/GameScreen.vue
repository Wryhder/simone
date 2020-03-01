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
