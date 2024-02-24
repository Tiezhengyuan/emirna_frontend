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
import TrimSequences from "./methods/TrimSequences";
import AlignTranscriptome from "./methods/AlignTranscriptome";
import ConvertFormat from "./methods/ConvertFormat";
import AssembleTranscripts from "./methods/AssembleTranscripts";
import MergeTranscripts from "./methods/MergeTranscripts";
import MergeReadCounts from "./methods/MergeReadCounts";
import QualityControl from "./methods/QualityControl";
import AlignShortReads from "./methods/AlignShortReads";
import CountReads from "./methods/CountReads";
import BuildGenomeIndex from "./methods/BuildGenomeIndex";
import BuildIndex from "./methods/BuildIndex";

export default {
  name: "ViewRNAseq",
  components: {
    RNAseqHeader,
    NewTask,
    AlignGenome,
    TrimSequences,
    AlignTranscriptome,
    ConvertFormat,
    AssembleTranscripts,
    MergeTranscripts,
    MergeReadCounts,
    QualityControl,
    AlignShortReads,
    CountReads,
    BuildGenomeIndex,
    BuildIndex,
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