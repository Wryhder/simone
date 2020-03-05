<template>
  <div id="home">
    <h1>Simone</h1>
    <p id="typed-text"></p>
    <div class="buttons">
      <button @click="$emit('start-game')" :to="{ name: 'Game Screen' }">
        Start New Game
      </button>
      <button @click="resumeGame">
        Resume Saved Game<span style=" vertical-align: super;"
          >coming soon!</span
        >
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      typedText: [
        "Welcome to the Sybil System grading portal!",
        "Find out your criminal coefficient with the game of Simone.",
        "Your final score will be calculated as the overall average of all scores recorded."
      ],
      speed: 100, // time delay of print out
      startIndex: 0, // start printing array at this posision
      arrayLength: null, // the length of the text array
      scrollAt: 20, // start scrolling up at this many lines

      textPos: 0, // initialise text position
      contents: "", // initialise contents variable
      row: null // initialise current row
    };
  },
  methods: {
    resumeGame() {
      console.log("Loading saved game...");
    },
    typewriter() {
      this.contents = " ";
      this.row = Math.max(0, this.startIndex - this.scrollAt);

      while (this.row < this.startIndex) {
        this.contents += this.typedText[this.row++] + "<br />";
      }
      this.destination.innerHTML =
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
    }
  },
  mounted() {
    this.arrayLength = this.typedText[0].length;
    this.destination = document.getElementById("typed-text");
    this.typewriter();
  }
};
</script>

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
  /* margin-top: 10em; */
  width: 60%;
  margin: 5.8em auto 3.5em auto;
  font-size: 1.5em;
  font-family: "Tomorrow", sans-serif;
  color: white;
  background-color: black;
  padding: 1.5em;
  border-radius: 10px;
}

.buttons {
  margin-top: 6em;
  display: flex;
  flex-direction: column;
  align-items: center;
}

@media screen and (min-width: 650px) {
  .buttons {
    /* display: block; */
    flex-direction: row;
    justify-content: center;
    margin-right: 0;
  }

  .buttons button:first-of-type {
    margin-right: 60px;
  }
}

.buttons button {
  padding: 10px;
  margin-bottom: 20px;
  color: black;
  font-size: 1em;
  font-family: "Audiowide", cursive;
  border: none;
  box-shadow: 0px 10px 14px -7px #276873;
  background: linear-gradient(to bottom, navajowhite 5%, #77a809 100%);
  border-radius: 10px;
  cursor: pointer;
  width: fit-content;
}

button span {
  vertical-align: super;
  font-size: 11px;
  color: purple;
}
</style>
