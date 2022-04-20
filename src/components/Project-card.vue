<template>
  <div class="project-card" draggable="true">
    <div class="project-title dropdown header">
      <h5 class="caption" v-if="search">{{ properties.title }}</h5>
      <h3 class="caption" v-else>{{ properties.title || "project title" }}</h3>
      <div class="dropdown-section" v-if="!search">
        <button
          class="btn w-100"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-three-dots-vertical"></i>
        </button>

        <ul class="dropdown-menu dropdown-menu-dark">
          <li v-if="parent !== 'complete'">
            <a
              class="dropdown-item small"
              @click="change_status({ properties, state: 'complete' })"
              >mark as complete</a
            >
          </li>

          <li v-if="parent !== 'inprogress'">
            <a
              class="dropdown-item small"
              @click="change_status({ properties, state: 'inprogress' })"
            >
              mark as inProgress
            </a>
          </li>

          <li>
            <router-link
              :to="{
                name: 'edit',
                params: { id: properties.id, data: properties },
              }"
              class="dropdown-item"
              >edit</router-link
            >
          </li>

          <li>
            <a
              class="dropdown-item text-danger"
              @click="delete_project(properties.id)"
              >delete</a
            >
          </li>
        </ul>
      </div>
    </div>

    <div class="project-description" v-if="!search">
      {{
        properties.description
          ? properties.description.length > 100
            ? removeTags(properties.description.slice(0, trim || 200)) + "..."
            : removeTags(properties.description)
          : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae quam voluptate iure dolore sed suscipit itaque quasi quaerat iste nihil enim,natus, repellat dolorum! Quas eius quaerat nobis perferendis aperiam.".slice(
              0,
              trim || 200
            )
      }}
    </div>

    <div class="d-flex align-items-center justify-content-between">
      <div class="date" v-if="!search">
        {{ properties.date || "20, August 2021" }}
      </div>
      <div class="link btn btn-outline-primary">
        <router-link
          :to="{
            name: 'Description',
            params: { id: properties.id, data: properties },
          }"
          v-if="!search"
        >
          open
        </router-link>
        <a v-else :href="'/description/' + properties.id"> open </a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    parent: String,
    properties: Object,
    trim: Number,
    search: Boolean,
  },
  methods: {
    ...mapActions(["delete_project", "change_status"]),
    removeTags(data) {
      if (data === null || data === "") return false;
      data = data.toString();
      return data.replaceAll(/(<([^>]+)>)/gi, "");
    },
  },
};
</script>

<style lang="scss" scoped>
.project-card {
  padding: 1rem;
  background-color: var(--bs-white);
  box-shadow: -4px 15px 6px #00000014;
  border-radius: 6px;
  margin-bottom: 4rem;
  cursor: grab;

  .project-title {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 0.3rem;
  }

  .project-description {
    color: var(--bs-gray-600);
    letter-spacing: 0.5px;
    margin: 1rem 0;
  }
  .link {
    border-radius: 4px;
    a {
      text-decoration: none;
    }
    &:hover {
      a {
        color: var(--bs-white);
      }
    }
  }
  .date {
    font-style: italic;
    color: var(--bs-purple);
    font-weight: 500;
  }

  .dropdown-item {
    cursor: pointer;
  }
}
</style>
