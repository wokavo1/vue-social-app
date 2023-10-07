import { createStore } from "vuex";
import { authModule } from "./authModule";
//import { sessionModule } from './sessionModule'

export default createStore({
    state: {},
    getters: {},
    mutations: {},
    actions: {},
    modules: {
        auth: authModule,
        //session: sessionModule,
    },
});
