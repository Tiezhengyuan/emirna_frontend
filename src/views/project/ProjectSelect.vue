<template>
  <b-container>
    <slot></slot>
    <label>{{ select_label }}</label>
    <select v-model="selected" @change="selectProject">
      <option v-for="(project, i) of project.projects" :key="i" :value="project">
        {{ project.project_id }}: {{ project.project_name }}
      </option>
    </select>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProjectSelect",
  props: ["select_label", "receive"],
  data() {
    return {
      selected: {},
    };
  },
  computed: {
    ...mapState(["project"]),
  },
  methods: {
    selectProject() {
      // console.log(this.selected);
      this.$store.commit("selectProject", this.selected);
    },
  },
  updated() {
    console.log(this.selected);
    this.$store.dispatch("getProjectTasks", this.selected.project_id);
  },
};
</script>
