<template>
  <button id="simone-button"></button>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Button extends Vue {}
</script>

<style>
#simone-button {
  width: 15em;
  height: 60px;
  margin: 0 0 10px 0;
  box-shadow: 0px 10px 14px -7px #276873;
  background: linear-gradient(to bottom, white 5%, indianred 100%);
  border-radius: 10px;
  cursor: pointer;
}
</style>
