const state = {
    code: [],
    viewCode: false
}
const mutations = {
    SET_CODE: (state, data) => {
        state.code = data
    },
    SET_VIEW_code: (state, data) => {
        state.viewCode = data
    },
}
const actions = {
    set_code({
        commit
    }, data) {
        commit('SET_CODE', data)
    },
    set_view_code({
        commit
    }, data) {
        commit('SET_VIEW_code', data)
    },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
