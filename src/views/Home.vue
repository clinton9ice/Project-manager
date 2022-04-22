<template>
  <div class="container-fluid px-3 py-5">

    <h3 class="project-title">Projects</h3>

    <div class="project-container d-flex justify-content-between flex-wrap">
      <Collection :total="allProject.length" v-if="allProject">
        <div v-for="project in allProject" :key="project.id">
          <project-card :properties="project"></project-card>
        </div>
      </Collection>

      <Collection
        header="inProgress"
        v-if="projectInProgress"
        :total="projectInProgress.length"
      >
        <div v-for="inProgress in projectInProgress" :key="inProgress.id">
          <project-card
            :properties="inProgress"
            parent="inprogress"
          ></project-card>
        </div>
      </Collection>

      <Collection
        header="complete"
        v-if="completeProjects"
        :total="completeProjects.length"
      >
        <div v-for="project in completeProjects" :key="project.id">
          <project-card :properties="project" parent="complete"></project-card>
        </div>
      </Collection>
    </div>
    <modal :header="modal.header" :open="modal.isActive" />
  </div>
</template>

<script>
// import { reactive } from "vue";
import Collection from "@/components/Collection";
import ProjectCard from "@/components/Project-card";
import Modal from "@/components/Modal";

import { mapGetters, mapState } from "vuex";

export default {
  components: {
    Collection,
    ProjectCard,
    Modal
  },
  computed: mapGetters(["allProject", "completeProjects", "projectInProgress", "modal"]),
};
</script>

