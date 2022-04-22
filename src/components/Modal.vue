<template>
  <transition name="slide" mode="in-out">
    <div class="modal" v-show="open" :class="{ active: modal.isActive }">
      <div class="modal-dialog">
        <form class="modal-content" @submit.prevent="submit">
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
            <form id="form">
              <div class="mb-3">
                <label for="recipient-name" class="col-form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="recipient-name"
                  v-model.trim="obj.title"
                  required="required"
                />
              </div>

              <div class="mb-3">
                <label class="col-form-label">Description:</label>
                <QuillEditor
                  v-model:content="obj.description"
                  style="min-height: 40vh !important"
                />
              </div>

              <div class="mb-3">
                <select
                  name="form-select"
                  class="form-select"
                  v-model="obj.status"
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
            </form>
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
            <button type="submit" class="btn btn-primary">Send message</button>
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
  setup(props) {
    const store = useStore();
    const obj = {
      id: null,
      title: null,
      complete: false,
      status: props.header,
      description: "",
    };
    return { store, obj, statusOptions: store.state.projectStatus };
  },

  methods: {
    // Submit form
    submit() {
      let err = false;
      const data = {
        title: this.obj.title,
        date: dateCombined,
        description: this.obj.description,
        complete: this.obj.complete,
        state: this.obj.status,
      };
      // Check for empty fields
      Object.values(data).forEach((e) => {
        if (e === null || e === "") {
          err = true;
        }
      });

      if (!err) {
        this.store.dispatch("insert_project", data);
        this.resetForm(this.obj);
      } else
        this.$store.commit("SET_MESSAGE", { error: "All inputs are required" });
    },
    resetForm(form) {
      return Object.getOwnPropertyNames(form).forEach((prop) => {
        if (form[prop] === false || form[prop] === null) return;
        return (form[prop] = null);
      });
    },
    closeForm() {
      return this.store.dispatch("init_modal");
    },
  },
  watch: {
    header(header) {
      this.obj.status = header;
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
