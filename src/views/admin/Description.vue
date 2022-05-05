<template>
  <main>
    <section
      class="container d-flex align-items-center justify-content-center error-class"
      v-if="!obj.available"
    >
      <div>
        OOps... Sorry the requested project is not available or no longer exist.
      </div>
    </section>

    <section class="description px-3 p-5" v-if="obj.available && obj.loaded">
      <div
        class="header d-flex mb-sm-5 flex-wrap align-items-start justify-content-between"
      >
        <div class="caption">
          <div class="badges mb-3">
            <span class="badge alert-success" v-if="obj.project.complete">
              Completed</span
            >
            <span
              class="badge alert-warning border"
              v-else-if="obj.project.state === 'inprogress'"
            >
              In Progress</span
            >
            <span class="badge alert-danger" v-else> Draft</span>
          </div>

          <div>
            <h1>{{ obj.project.title }}</h1>
            <p class="text-primary date">
              {{ obj.project.date || "Not available" }}
            </p>
            <p class="text-muted small" v-if="obj.updated">
              Last update: {{ obj.updated }}
            </p>
          </div>
        </div>
      </div>

      <p class="details" v-html="HTML(obj.project.description)" />
    </section>
    <loader name="pulse" :overlay="true" v-if="!obj.loaded" />
  </main>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import Loader from "@/components/Loader";

// import { serverTimestamp } from "firebase/firestore";

export default {
  name: "Description",
  components: {
    Loader,
  },
  setup() {
    const obj = reactive({
      loaded: false,
      project: "",
      available: true,
      update: "",
    });
    const store = useStore();

    function HTML(text) {
      return text;
    }

    return { store, obj, HTML };
  },
  async created() {
    this.obj.available = true;
    //get the parameter id from the route
    await this.store
      .dispatch("get_single_project", this.$route.params.id)
      .then((e) => (this.obj.project = e))
      .catch((e) => {
        console.log(e);
        this.obj.available = false;
      });
    this.obj.loaded = true;
    // Check for updated period
    if (this.obj.project.timestamp) {
      const date = new Date(this.obj.project.timestamp.seconds * 1000);
      this.obj.updated = date.toLocaleString();
    }
  },
};
</script>

<style lang="scss" scoped>
.error-class {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  width: 100% !important;
  margin: 0 auto;
  color: var(--bs-gray-500);
  text-align: center;
  font-size: 2em;
  font-style: italic;
}
.badge {
  padding: 0.6rem 0.9rem;
}

.details {
  font-size: 1em;
  p {
    margin: 0 !important;
  }
}
.caption {
  h1 {
    max-width: 800px;
  }
}
.project-status {
  .text-brown {
    color: #bb4545;
  }
  .text-purple {
    color: var(--bs-purple);
  }
  font-weight: 500;
}
</style>
