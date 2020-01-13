<template>
  <section id="play-area">
    <template v-for="n in numberOfButtonsForCurrentLevel">
      <Button v-bind:key="n" @click="$emit('button-clicked')" />
    </template>
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
  width: 700px;
  margin-top: 2em;
  display: flex;
  flex-direction: column;
}
</style>
