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
      <b-button pill size="sm" variant="success" title="Save task"
        id="task-save" @click="saveTask">
        <b-icon icon="save"></b-icon>
      </b-button>
    </b-card-header>

    <b-card-text>
      <!-- <b-container class="border my-3">
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

      Method: <em>{{ project_task.method_name }}</em>
      <b-button variant="info" v-b-toggle.sidebar-method-params
        @click="selectTask">Parameters</b-button>
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
    this.$store.commit('selectTask', this.task_index)
  },
  computed: {
    ...mapState(['project', 'task']),
    project_task() {
      return this.task.project_tasks[this.task_index];
    },
  },
  methods: {
    selectTask() {
      this.$store.commit("selectTask", this.task_index);
    },
    deleteTask() {
      this.$store.dispatch("deleteTask", this.task_index);
    },
    saveTask() {
      if (Object.keys(this.task.current_params).length > 0) {
        console.log("current params")
        console.log(this.task.current_params)
        const task = {
          task_id: this.project_task.task_id,
          params: this.task.current_params,
        }
        this.$store.dispatch("saveTask", task);
      }
      if (Object.keys(this.task.current_parents).length > 0) {
        // console.log("current parents")
        // console.log(this.task.current_parents)
        this.$store.dispatch('saveTaskParents');
      }
    },
    // submitTask() {
    //   const pair = [this.task_index, 'pending'];
    //   this.$store.commit("updateTaskStatus", pair);
    // },
    // stopTask() {
    //   const pair = [this.task_index, 'stopped']
    //   this.$store.commit("updateTaskStatus", pair);
    // },
  },
};
</script>
