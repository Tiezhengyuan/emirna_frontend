<template>
<div class="m-2">
  <b-card border-variant="primary" header-bg-variant="primary"
      header-text-variant="white" align="center"
      style="max-width: 20rem;" class="mb-2"  
    >

    <b-card-header>Task: {{ task.task_id }}</b-card-header>

    <b-card-text>
      <b-container class="border my-3">
        <span class="h3">{{ status }}</span>
        <b-button-group class="mx-1">
          <b-button pill variant="danger" title="Delete task"
            id="task-delete" @click="deleteTask">
            <b-icon icon="trash-fill"></b-icon>
          </b-button>
          <b-button pill variant="info" title="Stop task"
            id="task-stop" @click="stopTask">
            <b-icon icon="stop-fill"></b-icon>
          </b-button>
          <b-button pill variant="success" title="Run task"
            id="task-submit" @click="submitTask">
            <b-icon icon="play-fill"></b-icon>
          </b-button>
        </b-button-group>
      </b-container>
      <TaskRelations :task="task"></TaskRelations>

      <b-button variant="info" @click="selectTaskMethod"
        >Method: {{ task.task_method }}</b-button>
    </b-card-text>

  </b-card>
</div>
</template>

<script>
import { mapState } from "vuex";
import TaskRelations from "./TaskRelations";

export default {
  name: "NewTask",
  props: ["task"],
  components: {
    TaskRelations,
  },
  data() {
    return {
      status: this.task.status,
    };
  },
  computed: {
    ...mapState(["task_methods", "tasks"]),
  },
  methods: {
    deleteTask() {
      this.$store.commit("deleteTask", this.task);
    },
    submitTask() {
      this.status = "pending";
      const obj = {
        task_id: this.task.task_id,
        status: this.status,
      };
      this.$store.commit("updateTaskStatus", obj);
    },
    stopTask() {
      this.status = "stopped";
      const obj = {
        task_id: this.task.task_id,
        status: this.status,
      };
      this.$store.commit("updateTaskStatus", obj);
    },
    selectTaskMethod() {
      this.$store.commit("selectTask", this.task);
    },
  },
};
</script>
