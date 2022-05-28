<template>
  <div v-if="isLoaded">
    <div class="col-md-8 p-5 w-100">
      <h4 class="mb-3">Edit Project</h4>

      <form class="needs-validation py-4" @submit.prevent="updateProject">
        <div class="row mb-4">
          <!-- Title -->
          <div class="col-md-6 mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              v-model="data.title"
              class="form-control"
              id="title"
              required=""
            />
            <div class="invalid-feedback">Valid first name is required.</div>
          </div>
          <!-- ====== //====== -->
          <!-- Status -->
          <div class="mb-3 col-md-6">
            <label for="status" class="form-label">Status</label>
            <select
              name="status"
              id="status"
              v-model="data.state"
              class="form-select"
            >
              <option
                :value="options"
                v-for="options in projectStatus"
                :key="options"
                :selected="
                  options === data.state.toLowerCase() ? 'selected' : false
                "
              >
                {{ options }}
              </option>
            </select>
          </div>
          <!-- /====== -->
        </div>

        <div class="mb-3">
          <label class="form-label mb-3">Description</label>
          <quill-editor
            v-if="data.description"
            :text="data.description"
            v-model:content="data.description"
            class="editor"
          ></quill-editor>
        </div>

        <button class="btn btn-primary" type="submit" v-if="updated">
          Update
        </button>

        <button v-else class="btn btn-primary" type="button" disabled>
          <span
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          working on it...
        </button>
      </form>
    </div>
  </div>
  <Loader name="pulse" :overlay="true" v-else />
</template>

<script>
import Loader from "@/components/Loader";
import QuillEditor from "@/components/Quil-editor";
import { useStore } from "vuex";

export default {
  components: {
    Loader,
    QuillEditor,
  },

  setup() {
    const store = useStore();
    return { store };
  },

  data() {
    const options = useStore().state.projectStatus;
    const data = {
      id: null,
      title: "",
      complete: false,
      description: "",
      state: "",
      date: "",
    };
    return {
      data,
      projectStatus: options,
      isLoaded: false,
      updated: true,
    };
  },

  methods: {
    project(id) {
      // Search and append the result of the fetched project
      return this.store.dispatch("get_single_project", id).then((e) => {
        if (e) {
          // Destructure the request
          let { id, description, title, complete, state, date } = e;

          //Set a default placeholders
          this.data.id = id;
          this.data.title = title;
          this.data.state = state;
          this.data.description = description;
          this.data.complete = complete;
          this.data.date = date;
        }
        this.isLoaded = true;
      });
    },

    async updateProject() {
      //Check for complete state
      this.data.complete = this.data.state === "complete";
      this.updated = false;
      //  Send to Edit
      await this.store.dispatch("edit_project", this.data);
      setTimeout(() => (this.updated = true), 2000);
    },
  },
  async created() {
    await this.project(this.$route.params.id);
  },
};
</script>

<style lang="scss">
.ql-container {
  background-color: var(--bs-white);
  min-height: 50vh !important;
}
.ql-toolbar.ql-snow {
  background: var(--bs-gray-900);
}
.ql-snow .ql-stroke {
  stroke: var(--bs-gray-200);
}
.ql-snow .ql-picker.ql-header .ql-picker-label::before {
  color: var(--bs-white);
}
.ql-snow.ql-toolbar button:hover,
.ql-snow .ql-toolbar button:hover,
.ql-snow.ql-toolbar button:focus,
.ql-snow .ql-toolbar button:focus,
.ql-snow.ql-toolbar .ql-picker-label:hover,
.ql-snow .ql-toolbar .ql-picker-label:hover,
.ql-snow.ql-toolbar .ql-picker-item:hover,
.ql-snow .ql-toolbar .ql-picker-item:hover {
  background-color: var(--bs-gray-700);
}
</style>
