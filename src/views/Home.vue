<template>
  <div id="home">
    <h1>Simone</h1>
    <p>
      Welcome to the Sybil System grading portal! <br />
      Find out your criminal coefficient with fun games. Your final score will be calculated as the overall average of all scores recorded.
    </p>
    <div class="buttons">
      <button @click="startGame" :to="{ name: 'Game Screen' }">
        Start New Game
      </button>
      <button @click="resumeGame">Resume Saved Game<span style=" vertical-align: super;">coming soon!</span></button>
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
 @import url('https://fonts.googleapis.com/css?family=Audiowide&display=swap');

#home {
  height: 100%;
  width: 100%;
  background-image: url('../assets/psycho-pass-full-1447619_homepage.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  background-color: chocolate;
  background-blend-mode: color-burn;
}

h1 {
  margin-top: 0;
  padding-top: 1.5em;
  color: white;
  font-family: 'Audiowide', cursive;
}

p {
  margin-top: 10em;
  width: 60%;
  margin: 5em auto;
  font-size: 1.5em;
  color: white;
  background-color: black;
  padding: 1.5em;
  border-radius: 10px;
}

.buttons {
  margin-top: 6em;
}

.buttons button {
  padding: 10px;
  margin-right: 60px;
  color: black;
  background-color: navajowhite;
  font-size: 1em;
}

button span {
  vertical-align: super;
  font-size: 11px;
  color: purple;
}
</style>
