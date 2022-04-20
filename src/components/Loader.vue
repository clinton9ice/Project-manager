<template>
  <div :class="[overlay ? 'overlay' : '', 'loader']">
    <div class="sk-chase" v-if="name === 'chase'">
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
      <div class="sk-chase-dot"></div>
    </div>

    <div class="sk-bounce" v-else-if="name === 'bounce'">
      <div class="sk-bounce-dot"></div>
      <div class="sk-bounce-dot"></div>
    </div>

    <div class="sk-wave" v-else-if="name === 'wave'">
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
      <div class="sk-wave-rect"></div>
    </div>

    <div class="sk-pulse" v-else-if="name === 'pulse'"></div>

    <div class="sk-flow" v-else-if="name === 'flow'">
      <div class="sk-flow-dot"></div>
      <div class="sk-flow-dot"></div>
      <div class="sk-flow-dot"></div>
    </div>

    <div class="sk-swing" v-else-if="name === 'swing'">
      <div class="sk-swing-dot"></div>
      <div class="sk-swing-dot"></div>
    </div>

    <div class="sk-circle-fade" v-else-if="name === 'fade'">
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
      <div class="sk-circle-fade-dot"></div>
    </div>

    <div class="sk-grid" v-else-if="name === 'grid'">
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
      <div class="sk-grid-cube"></div>
    </div>

    <div class="sk-fold" v-else-if="name === 'fold'">
      <div class="sk-fold-cube"></div>
      <div class="sk-fold-cube"></div>
      <div class="sk-fold-cube"></div>
      <div class="sk-fold-cube"></div>
    </div>

    <div class="sk-wander" v-else-if="name === 'cube'">
      <div class="sk-wander-cube"></div>
      <div class="sk-wander-cube"></div>
      <div class="sk-wander-cube"></div>
    </div>

    <div class="sk-plane" v-else-if="name === 'plane'"></div>

    <div class="sk-circle" v-else>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
      <div class="sk-circle-dot"></div>
    </div>
  </div>
</template>

<script>
import "spinkit/spinkit.min.css";
export default {
  name: "Loader",
  props: {
    name: String,
    overlay: Boolean,
  },
};
</script>

<style scoped lang="scss">
.overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: progress;
  background: #e5e6e9fa;
  backdrop-filter: blur(2px);
  transition: 200ms ease-in-out;
}
</style>
