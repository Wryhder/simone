<template>
  <section id="play-area">
    <template v-for="n in numberOfButtonsForCurrentLevel">
      <Button v-bind:key="n" @click="$emit('button-clicked')" />
    </template>
  </section>
</template>

<script lang="ts">
import { mapState } from "vuex";
import Button from "./Button.vue";

export default {
  name: "PlayArea",
  computed: {
    ...mapState([
      "numberOfButtonsForCurrentLevel"
    ])
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
