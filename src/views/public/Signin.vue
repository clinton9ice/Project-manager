<template>
  <div class="container-fluid">
    <div class="d-flex align-content-center content-wrapper">
      <div class="ads-section lg"></div>

      <div class="form-section">
        <div class="container m-auto">
          <h3 class="title">Welcome Back</h3>
          <p class="text-muted">Let's get you reconnected immediately.</p>

          <div class="account-option" data-account-selection="options">
            <p class="txt my-4">Connect with:</p>
            <div class="account-selection" v-if="!customForm">
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

          <div class="custom-form" :class="{ active: customForm }">
            <form class="login-form" @submit.prevent="submit">
              <div class="form-group">
                <label for="email" class="label"> Email</label>
                <div class="form-row mt-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="form-control"
                    placeholder="Enter your email"
                    required
                    v-model.trim="data.email"
                    :disabled="load"
                  />
                  <button class="btn disabled attach-icon">
                    <i class="bi bi-person-fill"></i>
                  </button>
                </div>
              </div>
              <div class="form-group">
                <div class="d-flex align-item-center justify-content-between">
                  <label for="password" class="label"> Password</label>
                  <router-link :to="{ name: 'resetPassword' }" class="small"
                    >Forgotten password?</router-link
                  >
                </div>
                <div class="form-row mt-2">
                  <input
                    :type="[viewPass ? 'text' : 'password']"
                    name="password"
                    id="password"
                    class="form-control"
                    placeholder="Create your Password"
                    required
                    v-model.trim="data.password"
                    :disabled="load"
                  />

                  <button
                    type="button"
                    @click="showPassword"
                    class="btn attach-icon"
                  >
                    <i class="bi bi-eye" v-if="viewPass"></i>
                    <i class="bi bi-eye-slash" v-else></i>
                  </button>
                </div>
              </div>

              <div class="btn-container">
                <button class="btn btn-primary">
                  <span v-if="!load">Sign in</span>
                  <span v-else> Wait a moment...</span>
                </button>
              </div>
            </form>
          </div>

          <p class="text-muted mt-4">
            I don't have an account yet?
            <router-link :to="{ name: 'signup' }" class="link fw-bold mt-2"
              >Sign Up</router-link
            >
          </p>
        </div>
      </div>
    </div>
    <loader v-if="load" name="flow" :overlay="true" style="position: fixed" />
  </div>
</template>

<script>
import Loader from "@/components/Loader";

export default {
  components: {
    Loader,
  },
  data() {
    let data = {
      email: "",
      password: "",
    };
    return {
      data,
      customForm: false,
      viewPass: false,
      load: false,
    };
  },
  methods: {
    customUnWrap() {
      this.customForm = !this.customForm;
    },

    showPassword() {
      this.viewPass = !this.viewPass;
    },
    async submit() {
      this.load = true;
      this.$store.dispatch("signIn", this.data).then(() => {
        this.load = false;
      });
    },

    connectGoogle() {
      this.load = true;
      this.$store.dispatch("signInWithGooogle").then(() => {
        this.load = true;
      });
    },
  },
};
</script>