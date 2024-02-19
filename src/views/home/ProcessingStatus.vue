<template>
  <b-container>
    <b-table :items="status" :fields="fields" caption-top>
      <template #cell(progress)="row">
        <b-progress min="0" max="100"
          :variant="progress_color(row.item.status)"
          :value="row.item.progress"
        ></b-progress>
      </template>
      <template #cell(Action)="row">
        <b-button variant="danger" size="sm" @click="runProject(item)"
          >{{ row.item.label }}</b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
export default {
  name: "ProcessingStatus",
  data() {
    return {
      fields: ['project', 'progress', 'status', 'Action'],
      status: [
        { project: "a", progress: 40, status: "running", label: "stop" },
        { project: "b", progress: 0, status: "pending", label: "stop" },
        { project: "c", progress: 100, status: "done", label: "restart" },
        { project: "d", progress: 0, status: "failed", label: "restart" },
      ],
    };
  },
  methods: {
    runProject(item) {
      if (item.label == "stop") {
        item.status = "stopped";
        item.label = "restart";
      } else {
        item.status = "pending";
        item.label = "stop";
      }
      console.log(item.project);
    },
    progress_color(status) {
      if (status === 'done') {
        return "success"
      } else if (status === "pending") {
        return "secondary"
      } else if (status == "failed") {
        return "danger"
      } else {
        return "primary"
      }
    },
},
};
</script>
