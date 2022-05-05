<template>
  <div class="container-fluid p-0 m-0">
    <div class="d-flex align-content-center content-wrapper">
      <div class="ads-section"></div>

      <div class="form-section">
        <div class="container" v-if="!verifyEmail">
          <h3 class="title">Create Account</h3>
          <p class="text-muted">Make your project plans easy to remeber.</p>

          <div
            class="account-option mb-5"
            data-account-selection="options"
            v-if="!custom"
          >
            <p class="txt my-4">Continue with:</p>
            <div class="account-selection">
              <div class="account-type" @click="connectGoogle">
                <i class="bi bi-google"></i>
                <p class="text">Google</p>
              </div>

              <div class="account-type" @click="customUnWrap">
                <i class="bi bi-envelope-open"></i>
                <p class="text">Email Address</p>
              </div>
            </div>
          </div>

          <div
            class="custom-form"
            :class="{ active: custom }"
            data-account="custom-account"
          >
            <form @submit.prevent="submit">
              <div class="form-group">
                <label for="email" class="label"> Email</label>
                <input
                  type="email"
                  id="email"
                  class="form-control"
                  placeholder="Enter your email"
                  v-model.trim="data.email"
                  required
                />
              </div>
              <div class="form-group">
                <label for="name" class="label"> Name</label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  class="form-control"
                  placeholder="Enter your Full name"
                  v-model.trim="data.name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="password" class="label"> Password</label>
                <div class="form-row">
                  <input
                    :type="[password ? 'text' : 'password']"
                    name="password"
                    id="password"
                    class="form-control"
                    placeholder="Create your Password"
                    required
                    v-model.trim="data.password"
                  />

                  <button
                    type="button"
                    @click="showPassword"
                    class="btn attach-icon"
                  >
                    <i class="bi bi-eye" v-if="password"></i>
                    <i class="bi bi-eye-slash" v-else></i>
                  </button>
                </div>
              </div>

              <div class="btn-container">
                <button
                  type="button"
                  class="btn btn-outline-secondary me-3"
                  @click="customUnWrap"
                >
                  Select option
                </button>
                <button class="btn btn-primary">Sign Up</button>
              </div>
            </form>
          </div>

          <p class="text-muted mt-2">
            Already have an account? <br />
            <router-link
              :to="{ name: 'signin' }"
              class="link font-weight-bold mt-2"
              >Sign In</router-link
            >
          </p>

          <p class="mt-2 text-muted">
            By creating account means you've agreed to our
            <a href="#" class="link">Terms and Condition</a>
          </p>
        </div>
        <div class="container" v-else>
          <h2 class="text-success">
            An Email verification code has been sent you. You will now be
            redirected...
          </h2>
        </div>
      </div>
    </div>

    <loader name="flow" v-if="load" :overlay="true" style="position: fixed"></loader>
  </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  components: {
    Loader,
  },
  data() {
    const data = {
      email: "",
      name: "",
      password: "",
    };
    return {
      data,
      custom: false,
      password: false,
      load: false,
      verifyEmail: false,
    };
  },
  methods: {
    customUnWrap() {
      this.custom = !this.custom;
    },

    showPassword() {
      this.password = !this.password;
    },
     submit() {
      // Pop up the loader
      this.load = true;
      setTimeout(async ()=>{
        
        await this.$store
          .dispatch("signUp", this.data)
          .then(() => (this.load = false));
      }, 1000)
    },

    connectGoogle() {
      this.load = true;
      // Trigger google service
      this.$store.dispatch("signInWithGooogle").then( () => {
        this.load = true;
      })

      // setTimeout(() => {
      //   this.load = false;
      // }, 5000);
    },
  },
};
</script>

<style lang="scss" scoped></style>
