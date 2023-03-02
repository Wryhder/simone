<script lang="ts">
import { defineComponent } from "vue";
import { mapWritableState } from "pinia";
import { usePlayerStore } from "./stores/player";

import HomeScreen from "./views/HomeScreen.vue";
import GameScreen from "./views/GameScreen.vue";

export default defineComponent({
  components: {
    HomeScreen,
    GameScreen,
  },

  computed: {
    ...mapWritableState(usePlayerStore, ["activeView"]),
  },

  methods: {
    startGame() {
      this.activeView = "GameScreen";
    },
  },
});
</script>

<template>
  <div id="app">
    <component :is="activeView" @start-game="startGame" />
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
