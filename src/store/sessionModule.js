export const sessionModule = {
    state: () => ({
        isJoinedSession: false,
        sessionID: ''
    }),
    getters: {

    },
    mutations: {
        session_params_set(state, session_params) {
            //console.log(session_params)
            if(session_params) {
                state.isJoinedSession = session_params.isJoinedSession
                state.sessionID = session_params.sessionID
    
                localStorage.setItem('session_params', JSON.stringify(session_params))
            }
        }
    },
    actions: {

    },
    namespaced: true,
}