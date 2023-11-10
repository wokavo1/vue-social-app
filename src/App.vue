<template>
    <Navbar></Navbar>
    <div class="app">
        <router-view></router-view>
    </div>
    <MyDialog v-model:show="dialogVisible" :content_width="60"> </MyDialog>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
    data() {
        return {
            dialogVisible: false,
        };
    },
    methods: {
        ...mapMutations({
            Auth: "auth/Auth",
            session_params_set: "session/session_params_set",
        }),
        onBasketClick() {
            this.dialogVisible = true;
        },
        hideDialog() {
            this.dialogVisible = false;
        },
    },
    mounted() {
        const auth_params = localStorage.getItem("auth_params");
        const tmp = JSON.parse(auth_params);
        //console.log(tmp);
        this.Auth(tmp);
        //const session_params = localStorage.getItem("session_params");
        //const tmp2 = JSON.parse(session_params)
        //console.log(tmp2)
        //this.session_params_set(tmp2);
    },
    components: { Navbar },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.app {
    padding: 0px;
    min-height: 100%;
    background-color: rgb(218, 241, 250);
}
body {
    background-color: rgb(218, 241, 250);
}
</style>
