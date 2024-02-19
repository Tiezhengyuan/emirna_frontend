<template>
  <div class="container select-method">
    <slot></slot>
    <select v-model="selected">
      <option v-for="(method, i) of task.task_methods" :key="i" :value="i">
        {{ method.task_method }}
      </option>
    </select>
    <div class="add-task">
      <button @click="addTask">Add task</button>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SelectMethod",
  data() {
    return {
      selected: "",
    };
  },
  computed: {
    ...mapState(["project", "task"]),
  },
  methods: {
    addTask() {
      const selected_method = this.task.task_methods[this.selected];
      const new_task = {
        ...selected_method,
        project: this.project.current_project,
        status: "new",
        task_id: this.task.new_task_id,
        parent_task: "",
      };
      // console.log(this.task);
      this.$store.commit("addTask", new_task);
      // console.log(this.new_task_id);
    },
  },
};
</script>

<style scoped>
.container.select-method {
  display: block;
}
.add-task {
  margin-top: 5px;
}
</style>
