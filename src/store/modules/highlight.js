const state = {
    code: "",
}
const mutations = {
    SET_CODE: (state, data) => {
        state.code = data
    },
}
const actions = {
    set_code({
        commit
    }, data) {
        commit('SET_CODE', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
