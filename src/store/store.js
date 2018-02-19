import Vue from 'vue'
import Vuex from 'vuex'
import arrayShuffle from 'array-shuffle'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    repeatInterval: 15,
    readingSpeed: 100,
    readingIndex: -1,
    timeoutHandle: null,
    readingOrder: [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
      20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
      30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
      40, 41, 42, 43, 44, 45, 46, 47, 48, 49,
      50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
      60, 61, 62, 63, 64, 65, 66, 67, 68, 69,
      70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
      80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
      90, 91, 92, 93, 94, 95, 96, 97, 98, 99],
    members: [],
    players: [],
    scores: {},
    results: []
  },
  mutations: {
    incrementScore (state, index) {
      state.scores[index]++
      state.results.push(index)
      localStorage.setItem('store', JSON.stringify(state))
    },
    addMember (state, name) {
      state.members.push(name)
      localStorage.setItem('store', JSON.stringify(state))
    },
    removeMember (state, index) {
      state.members.splice(index, 1)
    },
    setParameter (state, parameter) {
      state.repeatInterval = parameter.repeatInterval
      state.readingSpeed = parameter.readingSpeed
      localStorage.setItem('store', JSON.stringify(state))
    },
    setPlayers (state, players) {
      state.players = players
    },
    setTimeoutHandle (state, timeoutHandle) {
      state.timeoutHandle = timeoutHandle
    },
    initializeStore (state) {
      if (localStorage.getItem('store')) {
        this.replaceState(Object.assign(state, JSON.parse(localStorage.getItem('store'))))
        state.timeoutHandle = null
      }
    },
    incrementIndex (state) {
      state.readingIndex++
      localStorage.setItem('store', JSON.stringify(state))
    },
    initializeGame (state) {
      state.readingOrder = arrayShuffle(state.readingOrder)
      state.readingIndex = -1
      var scores = {}
      state.players.forEach(function (v) { scores[v] = 0 })
      state.scores = scores
      state.results = []
      localStorage.setItem('store', JSON.stringify(state))
    }
  }
})
