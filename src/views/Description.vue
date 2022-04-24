<template>
  <section class="about px-3 p-5" v-if="obj.project">
    <div
      class="header d-flex mb-sm-5 flex-wrap align-items-start justify-content-between"
    >
      <div class="caption d-flex align-items-center">
        <div class="caption-check me-4">
          <i class="bi bi-check"></i>
        </div>
        <div>
          <h1>{{ obj.project.title }}</h1>
          <p class="text-primary date">
            {{ obj.project.date || "Not available" }}
          </p>
        </div>
      </div>

      <div class="project-status border py-2 ms-5 px-3 rounded-3">
        <span class="text-success" v-if="obj.project.complete"> Completed</span>
        <span
          class="text-purple"
          v-else-if="obj.project.state === 'inprogress'"
        >
          In Progress</span
        >
        <span class="text-brown" v-else> In task</span>
      </div>
    </div>

    <p class="details px-5" v-html="HTML(obj.project.description)" />
  </section>
  <loader v-else name="flow" :overlay="true" />
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import Loader from "@/components/Loader";

export default {
  name: "Description",
  components: {
    Loader,
  },
  setup() {
    const obj = reactive({
      loaded: false,
      project: "",
    });
    const store = useStore();

    function HTML(text) {
      return text;
    }

    return { store, obj, HTML };
  },
  created() {
    //get the parameter id from the route
    this.store
      .dispatch("get_single_project", this.$route.params.id)
      .then((e) => (this.obj.project = e));
    this.loaded = true;
  },
};
</script>

<style lang="scss">
.caption-check {
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background: var(--bs-primary);
  font-size: 1.3em;
  line-height: 25px;
  text-align: center;
  color: var(--bs-body-bg);
}
.details {
  font-size: 1.1em;
  letter-spacing: 0.5px;
  //line-height: 30px;
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
