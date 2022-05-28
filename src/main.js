import { createApp } from "vue";
import App from "@/layouts";
import store from "@/store";
import router from "@/router";
// Import Scss & Css classes
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/styles/custom.scss";
import "@/assets/styles/form.scss";
import "@/assets/styles/aos.css";

// Import Javascript Files
import "@/assets/js/aos.js";
import "@/assets/js/smoothscroll.js";
import "@/assets/js/custom.js";
import AOS from "aos/dist/aos";

// AOS ANIMATION
AOS.init({
  //   duration: 500,
  anchorPlacement: "top",
});
if (!navigator.cookieEnabled) {
  alert("Please enable your browser cookie for better user experience")
}

createApp(App).use(router).use(store).mount("#app");
