<script lang="ts">
import PlayArea from "../components/PlayArea.vue";
import ScoreBoard from "../components/ScoreBoard.vue";
import StatusArea from "../components/StatusArea.vue";

export default {
  components: {
    PlayArea,
    ScoreBoard,
    StatusArea,
  },
};
</script>

<template>
  <div id="gamescreen">
    <main>
      <PlayArea />
    </main>
    <aside>
      <ScoreBoard />
    </aside>
    <footer>
      <StatusArea />
    </footer>
  </div>
</template>

<style>
#gamescreen {
  min-height: 100vh;
  background-image: url("../assets/psycho-pass_gamescreen2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: chocolate;
  background-blend-mode: color-burn;
  background-attachment: fixed;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

footer {
  border: 10px white inset;
  background-color: black;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  padding: 0.5rem;
}

main {
  margin-bottom: 3em;
}

@media screen and (min-width: 814px) {
  #gamescreen {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-areas:
      "main main main aside"
      "main main main aside"
      "footer footer footer aside";
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
    position: static;
    width: calc(30rem + 10vw);
    justify-self: center;
  }

  aside {
    height: 100vh;
  }
}

@media screen and (min-width: 650px) {
  footer {
    right: 5%;
    left: 5%;
  }
}
</style>
