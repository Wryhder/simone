<template>
  <section id="play-area">
    <template v-for="n in numberOfButtonsForCurrentLevel">
      <Button v-bind:key="n" @click="$emit('button-clicked')" />
    </template>
  </section>
</template>

<script lang="ts">
import Button from "./Button.vue";

export default {
  name: "PlayArea",
  data() {
    return {}
  },
  components: {
    Button
  },
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
