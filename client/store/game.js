export const state = {
  gamesVisible: [],
  gamesMyDraft: [],
  gamesNoDraft: [],
  game: null
}

export const mutations = {
  setGamesVisible(state, games) {
    state.gamesVisible = [...games]
  },
  setGamesMyDraft(state, games) {
    state.gamesMyDraft = [...games]
  },
  setGamesNoDraft(state, games) {
    state.gamesNoDraft = [...games]
  },
  setGame(state, game) {
    state.game = game
  },
}

export const actions = {
  async fetchVisible({ commit }) {
    const game = await  this.$axios.$get('/api/game', { params: { visibility: 1 } })
    commit('setGamesVisible', game.payload)
  },
  async fetchMyDraft({ commit }, myId) {
    const game = await  this.$axios.$get('/api/game', { params: { draft: 1, creator: myId } })
    commit('setGamesMyDraft', game.payload)
  },
  async fetchGameNoDraft({ commit }) {
    const game = await  this.$axios.$get('/api/game', { params: { draft: 0 } })
    commit('setGamesNoDraft', game.payload)
  },
  async fetchById({ commit }, id) {
    const game = await this.$axios.get(`api/game/${id}`)
    commit('setGame', game.data.payload)
  },
  async updateGame({ dispatch }, { game, visibility }) {
    await this.$axios.put(`api/game/${game.id}`, { visibility: visibility })
    dispatch('fetchGameNoDraft')
  },
  async storeGame(_, payload) {
    await this.$axios.post('api/game', payload)
  }
}