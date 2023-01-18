<script lang="ts">
import HomeScreen from "./views/HomeScreen.vue";
import GameScreen from "./views/GameScreen.vue";

export default {
  components: {
    HomeScreen,
    GameScreen,
  },

  data() {
    return {
      gameStarted: false,
    };
  },

  methods: {
    startGame() {
      this.gameStarted = true;
    },
  },
};
</script>

<template>
  <div id="app">
    <GameScreen v-if="gameStarted" />
    <HomeScreen v-else v-on:start-game="startGame" />
  </div>
</template>

<style>
html {
  height: 100vh;
}

body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}

* {
  box-sizing: border-box;
}

#app {
  height: 100vh;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
