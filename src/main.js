import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Elementplus from "elementplus";
import "element-plus/dist/index.css"

const app = createApp(App);
//use store
app.use(store);
//use router
app.use(router);
//user ElementPlus
app.use(Elementplus)
//mount element #app
app.mount("#app");
