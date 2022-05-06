<template>
  <div class="container-fluid">
    <div class="d-flex justify-content-center content-wrapper">
      <div class="form-section pt-5">
        <div class="form-section">
          <div class="container m-auto">
            <h1 class="title my-5 text-center">Reset your password</h1>

            <form class="login-form" @submit.prevent="submit">
              <div class="form-group">
                <label for="email" class="label"> Email</label>
                <div class="form-row">
                  <input
                    type="email"
                    name="email"
                    class="form-control"
                    placeholder="Enter your account email"
                    required
                    v-model.trim="data.email"
                    :disabled="data.load"
                  />
                  <button class="btn disabled attach-icon">
                    <i class="bi bi-person-fill"></i>
                  </button>
                </div>
              </div>

              <div class="btn-container d-flex justify-content-center">
                <button class="btn btn-primary">
                  <span v-if="!data.load">Send code</span>
                  <span v-else> Wait a moment...</span>
                </button>
              </div>
            </form>

            <p class="text-muted mt-4 text-center">
              <router-link :to="{ name: 'signin' }" class="link mt-2"
                >Sign back in</router-link
              >
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";

import { useStore } from "vuex";
export default {
  setup() {
    const data = reactive({
      email: "",
      load: false,
    });

    const store = useStore();

    const submit = () => {
      //  Get the email
      const { email } = data;

      if (email) {
        data.load = true;
        setTimeout(async () => {
          await store.dispatch("resetPass", email);
          data.load = false;
          data.email = "";
        }, 2000);
        return;
      }

      store.commit("SET_MESSAGE", { error: "Email can't be empty" });
    };

    return { data, submit };
  },
};
</script>

<style lang="scss" scoped>
.container {
  max-width: 400px;
}
</style>
