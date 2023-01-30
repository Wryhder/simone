<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: ["level", "levelScore"],
});
</script>

<template>
  <tr>
    <td>Level {{ level }}</td>
    <td>{{ levelScore }}</td>
  </tr>
</template>

<style></style>
