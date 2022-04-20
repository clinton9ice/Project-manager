<template>
  <header class="header">
    <nav class="navbar bg-white bg-light">
      <div class="container-fluid">
        <router-link to="/" class="navbar-brand"> Taskey</router-link>
        <form class="d-flex form" @submit.prevent="getSearch">
          <input
            class="form-control me-2"
            type="search"
            placeholder="Search"
            aria-label="Search"
            v-model.trim="data.search"
            @input="clearSearchResult"
          />

          <button class="btn" type="submit">
            <i class="bi bi-search text-secondary"></i>
          </button>
        </form>
      </div>
    </nav>
    <div class="search-result-container" v-if="data.openSearch">
      <div class="d-flex justify-content-between align-items-end">
        <h3 class="small text-muted">
          Search result:
          <span v-if="data.searchResult.length < 1 && data.searchResult">
            <b> "{{ data.search }}" </b> not found
          </span>
        </h3>
        <button
          type="button"
          @click="clearSearchResult"
          class="btn text-danger"
        >
          <i class="bi bi-x"></i>
        </button>
      </div>
      <div class="container-fluid mt-4" v-if="data.searchResult.length > 0">
        <div v-for="project in data.searchResult" :key="project.id">
          <project-card :search="true" :properties="project"></project-card>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { reactive } from "vue";
import { mapActions, mapMutations } from "vuex";
import ProjectCard from "@/components/Project-card";

export default {
  name: "Navigation",
  components: {
    ProjectCard,
  },
  setup() {
    const data = reactive({
      search: null,
      searchResult: "",
      openSearch: false,
    });
    return { data };
  },
  methods: {
    ...mapActions(["search"]),
    ...mapMutations(["CLEAR"]),
    getSearch() {
      let searchVal = this.data.search;
      if (searchVal !== "" && searchVal !== null) {
        //Close the result container
        this.data.openSearch = false;
        this.search(searchVal.toLowerCase()).then((e) => {
          this.data.searchResult = e;
          if (e) this.data.openSearch = true;
          if (e.length > 0) this.data.search = null;
        });
      }
    },

    clearSearchResult() {
      this.data.searchResult = "";
      this.data.openSearch = false;
      this.CLEAR();
    },
  },
  // computed:
};
</script>

<style lang="scss" scoped>
.header {
  margin-bottom: 1rem;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 200;
  .search-result-container {
    position: relative;
    background: #fff;
    padding: 1rem;
    width: 100%;
    box-shadow: 0 8px 10px rgba(0, 0, 0, 0.05);
    border-top: 1px solid var(--bs-gray-200);
    & > .container-fluid {
      max-height: 300px;
      overflow-y: auto;
    }
    h3 {
      font-size: 1.2em !important;
    }
  }

  .not-found {
    font-size: 1.2em;
    font-style: italic;
    color: var(--bs-gray-600) !important;
    font-weight: 500;
  }
}
.project-card {
  box-shadow: none;
  border-bottom: 1px solid var(--bs-gray-200);
  border-radius: 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.bi-x {
  font-size: 1.2em !important;
}
.navbar {
  padding: 1rem !important;

  .navbar-brand {
    font-size: 2em !important;
  }
}

.form {
  width: 100%;
  max-width: 700px;
  position: relative;

  .form-control {
    padding-right: 3rem;
    border-color: #f5f5f5;
    transition: 300ms ease;
  }
  .form-control:focus,
  .form-control:focus ~ .btn {
    border-color: var(--bs-primary);
  }

  .btn {
    position: absolute;
    z-index: 1;
    right: 0;
    width: 50px;
    border: none;
    border-left: 1px solid #f5f5f5;
    border-radius: 0;
    transition: 300ms ease;

    .bi {
      color: #c4c4c4 !important;
    }
  }
}
</style>
