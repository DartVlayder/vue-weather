import { createStore } from 'vuex'

export default createStore({
  state () {
    return {
      items: JSON.parse(localStorage.getItem('items')) ?? []
    }
  },
  getters: {
    ITEMS: state => {
      return state.items
    }
  },
  mutations: {

  },
  actions: {
  }
})
