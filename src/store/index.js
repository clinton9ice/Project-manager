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
      header: "save",
      isActive: false,
    },
    searchResult: [],
    projectToEdit: "",
    message: {
      error: null,
      success: null,
    },
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
    modal(state) {
      return state.modal;
    },
  },

  mutations: {
    GET_PROJECT(state, id) {
      //Convert is string to number
      id = Number(id);
      state.projectToEdit = state.projects.find((task) => task.id === id);
    },

    ADD_PROJECT(state, project) {
      if (typeof project !== "object") throw new Error("Project not an object");
      project.complete = project.state.toLowerCase() === "complete";
      project.id = Math.ceil(Math.random() * Date.now());
      state.projects.push(project);
      this.commit("SET_MESSAGE", { success: "Post Added successfully" });
      this.commit("MODAL", "")
    },

    CHANGE_STATE(state, project) {
      state.projects.find((task) => {
        // Get the specific task from project list
        if (task.id === project.properties.id) {
          // Reset the task complete state upon call
          task.complete = false;
          // Check for the project request state
          if (project.state) {
            if (project.state === "complete") task.complete = !project.complete;
            // Update the state value
            task.state = project.state;
            // Display success message
            this.commit("SET_MESSAGE", {
              success: "Project Updated "
            });
          }
        }
      });
    },

    MODAL(state, title) {
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
         this.commit("SET_MESSAGE", {
           success: "Project deleted successfully"
         });
        
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
      // Clear error
      this.commit("CLEAR_MESSAGES");

      state.projects.find((task, index) => {
        if (task.id === p_id) {
          if (isEqual(task, project)) {
            return state.message.error = "No changes detected";
          }
          state.projects.splice(index, 1);
          project.updated = dateCombined;
          return (state.projects = [...state.projects, project]);
        }
      });
    },

    SET_MESSAGE(state, { success, error }) {
      // Clear messages
      this.commit("CLEAR_MESSAGES")
      // Set new error;
      setTimeout(() => {
        state.message.success = success || null;
        state.message.error = error || null;
      }, 200)
    },

    CLEAR_MESSAGES(state) {
      return (state.message.error = null), (state.message.success = null);
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
      return commit("CHANGE_STATE", project);
    },

    init_modal({ commit }, param) {
      return commit("MODAL", param);
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
      commit("CLEAR_MESSAGES");

      return new Promise((resolve) =>
        setTimeout(() => {
          commit("EDIT_PROJECT", project);
          if (!state.message.error){
            commit("SET_MESSAGE", {
              success: "Project Updated",
            });
            
            return resolve("success");
          }
        }, 1000)
      );
    },
  },
});
