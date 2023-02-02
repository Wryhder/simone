<script lang="ts">
import { defineComponent } from "vue";
import { mapState } from "pinia";
import { usePlayerStore } from "../stores/player";

export default defineComponent({
  props: {
    show: Boolean,
  },
  data() {
    return {
      comments: {
        healthy_hue: "You're all set! Such a great hue you got there.",
        cloudy_hue:
          "A bit cloudy, but no worries! Visit the nearest safety bureau for" +
          " help if you're struggling mentally or emotionally.",
        deteriorating_hue:
          "Please stay calm. We are dispatching the closest bureau inspectors" +
          " to your address. We'll have a psychologist along to help you" +
          " bring your Criminal Coefficient down to acceptable levels.",
        deteriorated_hue: "You are a candidate for lethal action.",
      },
      errorMessage:
        "Error! You must clear at least the first three levels to be graded.",
    };
  },
  computed: {
    ...mapState(usePlayerStore, ["level", "sessionScores"]),
    shouldGrade() {
      return this.level > 3;
    },
    gradingObservation() {
      const cc = this.criminalCoefficient();

      switch (true) {
        case cc < 50:
          return this.comments.healthy_hue;
        case cc > 50 && cc < 100:
          return this.comments.cloudy_hue;
        case cc > 100 && cc < 300:
          return this.comments.deteriorating_hue;
        default:
          return this.comments.deteriorated_hue;
      }
    },
  },
  methods: {
    criminalCoefficient() {
      let levelScores: Array<number> = [];

      for (const key in this.sessionScores) {
        const levelKey = key as keyof typeof this.sessionScores;
        const scoresArray: Array<number> = this.sessionScores[levelKey].scores;
        const levelScore =
          scoresArray.reduce(
            (accumulator, currentValue) => accumulator + currentValue
          ) / scoresArray.length;

        levelScores.push(levelScore);
      }

      const averageScore =
        levelScores.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        ) / levelScores.length;
      return averageScore;
    },
  },
});
</script>

<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-container">
        <div class="modal-header">
          <p>Game over! Processing scores...</p>
        </div>

        <div class="modal-body">
          <div v-if="shouldGrade" class="comment-container">
            <p class="slide-in">
              Your Criminal Coefficient is {{ criminalCoefficient }}
            </p>
            <p class="slide-in delay">{{ gradingObservation }}</p>
          </div>
          <div v-else>
            <p class="slide-in">{{ errorMessage }}</p>
          </div>
        </div>

        <div class="modal-footer">
          <button class="modal-restart-button" @click="$emit('restart')">
            Restart Game
          </button>
          <button class="modal-close-button" @click="$emit('exit')">
            Exit Game
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 300px;
  margin: auto;
  padding: 1.2em;
  background-color: #fff;
  border-radius: 1em;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.comment-container {
  overflow: hidden;
}

p.slide-in {
  animation-duration: 1s;
  animation-name: slidein;
}

@keyframes slidein {
  from {
    margin-left: 100%;
    width: 300%;
  }

  to {
    margin-left: 0%;
    width: 100%;
  }
}

.delay {
  animation-delay: 1.5s;
}

.modal-footer {
  display: flex;
  justify-content: space-evenly;
}

.modal-footer button {
  padding: 0.2em;
  color: black;
  font-size: 1em;
  border-radius: 4px;
  cursor: pointer;
  width: fit-content;
}

.modal-restart-button {
  background-color: #77a80975;
}
.modal-close-button {
  background-color: #cd5c5c8a;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
