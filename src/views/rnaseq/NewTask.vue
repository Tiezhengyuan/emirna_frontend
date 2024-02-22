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
      <!-- <b-container class="border my-3">
        <span class="h3">{{ status }}</span>
        <b-button-group class="mx-1">
          <b-button pill variant="info" title="Stop task"
            id="task-stop" @click="stopTask">
            <b-icon icon="stop-fill"></b-icon>
          </b-button>
          <b-button pill variant="success" title="Run task"
            id="task-submit" @click="submitTask">
            <b-icon icon="play-fill"></b-icon>
          </b-button>
        </b-button-group>
      </b-container> -->

      <TaskRelations :task_index="task_index"></TaskRelations>
      
      <b-button variant="info" v-b-toggle.sidebar-method-params
        @click="selectTaskMethod"
      >Method: {{ project_task.task_method }}</b-button>
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
  computed: {
    ...mapState(['task']),
    project_task() {
      return this.task.project_tasks[this.task_index];
    },
  },
  methods: {
    selectTask() {
      this.$store.commit("selectTask", this.task_index);
    },
    deleteTask() {
      this.$store.commit("deleteTask", this.task_index);
    },
    submitTask() {
      const pair = [this.task_index, 'pending'];
      this.$store.commit("updateTaskStatus", pair);
    },
    stopTask() {
      const pair = [this.task_index, 'stopped']
      this.$store.commit("updateTaskStatus", pair);
    },
    selectTaskMethod() {
      this.$store.commit("selectTaskMethod", this.project_task);
    },
  },
};
</script>
