<template>
  <section id="admin-settings" class="container py-5">
    <h3>Settings</h3>
    <br />

    <!-- Profile -->
    <div
      class="custom-container mb-5 profile row justify-content-center align-items-center flex-wrap"
      id="profile"
    >
      <div class="col-sm-auto col-4 img-section">
        <div class="avatar avatar-xl position-relative">
          <img :src="$store.getters.user.photoURL" alt="Profile pics" />
          <label class="btn float-btn" for="profileUrl">
            <i class="bi bi-pen"></i>
          </label>
        </div>
      </div>

      <div class="col-sm-auto col-8 my-auto name-section">
        <div class="px-2">
          <h5 class="mb-1 font-weight-bolder">
            {{ $store.getters.user.displayName }}
          </h5>
          <p class="mb-0 text-muted small">{{ $store.getters.user.email }}</p>
        </div>
      </div>

      <div
        class="col-sm-auto ms-sm-auto mt-sm-0 mt-3 d-flex align-items-center"
      ></div>
    </div>
    <!-- // -->
    <!-- Bio -->
    <div class="custom-container mt-4 password">
      <div class="header d-flex">
        <i class="bi bi-user-fill me-3 text-primary"></i>
        <h5 class="section-title">Profile</h5>
      </div>
      <hr class="bg-secondary mt-1" />

      <br />

      <div class="card-body pt-0">
        <form @submit.prevent="updateProfile">
          <div class="form-group mb-4">
            <label class="form-label mb-2">Name</label>
            <input
              class="form-control"
              type="text"
              v-model.trim="profile.name"
              required
            />
          </div>

          <div class="form-group mb-4">
            <label class="form-label mb-2">Email</label>
            <input
              class="form-control"
              type="email"
              v-model.trim="profile.email"
              required
            />
          </div>
          <div class="form-group mb-4">
            <label class="form-label mb-2">Profile Url</label>
            <input
              class="form-control"
              type="url"
              id="profileUrl"
              v-model.trim="profile.profileUrl"
              required
            />
          </div>
          <button
            type="submit"
            v-if="!setting.isClicked"
            class="btn btn-outline-primary btn-sm mt-6"
          >
            Update Profile
          </button>
          <button v-else class="btn btn-primary" type="button" disabled>
            <span
              class="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            wait a sec...
          </button>
        </form>
      </div>
    </div>
    <!-- /// -->

    <!-- Security -->
    <div class="custom-container mt-4 password" id="password">
      <div class="header d-flex">
        <i class="bi bi-lock-fill me-3 text-primary"></i>
        <h5 class="section-title">Password & Security</h5>
      </div>
      <hr class="bg-secondary mt-1" />

      <br />

      <div class="card-body pt-0">
        <div class="form-group mb-4">
          <label class="form-label mb-2">Current password</label>
          <input
            class="form-control"
            type="password"
            placeholder="Current password"
            v-model.trim="profile.current_password"
          />
        </div>

        <div class="form-group mb-4">
          <label class="form-label mb-2">New password</label>
          <input
            class="form-control"
            type="password"
            placeholder="New password"
            v-model.trim="profile.new_password"
          />
        </div>

        <div class="form-group mb-4">
          <label class="form-label mb-2">Confirm new password</label>
          <input
            class="form-control"
            type="password"
            placeholder="Confirm password"
            v-model.trim="profile.c_pass"
          />
        </div>

        <button @click="resetPass" class="btn btn-outline-primary btn-sm mt-6">
          Update password
        </button>
      </div>
    </div>
    <!-- /// -->

    <div class="custom-container mt-4" id="delete">
      <div class="mb-4 p-2">
        <h5 class="section-title">Delete Account</h5>
        <p class="small text-muted mb-0">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>
      </div>

      <div class="card-body d-flex justify-content-between flex-wrap align-items-center pt-0">
        <div class="d-flex align-items-center mb-sm-0 mb-4">
          <div>
            <div class="form-check form-switch mb-0">
              <input
                class="form-check-input"
                type="checkbox"
                id="delete-account"
                v-model="profile.confirm"
              />
            </div>
          </div>

          <label class="ms-2" for="delete-account">
            <span class="font-weight-bold d-block small"
              >Confirm to delete my account</span
            >
          </label>
        </div>

        <button
          class="btn btn-danger mb-0 ms-2 rounded-3"
          type="button"
          name="button"
          @click="deleteAcc"
        >
          Delete Account
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { reactive } from "vue";

import { useStore } from "vuex";

export default {
  setup() {
    const profile = reactive({
      email: "",
      name: "",
      profileUrl: "",
      current_password: "",
      new_password: "",
      c_pass: "",
      confirm: false,
    });

    const setting = reactive({
      isClicked: false,
    });

    const initData = reactive({
      user: "",
    });

    const store = useStore();

    const deleteAcc = async () => {
      if (!profile.confirm) {
        store.commit("SET_MESSAGE", {
          error: "You need to confirm your account deletion",
        });
        return;
      }
      await store.dispatch("delete_acc")
    };

    const updateProfile = async () => {
      setting.isClicked = true;

      if (!store.state.emailVerified) {
        store.commit("SET_MESSAGE", {
          error: "You need to verify Your email to make changes",
        });
        return;
      }
      if (
        profile.email === initData.user.email &&
        profile.name === initData.displayName &&
        profile.profileUrl === initData.photoURL
      ) {
        // Send an error report
        store.commit("SET_MESSAGE", { error: "No Changes detected" });
        setting.isClicked = false;
        return;
      }

      // Send to files to the store to update
      await store.dispatch("update_profile", profile);
      setting.isClicked = false;
    };

    const resetPass = async () => {
      const { current_password, new_password, c_pass } = profile;
      if (!store.state.emailVerified) {
        store.commit("SET_MESSAGE", {
          error: "You need to verify Your email to make changes",
        });
        return;
      }

      if (new_password !== c_pass) {
        store.commit("SET_MESSAGE", {
          error: "Passwords does not match",
        });
        return;
      }
      console.log(new_password, current_password);

      if (new_password === current_password) {
        store.commit("SET_MESSAGE", {
          error: "Current password can't be the same with the new password",
        });
        return;
      }

      await store.dispatch("update_password", new_password);
    };

    return {
      profile,
      store,
      deleteAcc,
      updateProfile,
      resetPass,
      initData,
      setting,
    };
  },

  async created() {
    const user = this.store.state.user;
    this.profile.name = user.displayName;
    this.profile.email = user.email;
    this.profile.profileUrl = user.photoURL;
    this.initData.user = user;
  },
};
</script>

<style lang="scss" scoped>
.custom-container {
  margin: 0.5rem auto;
  border-radius: 6px;
  background-color: var(--bs-white);
  padding: 1rem;
  width: 100%;
  box-shadow: 4px 9px 21px #1010100d;

  .avatar {
    color: #fff;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    border-radius: 0.4rem;
    height: 80px;
    width: 80px;
    transition: all 0.2s ease-in-out;
    box-shadow: 0 15px 12px rgba(0, 0, 0, 0.05);
    position: relative;
    .float-btn {
      position: absolute;
      bottom: -7px;
      right: -7px;
      border-radius: 50%;
      background-color: hsl(29deg 85% 57%);
      height: 30px;
      width: 30px;
      line-height: 30px;
      padding: 0;
      color: var(--bs-white);
      font-size: 0.8em;
      box-shadow: 3px 3px 6px rgba(0, 0, 0, 0.05) !important;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 6px;
    }

    .file {
      visibility: hidden;
    }
  }
}
</style>
