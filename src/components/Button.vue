<template>
  <div class="button"></div>
</template>

<script>
export default {};
</script>

<style>
div.button {
  width: 100px;
  height: 60px;
  background-color: indianred;
  margin: 0 0 10px 0;
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
