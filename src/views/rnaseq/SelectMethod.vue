<template>
  <b-container>
    <div>II: Select method and tool</div>
    
    <select v-model="selectedMethod" @change="setMethod">
      <option v-for="(method, i) of task.methods" :key="i" :value="method">
        {{ method.label }}
      </option>
    </select>

    <b-form-select class="mb-3"
      v-model="selectedTool" :options="methodTools" @change="setMethodTool"
    ></b-form-select>

    <b-button variant="primary" class="m-2" size="sm"
      @click="addTask">Add task</b-button>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SelectMethod",
  mounted() {
    this.$store.dispatch('getMethodNames');
    this.$store.dispatch('getMethodTools');
  },
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
    setMethod() {
      // console.log(this.selectedMethod.method_name)
      this.$store.commit('setCurrentMethod', this.selectedMethod)
    },
    setMethodTool() {
      this.$store.commit('setCurrentMethodTool', this.selectedTool)
    },
    addTask() {
      this.$store.commit("addTask");
      this.$store.commit("nextTaskId");
    },
  },
};
</script>
