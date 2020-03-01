<template>
  <section id="play-area">
    <transition-group>
    <Button
      v-for="n in numberOfButtonsForCurrentLevel"
        :key="n"
      @click="$emit('button-clicked')"
    />
    </transition-group>

    <div class="buttons">
      <button @click="loadNextLevel">Load Next Level</button>
      <button @click="replayCurrentLevel">Replay</button>
      <button @click="resetLevel">Reset</button>
    </div>
  </section>
</template>

<script>
import { mapState } from "vuex";

import Button from "./Button.vue";

export default {
  name: "PlayArea",
  computed: {
    ...mapState([
      "numberOfButtonsForCurrentLevel"
    ])
  },
  methods: {
    loadNextLevel() {
      this.$store.commit("increment");
    },
    reset() {
      this.$store.commit("reset");
    }
  },
  components: {
    Button
  }
};
</script>

<style>
#play-area {
  width: 100%;
  margin: 5em 0 2em 0;
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
</style>
