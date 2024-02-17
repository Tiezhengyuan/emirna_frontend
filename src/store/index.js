import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import pipeline_state from "./pipeline/pipeline_state";
import data_state from "./data/data_state";
import state_bowite from "./tool/state_tool";
import state_icons from "./state_icons";

import pipeline_getters from "./pipeline/pipeline_getters";
import data_getters from "./data/data_getters";

import pipeline_mutations from "./pipeline/pipeline_mutations";
import data_mutations from "./data/data_mutations";
import mutations_bowtie from "./tool/mutations_tool";

import pipeline_actions from "./pipeline/pipeline_actions";
import actions_sample from "./data/actions_sample";
import actions_reference from "./data/actions_reference";
import test from "./test";

export default new Vuex.Store({
  state: {
    ...state_icons,
    ...pipeline_state,
    ...data_state,
    ...state_bowite,
  },
  getters: {
    ...pipeline_getters,
    ...data_getters,
  },
  mutations: {
    ...pipeline_mutations,
    ...data_mutations,
    ...mutations_bowtie,
  },
  actions: {
    ...pipeline_actions,
    ...actions_reference,
    ...actions_sample,
    ...test,
  },
  modules: {},
});
