<template>
    <header class="position-fixed top-0 w-100 z-2">
        <div class="navbar">
            <nav class="container">
                <div class="row align-items-center header-height w-100">
                    <div class="col">
                        <div class="row">
                            <div class="col-auto px-2">
                                <WhiteAnimatedButton @click="$router.push('/')">Main Page</WhiteAnimatedButton>
                            </div>
                            <div class="col-auto px-2">
                                <WhiteAnimatedButton @click="$router.push('/secondpage')">Second Page</WhiteAnimatedButton>
                            </div>
                            <div class="col-auto px-2">
                                <WhiteAnimatedButton @click="$router.push('/posts')">Posts Page</WhiteAnimatedButton>
                            </div>
                            <div class="col-auto px-2">
                                <WhiteAnimatedButton @click="$router.push('/posts/create')">Post Create</WhiteAnimatedButton>
                            </div>
                            <div class="col-auto px-2">
                                <WhiteAnimatedButton @click="$router.push('/storage')">Хранилище файлов</WhiteAnimatedButton>
                            </div>
                        </div>
                    </div>
                    <div class="col-auto">
                        <div v-if="!isAuth" class="row">
                            <div class="col-auto px-2">
                                <WhiteAnimatedButton @click="$router.push('/login')">Войти</WhiteAnimatedButton>
                            </div>
                        </div>
                        <div v-else class="row">
                            <div class="col-auto px-2 nav-text">{{ username ? username : "username" }}</div>
                            <div class="col-auto px-2">
                                <WhiteAnimatedButton @click="Logout">Выйти</WhiteAnimatedButton>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    </header>
    <div class="header-height"></div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";

export default {
    name: "Navbar",
    computed: {
        ...mapState({
            isAuth: (state) => state.auth.isAuth,
            username: (state) => state.auth.username,
        }),
    },
    methods: {
        ...mapMutations({
            Auth: "auth/Auth",
        }),
        Logout() {
            this.Auth({
                isAuth: false,
                token: "",
                roles: [],
                username: "",
            });
            this.$router.push("/");
        },
    },
};
</script>

<style scoped>
.header-height {
    height: 75px;
}
.navbar {
    background-color: black;
    box-shadow: 2px 2px 4px lightgray;
    display: flex;
    align-items: center;
    padding: 0 15px;
}
.nav-text {
    color: white;
    align-self: center;
}
</style>
