import { createApp } from "vue";
import "./styles/bootstrap.min.css";
import "./styles/jquery.js";
//import "./style.css";
import App from "./App.vue";
import components from "./components/UI";
import router from "./router";
import store from "./store";

const app = createApp(App);
components.forEach((component) => {
    app.component(component.name, component);
});

app.use(store).use(router).mount("#app");
