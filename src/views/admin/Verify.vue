<template>
  <div class="container m-auto pt-5">
    <div class="card">
      <h2 class="card-header">Hello {{ $store.state.user.displayName }}.</h2>
      <div class="card-body" v-if="!verify">
        <h4 class="card-title text-danger">Verify your email Email</h4>
        <p class="card-text">
          To complete your profile setup, an email address verification link has
          been sent to you.
        </p>
        <a href="/admin" class="btn btn-primary">Email verified</a>
      </div>
      <div class="card-body" v-if="verify">
        <h5 class="card-title text-success">Email Verified</h5>
        <p class="card-text">
          Your email has already been verified. Go to your dashboard.
        </p>
        <router-link :to="{ name: 'admin' }" class="btn btn-primary"
          >Dashboard</router-link
        >
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Verify",
  components: mapGetters(["user"]),
  data() {
    return {
      verify: false,
    };
  },
  created() {
    if (this.$store.state.user.emailVerified) {
      this.verify = true;
    }
  },
};
</script>

<style lang="scss" scoped></style>
