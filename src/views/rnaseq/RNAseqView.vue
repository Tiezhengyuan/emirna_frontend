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
        <b-sidebar id="sidebar-method-params" title="Parameters" width="40%"
          bg-variant="dark" text-variant="light" right shadow>
          <taskMethod :is="task.current_task.component"
            v-if="!!task.current_task.component"></taskMethod>
        </b-sidebar>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import { mapState } from "vuex";
import RNAseqHeader from "./RNAseqHeader";
import NewTask from "./NewTask";

import AlignerBowtie from "../../components/tools/bowtie/AlignerBowtie";
import AlignerTophat from "../../components/tools/AlignerTophat";
import AssemblerCufflinks from "../../components/tools/AssemblerCufflinks";
import CountReads from "../../components/tools/CountReads";
import TrimSeq from "../../components/tools/TrimSeq";


export default {
  name: "ViewRNAseq",
  components: {
    RNAseqHeader,
    NewTask,

    AlignerBowtie,
    AlignerTophat,
    AssemblerCufflinks,
    CountReads,
    TrimSeq,
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