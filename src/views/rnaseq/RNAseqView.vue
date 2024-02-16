<template>
  <b-container fluid>
    <RNAseqHeader></RNAseqHeader>
    <b-row>
      <b-col cols="9">
        <h3 v-show="current_project.id">
          Project: {{ current_project.project_id }}
        </h3>
        <div class="tasks-box">
          <NewTask v-for="(task, i) in project_tasks"
            :key="i" :task="task"></NewTask>
        </div>
      </b-col>
      <b-col cols="3">
        <b-container>
          <taskMethod :is="current_task.component"
            v-if="!!current_task.component"></taskMethod>
        </b-container>
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
  computed: {
    ...mapState(["current_project", "tasks", "current_task"]),
    project_tasks() {
      return this.tasks.filter((el) => {
        return el.project == this.current_project ? 1 : 0;
      });
    },
  },
};
</script>

<style scoped>
.tasks-box {
  display:flex;
  flex-wrap: wrap;
}
</style>