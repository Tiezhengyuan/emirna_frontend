<template>
  <b-container>
    <div>II: Select method</div>
    <select v-model="selected" @change="changeMethod">
      <option v-for="(method, i) of task.task_methods" :key="i" :value="method">
        {{ method.task_method }}
      </option>
    </select>
    <b-button variant="primary" @click="addTask">Add task</b-button>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SelectMethod",
  data() {
    return {
      selected: null,
    };
  },
  computed: {
    ...mapState(["project", "task"]),
    disableAdd() {
      const project_id = this.project.current_project.project_id
      return (this.selected && project_id) ? false : true;
    },
  },
  methods: {
    changeMethod() {
      this.$store.commit('setCurrentMethod', this.selected)
    },
    addTask() {
      this.$store.commit("addTask");
      this.$store.commit("nextTaskId");
    },
  },
};
</script>
