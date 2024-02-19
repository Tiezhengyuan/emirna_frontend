import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// state
// import data_state from "./data/data_state";
import tool_state from "./tool/tool_state";

// getters
// import pipeline_getters from "./pipeline/pipeline_getters";
// import data_getters from "./data/data_getters";

// mutations
// import pipeline_mutations from "./pipeline/pipeline_mutations";
// import data_mutations from "./data/data_mutations";
import tool_mutations from "./tool/tool_mutations";

// actions
// import pipeline_actions from "./pipeline/pipeline_actions";
// import sample_actions from "./data/sample_actions";
// import reference_actions from "./data/reference_actions";

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
    // ...data_state,
    ...tool_state,
  },
  getters: {
    // ...pipeline_getters,
    // ...data_getters,
  },
  mutations: {
    // ...pipeline_mutations,
    // ...data_mutations,
    ...tool_mutations,
  },
  actions: {
    // ...pipeline_actions,
    // ...reference_actions,
    // ...sample_actions,
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
