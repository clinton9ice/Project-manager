import { createStore } from "vuex";
import { dateCombined } from "@/components/Date";
import { isEqual } from "@/helper/Helper";

export default createStore({
  state: {
    projects: [
      {
        date: "Apr, 01, 2021 ",
        id: 1,
        title: "Music website",
        description:
          "Some dummy text to write just to satisfy the eye and make the content meaninful and ellergic to something in lin e",
        state: "save",
        complete: false,
      },
      {
        id: 6,
        title: "Mobile Phone Store",
        date: "Apr, 01, 2021 ",
        description:
          "Some dummy text to write just to satisfy the eye and make the content meaninful and ellergic to something in lin e",
        state: "complete",
        complete: true,
      },
      {
        id: 2,
        title: "Crypto Manager",
        date: "Apr, 5, 2021 ",
        description:
          "Some dummy text to write just to satisfy the eye and make the content meaninful and ellergic to something in lin e",
        state: "save",
        complete: false,
      },
      {
        id: 3,
        title: "Clothing store",
        date: "Apr, 10, 2021 ",
        description:
          "Some dummy text to write just to satisfy the eye and make the content meaninful and ellergic to something in lin e",
        state: "inprogress",
        complete: false,
      },
    ],
    projectStatus: ["save", "inprogress", "complete"],
    modal: {
      header: "",
      isActive: false,
    },
    searchResult: [],
    projectToEdit: "",
    error: "",
  },

  getters: {
    allProject(state) {
      return state.projects
        .filter((task) => {
          return !task.complete && task.state !== "inprogress";
        })
        .reverse();
    },
    completeProjects(state) {
      return state.projects.filter((task) => task.complete).reverse();
    },
    projectInProgress(state) {
      return state.projects
        .filter((task) => task.state === "inprogress")
        .reverse();
    },
    openModal(state) {
      return state.modal.header;
    },
  },

  mutations: {
    GET_PROJECT(state, id) {
      //Convert variable to number
      id = Number(id);
      state.projectToEdit = state.projects.find((task) => task.id === id);
    },

    ADD_PROJECT(state, project) {
      if (typeof project !== "object") throw new Error("Project not an object");
      project.complete = project.state.toLowerCase() === "complete";
      project.id = Math.ceil(Math.random() * Date.now());
      state.projects.push(project);
    },

    EDIT_STATUS(state, project) {
      state.projects.find((task) => {
        if (task.id === project.properties.id) {
          task.state = "";
          task.complete = false;
          if (project.state) {
            if (project.state === "complete") task.complete = !project.complete;
            task.state = project.state;
          }
        }
      });
    },

    OPEN_MODAL(state, title) {
      state.modal = {
        header: title || "",
        isActive: !state.modal.isActive,
      };
    },

    DELETE_PROJECT(state, id) {
      if (confirm("Data will be lost permanently")) {
        state.projects = state.projects.filter(
          (currentVal) => currentVal.id !== id
        );
      }
    },

    SEARCH(state, str) {
      state.projects.map((e) => {
        //Search based on title
        let title = e.title.toLowerCase();
        if (title.startsWith(str) || title.includes(str) || title === str) {
          state.searchResult.push(e);
        }
      });
    },

    CLEAR(state) {
      return (state.searchResult = []);
    },

    EDIT_PROJECT(state, project) {
      const p_id = project.id;
      state.projects.find((task, index) => {
        if (task.id === p_id) {
          if (isEqual(task, project)) {
            return (state.error = "No changes detected");
          }
          state.projects.splice(index, 1);
          project.updated = dateCombined;
          return (state.projects = [...state.projects, project]);
        }
      });
    },
  },

  actions: {
    delete_project({ commit }, id) {
      return commit("DELETE_PROJECT", id);
    },

    insert_project({ commit }, id) {
      return commit("ADD_PROJECT", id);
    },

    change_status({ commit }, project) {
      return commit("EDIT_STATUS", project);
    },

    modal_status({ commit }, param) {
      return commit("OPEN_MODAL", param);
    },

    get_single_project({ commit, state }, param) {
      return new Promise((resolve) => {
        setTimeout(() => {
          commit("GET_PROJECT", param);
          resolve(state.projectToEdit);
        }, 1000);
      });
    },

    search({ commit, state }, str) {
      //Clear the search result for new results
      state.searchResult = [];
      return new Promise((resolve, reject) =>
        setTimeout(() => {
          //Search for the string
          commit("SEARCH", str);
          //Return the result of the string
          resolve(state.searchResult);
          reject("Search Failed");
        }, 1000)
      );
    },

    edit_project({ state, commit }, project) {
      state.error = "";
      return new Promise((resolve, error) =>
        setTimeout(() => {
          commit("EDIT_PROJECT", project);
          if (state.error) return error(state.error);
          return resolve("Project Updated successfully");
        }, 1000)
      );
    },
  },
});
