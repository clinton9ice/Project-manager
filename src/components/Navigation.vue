<template>
  <header class="header">
    <!-- <nav class="navbar bg-white bg-light">
      <div class="container-fluid">
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
    </div> -->
    <nav class="navbar justify-content-between align-items-center">
      <router-link to="/" class="navbar-brand">
        <img src="@/assets/images/Taskey-logo.svg" />
      </router-link>


<div class="d-flex align-items-center">
    <div class="thumbnail-box rounded-circle mx-3" v-if="isMobile() && $store.state.user">
          <img :src="$store.getters.user.photoURL || data.profilePics" alt="User picture" class="img-thumbnail rounded-circle"
            @click="Dropdown">
      </div>
        <button type="button" class="btn nav-toggler" id="navToggler">
          <span></span>
        </button>

        <div class="dropdown-menu" id="admin-menu">
            <button class="dropdown-item" type="button">
                <router-link
              :to="{ name: 'admin' }"
              class="nav-link p-0"
              >Dashboard</router-link
            >
            </button>
            <button class="dropdown-item" type="button">
              <router-link :to="{name: 'settings'}">Settings</router-link>
            </button>
            <button class="text-danger btn" @click="$store.dispatch('signOut')">
              Sign out
            </button>
                 
        </div>
    </div>
      <div class="navbar-container" id="toggle-menu">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">Home</router-link>
          </li>

          <li class="nav-item">
            <a class="nav-link default" :href="'/' + '#about'">About</a>
          </li>

          <li class="nav-item">
            <a class="nav-link default" :href="'/' + '#how-it-works'"
              >How it Works</a
            >
          </li>

          <li class="nav-item" v-if="!$store.state.user">
            <router-link :to="{ name: 'signup' }" class="nav-link"
              >Sign up</router-link
            >
          </li>

          <li class="nav-item" v-if="!$store.state.user">
            <router-link :to="{ name: 'signin' }" class="btn nav-btn">
              Sign in
            </router-link>
          </li>
          <li class="nav-item" v-if="$store.state.user">
            <router-link
              :to="{ name: 'admin' }"
              class="nav-link btn nav-btn px-2"
              >Dashboard</router-link
            >
          </li>
        </ul>

        <form v-if="isLogged" class="d-flex form" @submit.prevent="getSearch">
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
      <div class="thumbnail-box" v-if="!isMobile() && $store.state.user">
          <img :src="$store.state.user.photoURL || data.profilePics" alt="User picture" class="img-thumbnail rounded-circle"
            @click="Dropdown">
      </div>
      </div>
      
      
      
    </nav>
  </header>
</template>

<script>
import { reactive } from "vue";
import { mapActions, mapMutations, useStore } from "vuex";
// import ProjectCard from "@/components/Project-card";

export default {
  name: "Navigation",
  setup() {
    const data = reactive({
      search: null,
      searchResult: "",
      openSearch: false,
      dropdown: false,
      profilePics: "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    });
    function isMobile(params) {
      return window.innerWidth <= 990
    }
    const store = useStore();
   
    return { data, isLogged: false, isMobile, store };
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

    Dropdown(){
      var dropdownElementList = [].slice.call(document.querySelectorAll('.dropdown-toggle'))
      var dropdownList = dropdownElementList.map(function (dropdownToggleEl) {
      return new bootstrap.Dropdown(dropdownToggleEl)
      })
      $("#admin-menu").toggleClass("show")
    }
  },
};
</script>

<style lang="scss" scoped>
.header {
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

.img-thumbnail{
      background: var(--dark-color);
      border-color:  var(--dark-color);
      /* padding: 0; */
    width: 60px;
    object-fit: cover;
    object-position: inherit;
    cursor: pointer;
}
.dropdown-menu{
  top: 76px;
    right: 0;
}

@media screen and (max-width: 992px){
  .img-thumbnail{
    width: 45px;
  }
}
</style>
