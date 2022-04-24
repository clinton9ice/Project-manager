<template>
  <div class="alert alert-danger" v-if="offline">No network connection</div>
</template>

<script>
export default {
  props: {
    check: Boolean,
  },
  data() {
    return {
      offline: this.check,
    };
  },
  watch: {
    async check(e) {
      this.offline = e;
    },
  },
};
</script>
