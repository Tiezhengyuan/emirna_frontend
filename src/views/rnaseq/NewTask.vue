<template>
<div class="m-2" @click="selectTask">
  <b-card border-variant="primary" header-bg-variant="primary"
      header-text-variant="white" align="center"
      style="max-width: 20rem;" class="mb-2"  
    >
    <b-card-header>
      Task: {{ project_task.task_id }}
      <b-button pill variant="danger" title="Delete task"
        size="sm" id="task-delete" @click="deleteTask">
        <b-icon icon="trash-fill"></b-icon>
      </b-button>
    </b-card-header>

    <b-card-text>
      <TaskRelations :task_index="task_index"></TaskRelations>

      Method: <em>{{ project_task.method_name }}</em>
      <b-button variant="info" size="sm" v-b-toggle.sidebar-method-params
        v-show="setParams" @click="selectTask">Parameters</b-button>
    </b-card-text>

  </b-card>
</div>
</template>

<script>
import { mapState } from "vuex";
import TaskRelations from "./TaskRelations";

export default {
  name: "NewTask",
  props: ["task_index"],
  components: {
    TaskRelations,
  },
  mounted() {
    this.$store.commit('selectTask', this.task_index);
    // this.$store.commit('setCurrentParams', this.task_index);
  },
  computed: {
    ...mapState(['project', 'task']),
    project_task() {
      return this.task.project_tasks[this.task_index];
    },
    noChanges() {
      return Object.keys(this.task.current_params).length == 0 && Object.keys(this.task.current_parents).length == 0;
    },
    setParams() {
      const method_name = this.task.project_tasks[this.task_index].method_name
      const params = ["trim_sequences", "build_index"]
      return params.indexOf(method_name) >= 0 ? true : false;
    }
  },
  methods: {
    selectTask() {
      this.$store.commit("selectTask", this.task_index);
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task_index);
    },
  },
};
</script>
