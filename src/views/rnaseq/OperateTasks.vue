<template>
  <div>
    <b-row class="mb-3">
      <b-col cols="2">
        <b-button variant="success" size="lg"
          @click="submitTask">Submit Tasks</b-button>
      </b-col>
      <b-col cols="3">
        <b-button variant="info" size="lg"
          @click="refreshProjectTasks">Refresh Project</b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "OperateTasks",
  methods: {
    submitTask() {
      console.log("tasks");
    },
    // remove unsubmitted tasks and get latest tasks
    refreshProjectTasks() {
      this.$store.commit("refreshProjectTasks");
    },
  },
};
</script>

