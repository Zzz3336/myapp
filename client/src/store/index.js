import vue from 'vue'
import vuex from 'vuex'

vue.use(vuex)

const state = {
  token: ""
}

const mutations = {
  updateToken(state, token) {
    state.token = token
    localStorage.setItem("token", token)
  }
}

const store = new vuex.Store({
  state,
  mutations
})

export default store
