<script lang="ts">
import { defineComponent } from "vue";
import { mapWritableState } from "pinia";
import { usePlayerStore } from "../stores/player";

export default defineComponent({
  data() {
    return {
      typedText: [
        "Welcome to the Sybil System grading portal!",
        "Find out your Criminal Coefficient with the game of Simone.",
        "Your final score will be calculated as the overall average of all scores recorded.",
      ],
      speed: 65, // time delay of print out
      startIndex: 0, // start printing array at this position
      arrayLength: 0, // the length of the text array
      scrollAt: 20, // start scrolling up at this many lines
      textPos: 0, // initialise text position
      contents: "",
      row: 0, // initialise current row
      destination: null as HTMLElement | null,
    };
  },

  computed: {
    ...mapWritableState(usePlayerStore, ["useSavedGame", "savedGameOptions"]),
  },

  methods: {
    typewriter() {
      this.contents = " ";
      this.row = Math.max(0, this.startIndex - this.scrollAt);

      while (this.row < this.startIndex) {
        this.contents += this.typedText[this.row++] + "<br />";
      }

      (this.destination as HTMLElement).innerHTML =
        this.contents +
        this.typedText[this.startIndex].substring(0, this.textPos) +
        "_";

      if (this.textPos++ == this.arrayLength) {
        this.textPos = 0;
        this.startIndex++;

        if (this.startIndex != this.typedText.length) {
          this.arrayLength = this.typedText[this.startIndex].length;
          setTimeout(this.typewriter, 500);
        }
      } else {
        setTimeout(this.typewriter, this.speed);
      }
    },

    startNewGame() {
      if ("simonePlayerState" in localStorage) {
        if (!sessionStorage.notifyUserOfSavedGame) {
          alert(
            `You have a saved game! Click "Ok" to dismiss this notification and we won't ` +
              "remind you again for this session."
          );
          sessionStorage.setItem("notifyUserOfSavedGame", "true");
        } else {
          this.$emit("start-game");
        }
      } else {
        this.$emit("start-game");
      }
    },

    resumeSavedGame() {
      if ("simonePlayerState" in localStorage) {
        this.useSavedGame = this.savedGameOptions.Yes;
        this.$emit("start-game");
      } else {
        // TODO: Notify user there's no saved game with a custom modal?
        alert("You currently have no saved game. Please start a new game.");
      }
    },
  },

  mounted() {
    this.arrayLength = this.typedText[0].length;
    this.destination = document.getElementById("typed-text");
    this.typewriter();
  },
});
</script>

<template>
  <div id="home">
    <h1>Simone</h1>
    <!-- TODO: Redo typewriter animation with CSS -->
    <p id="typed-text"></p>
    <div class="buttons">
      <button @click="startNewGame" :to="{ name: 'Game Screen' }">
        Start New Game
      </button>
      <button @click="resumeSavedGame">Resume Saved Game</button>
    </div>
  </div>
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Audiowide&display=swap");
@import url("https://fonts.googleapis.com/css?family=Tomorrow&display=swap");

#home {
  min-height: 100vh;
  width: 100%;
  background-image: url("../assets/psycho-pass-full-1447619_homepage.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #d2691e;
  background-blend-mode: color-burn;
  background-attachment: fixed;
}

h1 {
  margin-top: 0;
  padding-top: 1.5em;
  color: white;
  font-family: "Audiowide", cursive;
}

p {
  width: 80%;
  margin: 5.8em auto 3.5em auto;
  font-size: 1.2em;
  font-family: "Tomorrow", sans-serif;
  color: white;
  background-color: black;
  padding: 1.5em;
  border-radius: 10px;
}

.buttons {
  margin-top: 6em;
}

@media screen and (min-width: 650px) {
  p {
    width: 60%;
  }

  .buttons button:first-of-type {
    margin-right: 60px;
  }
}

button span {
  vertical-align: super;
  font-size: 11px;
  color: purple;
}
</style>
