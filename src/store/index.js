import { createStore } from "vuex";
import { dateCombined } from "@/components/Date";
import { isEqual } from "@/helper/Helper";
import firestore from "../firebase/config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
// import { uid } from "uid";

export default createStore({
  state: {
    projects: [],
    projectStatus: ["save", "inprogress", "complete"],
    modal: {
      header: "save",
      isActive: false,
    },
    searchResult: [],
    message: {
      error: null,
      success: null,
    },
    loaded: false,
    offline: false,
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
    async GET_PROJECT(state, id) {
      const docRef = doc(firestore.db, "projects", id);

      // Emoty the container
      state.projectToEdit = [];

      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        let result = docSnap.data();
        return state.projectToEdit.push(result);
      }

      this.commit("SET_MESSAGE", {
        error: "No such project in the collection!",
      });
    },

    async ADD_PROJECT(state, project) {
      if (typeof project !== "object") throw new Error("Project not an object");
      let coll = collection(firestore.db, "projects");

      project.complete = project.state.toLowerCase() === "complete";
      // Set loader
      state.loaded = false;
      // Add new project to store
      const res = await addDoc(coll, project);
      if (res.id) {
        project.id = res.id;
        state.projects.push(project);

        this.commit("SET_MESSAGE", {
          success: "Post Added successfully",
        });
        this.commit("MODAL");
        state.loaded = true;
      }
    },

    CHANGE_STATE(state, project) {
      state.projects.find((task) => {
        // Get the specific task from project list
        if (task.id === project.properties.id) {
          // Set the task to default false
          task.complete = false;

          // Check for the project state
          if (project.state) {
            try {
              if (project.state === "complete")
                task.complete = !project.complete;
              task.state = project.state;
              // Update the state value
              const result = setDoc(
                doc(firestore.db, "projects", task.id),
                task
              );

              if (result) {
                // Display success message
                this.commit("SET_MESSAGE", {
                  success: "Project Updated ",
                });
                return;
              }
            } catch (error) {
              this.commit("SET_MESSAGE", {
                error: "something went wrong: project state change failed",
              });
            }
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
        try {
          deleteDoc(doc(firestore.db, "projects", id));
          // Remove from store
          state.projects = state.projects.filter(
            (currentVal) => currentVal.id !== id
          );
          this.commit("SET_MESSAGE", {
            success: "Project deleted successfully",
          });
        } catch (error) {
          this.commit("SET_MESSAGE", {
            error: "something happened: project not deleted",
          });
        }
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

    SET_MESSAGE(state, { success, error }) {
      // Clear messages
      this.commit("CLEAR_MESSAGES");
      // Set new error;
      setTimeout(() => {
        state.message.success = success || null;
        state.message.error = error || null;
      }, 200);
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

    async get_single_project({ state, commit }, id) {
      // Emoty the container
      state.projectToEdit = [];
      const docRef = doc(firestore.db, "projects", id);
      const docSnap = await getDoc(docRef);

      return new Promise((resolve) => {
        if (docSnap.exists()) {
          let result = docSnap.data();
          result.id = docSnap.id;
          resolve(result);
        }
        commit("SET_MESSAGE", {
          error: "The requested project does not exist",
        });
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

    async edit_project({ state, commit }, project) {
      project.updated = dateCombined;
      state.loaded = false;

      await setDoc(doc(firestore.db, "projects", project.id), project);

      state.projects.find((task, index) => {
        if (task.id === project.id) {
          if (isEqual(task, project)) {
            state.loaded = true;
            return commit("SET_MESSAGE", {
              error: "No changes detected",
            });
          }
          state.projects.splice(index, 1);
          state.projects = [...state.projects, project];
          state.loaded = true;
          return commit("SET_MESSAGE", {
            success: "Project Updated",
          });
        }
      });
    },

    async getAllProjects({ state, commit }) {
      state.loaded = false;
      state.offline = false;
      try {
        const querySnapshot = getDocs(collection(firestore.db, "projects"));

        if (!(await querySnapshot).empty) {
          querySnapshot.forEach((doc) => {
            if (!state.projects.some((task) => task.id === doc.id)) {
              let obj = {
                id: doc.id,
                title: doc.data().title,
                description: doc.data().description,
                state: doc.data().state,
                complete: doc.data().complete,
              };
              state.projects.push(obj);
            }
          });
          return (state.loaded = true);
        }
        commit("SET_MESSAGE", {
          error: "No Project Found",
        });
      } catch (error) {
        console.log(error);
        commit("SET_MESSAGE", { error: "Something Went wrong." });
        state.offline = true;
      }
      return (state.loaded = true);
    },
  },
});
