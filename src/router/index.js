import { createRouter, createWebHistory } from "vue-router";
import Main from "../pages/Main.vue";
import Login from "../pages/Login.vue";
import Storage from "../pages/Storage.vue"
import Registration from "../pages/Registration.vue";
import RegSuccess from "../pages/RegSuccess.vue";
import SecondPage from "../pages/SecondPage.vue";
import Posts from "../pages/Posts.vue";
import PostCreate from "../pages/PostCreate.vue";
import Post from "../pages/Post.vue";

const routes = [
    {
        path: "/",
        component: Main,
    },
    {
        path: "/login",
        component: Login,
    },
    {
        path: "/registration",
        component: Registration,
    },
    {
        path: "/registration/success",
        component: RegSuccess,
    },
    {
        path: "/secondpage",
        component: SecondPage,
    },
    {
        path: "/posts",
        component: Posts,
    },
    {
        path: "/posts/create",
        component: PostCreate,
    },
    {
        path: "/storage",
        component: Storage
    },
    {
        path: "/posts/view/:id",
        component: Post,
    },
];

const router = createRouter({
    //history: createWebHistory(process.env.BASE_URL),
    history: createWebHistory(),
    routes,
});

export default router;
