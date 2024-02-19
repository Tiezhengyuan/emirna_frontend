import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import tool_state from "./tool/tool_state";
import tool_mutations from "./tool/tool_mutations";

// other
import test from "./test";
import state_icons from "./state_icons";

// moduels
import project from "./project";
import task from "./task";
import user from "./user";
import reference from "./reference";
import sample from "./sample";
import pipeline from "./pipeline";


// expose objects 
export default new Vuex.Store({
  state: {
    ...state_icons,
    ...tool_state,
  },
  getters: {},
  mutations: {
    ...tool_mutations,
  },
  actions: {
    ...test,
  },
  modules: {
    project,
    task,
    user,
    reference,
    sample,
    pipeline
  },
});
