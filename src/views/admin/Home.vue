<template>
  <div class="container-fluid px-3 py-5" v-if="user && loaded">
    <div class="project-title">
      Welcome.
      <h1 class="col-5" v-if="user.displayName">
        {{ user.displayName.split(" ")[0] }}
      </h1>
    </div>

    <p class="text-danger small col-4" v-if="!user.emailVerified">
      Verify Your Email To Start creating projects
    </p>

    <div
      class="project-container d-flex justify-content-between mt-5 flex-wrap"
    >
      <Collection :total="allProject.length">
        <div v-for="project in allProject" :key="project.id">
          <project-card :properties="project"></project-card>
        </div>
      </Collection>

      <Collection header="inProgress" :total="projectInProgress.length">
        <div v-for="inProgress in projectInProgress" :key="inProgress.id">
          <project-card
            :properties="inProgress"
            parent="inprogress"
          ></project-card>
        </div>
      </Collection>

      <Collection header="complete" :total="completeProjects.length">
        <div v-for="project in completeProjects" :key="project.id">
          <project-card :properties="project" parent="complete"></project-card>
        </div>
      </Collection>
    </div>
    <modal :header="modal.header" :open="modal.isActive" />
  </div>
</template>
<!-- https://lh3.googleusercontent.com/a-/AOh14GjEsuWIeOrCcZ1btnzbMkMU11TZhL0p64WIN2MPcA=s96-c -->
<script>
import Collection from "@/components/Collection";
import ProjectCard from "@/components/Project-card";
import Modal from "@/components/Modal";

import { mapGetters } from "vuex";

export default {
  components: {
    Collection,
    ProjectCard,
    Modal,
  },
  computed: mapGetters([
    "allProject",
    "completeProjects",
    "projectInProgress",
    "modal",
    "user",
  ]),
  data() {
    return {
      all: [],
      loaded: false,
    };
  },
  async created() {
    this.loaded = true;
  },
};
</script>

<style lang="scss">
.project-title {
  font-size: 1.2em;
}
</style>
