export const authModule = {
    state: () => ({
        isAuth: false,
        token: "",
        username: "",
    }),
    getters: {
        isAdmin(state) {
            if (state.roles.includes("ADMIN")) return true;
            return false;
        },
    },
    mutations: {
        Auth(state, auth_params) {
            //console.log(auth_params)
            if (auth_params) {
                state.isAuth = auth_params.isAuth;
                state.token = auth_params.token;
                state.username = auth_params.username;

                localStorage.setItem("auth_params", JSON.stringify(auth_params));
            }
        },
    },
    actions: {},
    namespaced: true,
};
