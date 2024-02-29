<template>
  <b-container>
    <slot></slot>
    <label>{{ select_label }}</label>
    <select v-model="selected" @change="selectProject">
      <option v-for="(project, i) of project.projects" :key="i" :value="i">
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
  mounted() {
    this.$store.commit("clearCurrentProject")
  },
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    ...mapState(["project"]),
  },
  methods: {
    selectProject() {
      // console.log(this.selected);
      this.$store.commit("selectProject", this.selected);
      this.$store.dispatch("getProjectTasks");
      // console.log(this.project.current_project)
    },
  },
};
</script>
