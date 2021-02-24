import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      darkMode: JSON.parse(localStorage.getItem("darkMode")),
    };
  },
  mutations: {
    toggle(state) {
      state.darkMode = !state.darkMode;
      localStorage.setItem("darkMode", JSON.stringify(state.darkMode));
    },
  },
  getters: {
    darkMode: state =>  state.darkMode,
  },
});

export default store;
