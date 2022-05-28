import { createStore } from "vuex";
import { dateCombined } from "@/components/Date";
import { isEqual } from "@/helper/Helper";
import sortDate from "@/helper/sortDate";

// Import firestre properties
import firestore from "@/firebase/config";

// Import router
import router from "@/router";

// Import authentication Collections
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithRedirect,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";

const auth = getAuth();
import { setSession, killSession } from "@/helper/Helper";
// Import firestore collections
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

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
    user: null,
  },

  getters: {
    allProject(state) {
      return state.projects
        .filter((task) => {
          return !task.complete && task.state === "save";
        })
        .sort(sortDate);
      // .reverse();
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
    user(state) {
      return state.user;
    },

    offline(state) {
      return state.offline;
    },
  },

  mutations: {
    async GET_PROJECT(state, id) {
      const docRef = collection(
        firestore.db,
        "users",
        state.user.uid,
        "projects",
        id
      );

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
      const query = collection(
        firestore.db,
        "users",
        state.user.uid,
        "projects"
      );

      const req = await addDoc(query, project);

      project.complete = project.state.toLowerCase() === "complete";

      // Add new project to store
      if (req.id) {
        project.id = req.id;
        state.projects.unshift(project);

        this.commit("SET_MESSAGE", {
          success: "Post Added successfully",
        });
      } else {
        this.commit("SET_MESSAGE", {
          error: "Something went wrong: Project Not Saved",
        });
      }
    },

    async CHANGE_STATE(state, project) {
      const { properties } = project;

      const ref = doc(
        collection(firestore.db, "users", state.user.uid, "projects"),
        properties.id
      );

      let isComplete = project.state === "complete";

      try {
        // Set the "state" field of the projects
        await updateDoc(ref, {
          state: project.state,
          complete: isComplete,
          timestamp: serverTimestamp(),
        });

        // Update locally
        state.projects.find((task) => {
          // Get the specific task from project list
          if (task.id === properties.id) {
            task.complete = false;

            // Check for the project state
            if (project.state) {
              if (isComplete) task.complete = !project.complete;
              task.state = project.state;
              this.commit("SET_MESSAGE", {
                success: "Project Updated",
              });
            }
          }
        });
      } catch (error) {
        console.log(error);
        this.commit("SET_MESSAGE", {
          error: "something went wrong: " + error,
        });
      }
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
          deleteDoc(
            doc(
              collection(firestore.db, "users", state.user.uid, "projects"),
              id
            )
          );
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

    SET_USER(state, user) {
      return (state.user = user);
    },

    CLEAR_USER(state) {
      state.user = null;
    },

    UPDATE_PROFILE(state, data) {
      // Deconstruct the data object
      const { profileUrl, name } = data;

      if (
        name.toLowerCase() === state.user.displayName.toLowerCase() &&
        profileUrl === state.user.photoURL
      ) {
        this.commit("SET_MESSAGE", { error: "No changes found" });
        return;
      }
      // Update the name and profile image
      if (name && profileUrl) {
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: profileUrl,
        })
          .then(() => {
            this.commit("SET_MESSAGE", {
              success: "Profile updated successfully",
            });
          })
          .catch((error) => {
            // An error occurred
            console.log(error);
            this.commit("SET_MESSAGE", {
              error: "Something went wrong :" + error.code,
            });
          });
      }
    },
  },

  actions: {
    async delete_project({ commit }, id) {
      return commit("DELETE_PROJECT", id);
    },

    async insert_project({ commit }, id) {
      return commit("ADD_PROJECT", id);
    },

    async change_status({ commit }, project) {
      return commit("CHANGE_STATE", project);
    },

    init_modal({ commit }, param) {
      return commit("MODAL", param);
    },

    async get_single_project({ state, commit }, id) {
      // Emoty the container
      state.projectToEdit = [];
      const docRef = doc(
        collection(firestore.db, "users", state.user.uid, "projects"),
        id
      );
      const docSnap = await getDoc(docRef);
      return new Promise((resolve, reject) => {
        if (docSnap.exists()) {
          let result = docSnap.data();
          result.id = docSnap.id;
          resolve(result);
        } else {
          reject("Project does not exist");
          commit("SET_MESSAGE", {
            error: "The requested project does not exist",
          });
        }
      });
    },

    async search({ commit, state }, str) {
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
      // Get Project
      return state.projects.map((task, index) => {
        if (task.id === project.id) {
          //  Check for changes
          if (isEqual(task, project)) {
            commit("SET_MESSAGE", {
              error: "No changes detected",
            });
            return;
          }

          (async function () {
            try {
              const ref = await doc(
                collection(firestore.db, "users", state.user.uid, "projects"),
                project.id
              );

              await updateDoc(ref, {
                title: project.title,
                complete: project.complete,
                description: project.description,
                state: project.state,
                timestamp: serverTimestamp(),
              });

              // Remove the prev project
              state.projects.splice(index, 1);

              state.projects = [...state.projects, project];

              return commit("SET_MESSAGE", {
                success: "Project Updated",
              });
            } catch (error) {
              commit("SET_MESSAGE", { error: error.code });
            }
          })();
          return;
        }
      });
    },

    async getAllProjects({ state }) {
      state.loaded = false;

      const querySnapshot = await getDocs(
        collection(firestore.db, "users", state.user.uid, "projects")
      );

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          if (!state.projects.some((task) => task.id === doc.id)) {
            let obj = {
              id: doc.id,
              title: doc.data().title,
              description: doc.data().description,
              state: doc.data().state,
              complete: doc.data().complete,
              date: doc.data().date,
            };
            state.projects.push(obj);
          }
        });
        return (state.loaded = true);
      }
      // commit("SET_MESSAGE", {
      //   error: "No project Found  yet"
      // });
      state.loaded = true;
      // state.offline = true;
    },

    async signIn({ commit }, details) {
      try {
        const { email, password } = details;
        await signInWithEmailAndPassword(auth, email, password);
        commit("SET_MESSAGE", { success: "Signed In Successfully" });
        commit("SET_USER", auth.currentUser);
        router.push({
          name: "admin",
        });
      } catch (error) {
        switch (error.code) {
          case "auth/network-request-failed":
            commit("SET_MESSAGE", { error: "Network Connection Error" });
            break;
          case "auth/user-not-found":
            commit("SET_MESSAGE", { error: "This account does not exist" });
            break;
          case "auth/wrong-password":
            commit("SET_MESSAGE", { error: "Wrong Password" });
            break;

          default:
            commit("SET_MESSAGE", {
              error: error.code
                .replaceAll("auth/", "")
                .replaceAll("-", " ")
                .toUpperCase(),
            });
            break;
        }
        return;
      }
    },

    async signUp({ commit }, details) {
      const { email, password, name } = details;
      try {
        await createUserWithEmailAndPassword(auth, email, password);

        // Sent verificaction Email
        sendEmailVerification(auth.currentUser);

        commit("SET_MESSAGE", {
          success: "A verification code has been sent to your email address",
        });

        // Update the users profile name
        await updateProfile(auth.currentUser, {
          displayName: name,
        });

        // Authenticate user
        commit("SET_USER", auth.currentUser);

        router.push({
          name: "admin",
        });
      } catch (error) {
        switch (error.code) {
          case "auth/network-request-failed":
            commit("SET_MESSAGE", {
              error: "Network Connection Error",
            });
            break;

          case "auth/invalid-sender":
            commit("SET_MESSAGE", {
              error: "Sender Not recognised",
            });
            break;
          default:
            commit("SET_MESSAGE", {
              error: error.code
                .replaceAll("auth/", "")
                .replaceAll("-", " ")
                .toUpperCase(),
            });
            break;
        }
        return;
      }
    },

    async signOut({ commit }) {
      signOut(auth);
      commit("SET_USER", null);
      killSession("user-token");
      location.assign("/");
    },

    async fetchUser({ commit, dispatch, state }) {
      state.loaded = false;

      onAuthStateChanged(auth, async (user) => {
        if (user === null) {
          state.loaded = true;
          killSession("user-token");
          return commit("CLEAR_USER");
        }

        commit("SET_USER", await user);

        setSession("user-token", state.user.uid);
        // Fetch all project immediately
        dispatch("getAllProjects");
        state.loaded = true;
        if (router.isReady()) {
          if (
            router.currentRoute.value.name === "signin" ||
            router.currentRoute.value.name === "signup"
          ) {
            //  Kill and redirtect the session if the user has not verified their email address
            if (!user.emailVerified) {
              return router.push({
                name: "verify",
              });
            }

            router.push({ name: "admin" });
          }
        }
      });
    },

    async signInWithGooogle({ commit }) {
      const provider = new GoogleAuthProvider();

      new Promise((resolve, reject) => {
        signInWithRedirect(auth, provider)
          .then((e) => {
            commit("SET_MESSAGE", {
              success: "You have successfully logged in",
            });
            resolve(e);
          })
          .catch((error) => {
            commit("SET_MESSAGE", {
              error: error.code
                .replaceAll("auth/", "")
                .replaceAll("-", " ")
                .toUpperCase(),
            });
            console.log(error);
            reject(error);
          });
      });

      commit("CLEAR_MESSAGES");
    },

    async update_profile({ commit, dispatch }, data) {
      commit("UPDATE_PROFILE", data);
      setTimeout(dispatch("fetchUser"), 2000);
    },

    async resetPass({ commit }, email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          // Password reset email sent!
          commit("SET_MESSAGE", {
            success: "Email verification code has been sent.",
          });
        })
        .catch((error) => {
          const errorCode = error.code;

          switch (errorCode) {
            case "auth/user-not-found":
              commit("SET_MESSAGE", {
                error: "This account does not exist",
              });
              break;

            default:
              commit("SET_MESSAGE", {
                error: error.code
                  .replaceAll("auth/", "")
                  .replaceAll("-", " ")
                  .toUpperCase(),
              });
              break;
          }
        });
    },

    async delete_acc({ commit, dispatch }) {
      await deleteUser(auth.currentUser);
      dispatch("signOut");
      commit("SET_MESSAGE", {
        success: "Account deleted Successfully",
      });
    },
  },
});
