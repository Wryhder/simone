<script lang="ts">
import { defineComponent } from "vue";
import { mapActions, mapWritableState } from "pinia";
import { usePlayerStore } from "../stores/player";

import ButtonComp from "./ButtonComp.vue";

export default defineComponent({
  components: {
    ButtonComp,
  },
  data() {
    return {
      buttonDeck: null as HTMLParagraphElement | null,
      isGameOver: false as boolean,
      playerPatternLength: 0 as number,
      clickedButtons: [] as Array<EventTarget>,
      buttonBackgroundColours: ["indianred", "blue", "purple", "green"],
      buttonElements: {
        indianred: document.querySelector(".indianred"),
        blue: document.querySelector(".blue"),
        purple: document.querySelector(".purple"),
        green: document.querySelector(".green"),
      },
    };
  },
  computed: {
    ...mapWritableState(usePlayerStore, [
      "numberOfButtonsForCurrentLevel",
      "pattern",
    ]),
  },
  methods: {
    ...mapActions(usePlayerStore, ["lengthenPattern"]),

    attachListeners() {
      this.buttonDeck.addEventListener("click", this.manageGamePlay);
    },

    removeListeners() {
      this.buttonDeck.removeEventListener("click", this.manageGamePlay);
    },

    manageGamePlay(event: Event) {
      const clickTarget: EventTarget | null = event.target;

      while (!this.isGameOver) {
        // 1. Play animation pattern
        // 2. Attach listeners, wait for user clicks,
        // verify pattern (increasing score with each correct pattern)
        // 3. Remove listeners, play next pattern
        // if (!this.isValid(clickTarget)) {
        //   console.log(clickTarget);
        //   this.isGameOver = true;
        //   console.log(this.isGameOver);
        // }
      }
      // console.log(this.isValid(clickTarget));
    },

    animateButtons(callback?: CallableFunction) {
      let animationDelay = 0;
      let self = this;
      let lastAnimatedButton: ButtonComp =
        this.pattern[this.pattern.length - 1];

      // for (const colour of self.pattern) {
      //   button.classList.toggle("heartbeat");
      //   button.setAttribute(
      //     "style",
      //     `animation-delay: ${(animationDelay += 2)}s`
      //   );
      // }

      function handleAnimationEnd() {
        // for (const colour of self.pattern) {
        //   button.classList.toggle("heartbeat");
        //   button.removeAttribute("style");
        // }

        // lastAnimatedButton.removeEventListener(
        //   "animationend",
        //   handleAnimationEnd
        // );

        if (typeof callback === "function") callback();
      }

      lastAnimatedButton.addEventListener("animationend", handleAnimationEnd);
    },

    getRandomId(): string {
      return this.buttonBackgroundColours[
        Math.floor(Math.random() * this.buttonBackgroundColours.length)
      ];
    },

    isValid(clickTarget: EventTarget | null) {
      this.playerPatternLength += 1;

      // For a click to be valid:
      // 1. Target needs to be a button with id of "simone-button"
      // 2. Target's click order should match the button
      //  in an equivalent position in the this.pattern array
      // e.g target === this.pattern[targetClickOrder]
      // 3. TODO:
      // return (
      //   clickTarget.id === "simone-button" &&
      //   // Substract 1 from this.playerPatternLength since array indexing starts from 0
      //   clickTarget === this.pattern[this.playerPatternLength - 1] &&
      //   this.playerPatternLength.length <= this.numberOfButtonsForCurrentLevel
      // );
    },
    async mounted() {
      await this.$nextTick();

      this.buttonDeck = document.querySelector(
        "#play-area section:first-of-type"
      );
      this.lengthenPattern(this.getRandomId());
      console.log(this.pattern);
      this.playerPatternLength = 0;
      this.isGameOver = false;

      this.animateButtons(this.attachListeners);
    },
  },
});
</script>

<template>
  <section id="play-area">
    <transition-group tag="section">
      <ButtonComp
        v-for="(item, index) in buttonBackgroundColours.length"
        :key="index"
        v-bind:class="[
          buttonBackgroundColours[index % buttonBackgroundColours.length],
        ]"
      />
    </transition-group>

    <div class="buttons">
      <!-- <button @click="resetLevel">Reset Level</button>
      <button @click="saveGame">Save Game and Exit</button> -->
    </div>
  </section>
</template>

<style>
#play-area {
  width: 100%;
  margin: 5em 0 2em 0;
  /* display: flex; */
}

#play-area section:first-child {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.heartbeat {
  animation: heartbeat 3s;
}

@keyframes heartbeat {
  0% {
    background-color: skyblue;
  }
  50% {
    transform: perspective(500px) scale3d(2, 0.7, 0.2) translateZ(100px);
  }
  100% {
    transform: none;
  }
}

button {
  font-size: 1em;
}
</style>
