<template>
  <transition name="slide" mode="in-out">
    <div class="modal" v-show="open" :class="{ active: modal.isActive }">
      <div class="modal-dialog">
        <form class="modal-content" id="form" @submit.prevent="submit">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New Project</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="closeForm"
            ></button>
          </div>

          <div class="modal-body">
            <div class="mb-3">
              <label for="recipient-name" class="col-form-label">Title</label>
              <input
                type="text"
                class="form-control"
                id="recipient-name"
                v-model.trim="title"
                required="required"
                autocomplete="off"
              />
            </div>

            <div class="mb-3">
              <label class="col-form-label">Description:</label>
              <QuillEditor
                v-model:content="description"
                style="min-height: 40vh !important"
                v-if="!empty"
              />
              <QuillEditor
                v-else
                content=""
                style="min-height: 40vh !important"
                @focus="empty = false"
              />
            </div>

            <div class="mb-3">
              <select
                name="form-select"
                class="form-select"
                v-model="headerStatus"
              >
                <!-- <option disabled="disabled" value="">Select One</option> -->
                <option
                  v-for="option in statusOptions"
                  :value="option"
                  :key="option"
                >
                  {{ option }}
                </option>
              </select>
            </div>
          </div>

          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="closeForm"
            >
              Close
            </button>

            <button v-if="!saved" type="submit" class="btn btn-primary">
              Save Task
            </button>

            <button v-else class="btn btn-primary" type="button" disabled>
              <span
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </transition>
</template>

<script>
import { useStore, mapState } from "vuex";
import QuillEditor from "@/components/Quil-editor";
import { dateCombined } from "@/components/Date";

export default {
  components: {
    QuillEditor,
  },
  props: {
    header: String,
    open: Boolean,
  },
  setup() {
    const store = useStore();
    return {
      store,
      statusOptions: store.state.projectStatus,
      verified: store.getters.user.emailVerified,
    };
  },

  data() {
    return {
      title: null,
      complete: false,
      description: "",
      saved: false,
      headerStatus: this.header,
      empty: false,
    };
  },

  methods: {
    // Submit form
    async submit() {
      let err = false;
      // false the saved status
      this.saved = true;

      // Check if the user is verified before uploading to the server
      if (!this.verified) return alert("Verify your email to proceed");

      // Arrange the data to be uploaded
      const data = {
        date: dateCombined,
        title: this.title,
        description: this.description,
        complete: this.complete,
        state: this.headerStatus,
      };

      // Check for empty fields
      Object.values(data).forEach((e) => {
        if (e === null || e === "") {
          err = true;
        }
      });

      if (!err) {
        await this.store.dispatch("insert_project", data);
        // Delay clearing the form
        setTimeout(() => {
          this.saved = false;
          this.resetForm(this.$data);
        }, 1000);
        this.empty = true;
      } else {
        await this.$store.commit("SET_MESSAGE", {
          error: "All inputs are required",
        });
        this.saved = false;
      }
      // Reset the loader
    },

    resetForm(form) {
      return Object.getOwnPropertyNames(form).forEach((prop) => {
        // Skip objects that are not string related
        if (form[prop] === false || form[prop] === null) return;
        // reset the properties
        form[prop] = null;
        // Set the header to default selected container
        form["headerStatus"] = this.header;
        return form[prop];
      });
    },
    closeForm() {
      return this.store.dispatch("init_modal");
    },
  },
  watch: {
    header(header) {
      this.headerStatus = header;
    },
  },
  computed: mapState(["modal"]),
};
</script>

<style lang="scss" scoped>
.modal {
  display: block;
  background-color: rgba(0, 0, 0, 0.5);
  right: 0;
  left: unset;
  transform-origin: right;
  transform-style: preserve-3d;
  transform: translateX(0);

  .modal-body {
    overflow-y: auto;
  }

  .modal-dialog {
    transition: all 0.3s ease;
    width: 0;
    overflow: hidden;
    animation: wrap 500ms ease 200ms;
  }
  @keyframes wrap {
    to {
      opacity: 1;
      width: 100%;
    }
    from {
      opacity: 0;
      width: 0;
    }
  }

  &.active {
    .modal-dialog {
      //opacity: 1;
      width: 100%;
      opacity: 1;
    }
  }
}
.modal-content {
  height: inherit;
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 700px;
    margin: 0;
    margin-left: auto;
    height: inherit;
  }
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease-in-out;
}
.slide-leave-active {
  transition-delay: 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateX(1200px);
}
</style>
