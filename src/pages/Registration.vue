<template>
    <div class="container d-flex flex-column">
        <div class="row h-100">
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
                <WhiteAnimatedButton class="button" @click="Registration"> Зарегистрироваться </WhiteAnimatedButton>
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
        async Registration() {
            try {
                const res = await fetch(app_config.backend_url + "/auth/registration", {
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

                this.isBadLogin = false;

                this.$router.push("/registration/success");
            } catch (e) {
                console.log(e);
            }
        },
    },
    computed: {},
};
</script>

<style scoped>
.auth_form {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 30%;
    margin-right: 30%;
}

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
