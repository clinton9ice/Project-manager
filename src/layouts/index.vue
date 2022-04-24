<template>
  <offlineAlert :check="offline" />
  <Navigation> </Navigation>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" v-if="loaded"></component>
      <loader v-else :overlay="true"></loader>
    </transition>
  </router-view>
  <Alert v-if="message.error" :error="true" :msg="message.error"></Alert>
  <Alert v-if="message.success" :success="true" :msg="message.success"></Alert>
</template>

<script>
import Navigation from "@/components/Navigation";
import Alert from "@/components/temp/Alert";
import { mapState } from "vuex";
import Loader from "@/components/Loader";
import offlineAlert from "@/components/Offline";

export default {
  components: {
    Navigation,
    Alert,
    Loader,
    offlineAlert,
  },
  computed: mapState(["message", "loaded", "offline"]),
  created() {
    this.$store.dispatch("getAllProjects");
  },
};
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
