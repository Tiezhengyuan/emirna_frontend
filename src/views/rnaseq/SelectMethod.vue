<template>
  <b-container>
    <div>II: Select method and tool</div>
    
    <select v-model="selectedMethod">
      <option v-for="(method, i) of task.methods" :key="i" :value="method">
        {{ method.label }}
      </option>
    </select>

    <b-form-select class="mb-3" v-model="selectedTool" :options="methodTools"></b-form-select>

    <b-button variant="primary" class="m-2" size="sm"
      @click="addTask">Add task</b-button>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SelectMethod",
  data() {
    return {
      selectedMethod: {},
      selectedTool: null,
    };
  },
  computed: {
    ...mapState(["project", "task"]),
    disableAdd() {
      const project_id = this.project.current_project.project_id
      return (this.selectedMethod && project_id) ? false : true;
    },
    methodTools() {
      // console.log(this.task.method_tools)
      return this.task.method_tools[this.selectedMethod.method_name]
    }
  },
  methods: {
    addTask() {
      const new_task = {
        task_id: this.task.new_task_id,
        method_tool_id: this.selectedTool ? this.selectedTool.method_tool_id : null,
        params: this.selectedTool.params ? this.selectedTool.params : 
          (this.selectedMethod.params ? this.selectedMethod.params : null),
      }
      this.$store.dispatch("saveTask", new_task);
    },
  },
};
</script>
