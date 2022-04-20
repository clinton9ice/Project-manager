<template>
  <navigation> </navigation>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component"></component>
    </transition>
  </router-view>
</template>

<script setup>
import Navigation from "@/components/Navigation";
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
