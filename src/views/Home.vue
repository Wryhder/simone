<template>
  <div id="home">
    <h1>Simone</h1>
    <p id="typed-text"></p>
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
  data() {
    return {
      aText: [
        "Welcome to the Sybil System grading portal!", 
        "Find out your criminal coefficient with the game of Simone. Your final score will be calculated as the overall average of all scores recorded."
      ],
      iSpeed: 100, // time delay of print out
      iIndex: 0, // start printing array at this posision
      iArrLength: null, // the length of the text array
      iScrollAt: 20, // start scrolling up at this many lines
  
      iTextPos: 0, // initialise text position
      sContents: '', // initialise contents variable
      iRow: null, // initialise current row

    }
  },
  methods: {
    startGame() {
      this.$emit("start-game");
    },
    resumeGame() {
      console.log("Loading saved game...");
    },
    typewriter() {
      this.sContents =  ' ';
      this.iRow = Math.max(0, this.iIndex - this.iScrollAt);
      
      while ( this.iRow < this.iIndex ) {
        this.sContents += this.aText[this.iRow++] + '<br />';
      }
      this.destination.innerHTML = this.sContents + this.aText[this.iIndex].substring(0, this.iTextPos) + "_";
      if ( this.iTextPos++ == this.iArrLength ) {
        this.iTextPos = 0;
        this.iIndex++;
        if ( this.iIndex != this.aText.length ) {
        this.iArrLength = this.aText[this.iIndex].length;
        setTimeout(this.typewriter, 500);
        }
      } else {
        setTimeout(this.typewriter, this.iSpeed);
      }
    }
  },
  mounted() {
    this.iArrLength = this.aText[0].length;
    this.destination = document.getElementById("typed-text");
    this.typewriter();
  }
};
</script>

<style scoped>
 @import url('https://fonts.googleapis.com/css?family=Audiowide&display=swap');
 @import url('https://fonts.googleapis.com/css?family=Tomorrow&display=swap');

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
  /* margin-top: 10em; */
  width: 60%;
  margin: 5.8em auto 3.5em auto;
  font-size: 1.5em;
  font-family: 'Tomorrow', sans-serif;
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
	font-family: 'Audiowide', cursive;
}

button span {
  vertical-align: super;
  font-size: 11px;
  color: purple;
}
</style>
