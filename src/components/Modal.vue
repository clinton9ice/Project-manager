<template>
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <form class="modal-content" @submit.prevent="submit">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">New Project</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            @click="$store.dispatch('modal_status')"
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
                style="min-height: 20vh !important"
              />
            </div>

            <div class="mb-3">
              <select
                name="form-select"
                class="form-select"
                v-model="obj.status"
              >
                <option disabled="disabled" value="">Select One</option>
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
            @click="$store.dispatch('modal_status')"
          >
            Close
          </button>
          <button type="submit" class="btn btn-primary">Send message</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import QuillEditor from "@/components/Quil-editor";
import { dateCombined } from "@/components/Date";

export default {
  components: {
    QuillEditor,
  },
  props: {
    selected: String,
    id: String,
  },
  setup(props) {
    const store = useStore();
    const obj = {
      id: null,
      title: null,
      complete: false,
      status: props.selected.toLowerCase() || "save",
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
      // Check for empty form
      Object.values(data).forEach((e) => {
        if (e === null || e === "") err = true;
      });
      if (!err) {
        this.store.dispatch("insert_project", data);
        this.resetForm(this.obj);
      }
    },
    resetForm(form) {
      Object.getOwnPropertyNames(form).forEach((prop) => {
        if (form[prop] === false || form[prop] === null) return;
        return (form[prop] = "");
      });
    },
  },
};
</script>

<style scoped>
.ql-container.ql-snow {
  min-height: 20vh !important;
}
</style>
