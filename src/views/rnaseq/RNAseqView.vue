<template>
  <b-container fluid>
    <RNAseqHeader></RNAseqHeader>

    <b-row>
      <b-col cols="8">
        <h3 v-show="project.current_project.id">
          Project: {{ project.current_project.project_id }}
        </h3>
        <div class="tasks-box">
          <NewTask v-for="(project_task, i) in task.project_tasks"
            :key="i" :task_index="i"></NewTask>
        </div>
      </b-col>
      <b-col>
        <b-sidebar id="sidebar-method-params" title="Setup Parameters" width="40%"
          bg-variant="dark" text-variant="light" right shadow>
          <div :is="task.current_task.component"
            v-if="!!task.current_task.component"></div>
        </b-sidebar>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { mapState } from "vuex";
import RNAseqHeader from "./RNAseqHeader";
import NewTask from "./NewTask";
// method parameters
import AlignGenome from "./methods/AlignGenome";

export default {
  name: "ViewRNAseq",
  components: {
    RNAseqHeader,
    NewTask,
    AlignGenome,
  },
  mounted() {
    this.$store.commit("clearTask");
  },
  computed: {
    ...mapState(["project", "task"]),
  },
};
</script>

<style scoped>
.tasks-box {
  display:flex;
  flex-wrap: wrap;
}
</style>