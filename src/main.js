import { createApp } from "vue";
import App from "@/layouts";
import store from "@/store";
import router from "@/router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/styles/custom.css";

createApp(App).use(router).use(store).mount("#app");
