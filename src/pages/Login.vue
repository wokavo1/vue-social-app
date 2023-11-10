<template>
    <div class="container d-flex flex-column">
        <div class="row">
            <div class="col-3 d-flex justify-content-end">
                <h2 style="margin-top: 20px">Логин</h2>
            </div>
            <div class="col-6 d-flex align-items-end">
                <MyInput v-model:value="username" class="w-100" />
            </div>
        </div>
        <div class="row">
            <div class="col-3 d-flex justify-content-end">
                <h2 style="margin-top: 20px">Пароль</h2>
            </div>
            <div class="col-6 d-flex align-items-end">
                <MyInput type="password" class="w-100" v-model:value="password" />
            </div>
        </div>
        <div class="row">
            <div class="col d-flex justify-content-center">
                <WhiteAnimatedButton class="button" @click="Login"> Войти </WhiteAnimatedButton>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex justify-content-center">
                <a style="align-self: center; margin-top: 15px" href="/registration" @click="$router.push('/registration')">
                    Нет аккаунта? Создать аккаунт
                </a>
            </div>
        </div>
        <div class="row">
            <div class="col d-flex justify-content-center">
                <div v-if="isBadLogin" class="error">
                    <text>{{ error }}</text>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import app_config from "../app_config.js";

export default {
    data() {
        return {
            username: "",
            password: "",
            isBadLogin: false,
            error: "",
        };
    },
    methods: {
        ...mapMutations({
            Auth: "auth/Auth",
        }),
        async Login() {
            try {
                console.log(this.username, this.password);

                const res = await fetch(app_config.backend_url + "/auth/login", {
                    method: "POST",
                    cors: app_config.cors_mode,
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: this.username,
                        password: this.password,
                    }),
                });

                const response = await res.json();
                console.log(response);

                if (!response.httpCode || response.httpCode != 200) {
                    this.isBadLogin = true;
                    this.error = response.message;
                    return;
                }

                this.Auth({
                    isAuth: true,
                    token: response.body.token,
                    username: this.username,
                });

                this.isBadLogin = false;

                this.$router.push("/");
            } catch (e) {
                console.error(e);
            }
        },
    },
    computed: {
        ...mapState({
            isAuth: (state) => state.auth.isAuth,
        }),
    },
};
</script>

<style scoped>
.button {
    align-self: center;
    margin-top: 15px;
}

.error {
    margin-top: 25px;
    align-self: center;
    color: lightcoral;
}
</style>
