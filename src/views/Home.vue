<template>
  <div>
    <h1>Simone</h1>
    <p>
      Welcome to the Sybil System grading portal! <br />
      Find out your criminal coefficient with fun games. <br />
      Your final grade will be calculated as the overall average score of all
      game scores recorded.
    </p>
    <div class="buttons">
      <button @click="startGame" :to="{ name: 'Game Screen' }">
        Start New Game
      </button>
      <button @click="resumeGame">Resume Saved Game</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    startGame() {
      this.$emit("start-game");
    },
    resumeGame() {
      console.log("Loading saved game...");
    }
  }
};
</script>

<style scoped>
.buttons {
  margin-top: 6em;
}

.buttons button {
  padding: 10px;
  margin-right: 20px;
}
</style>
