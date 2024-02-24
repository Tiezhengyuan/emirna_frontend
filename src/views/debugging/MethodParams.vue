<template>
  <div>
    <!-- <TrimSequences></TrimSequences> -->
    <!-- <BuildGenomeIndex></BuildGenomeIndex> -->
    <BuildIndex></BuildIndex>
  </div>
  
</template>

<script>
import { mapState, mapGetters } from 'vuex';
// import TrimSequences from "../rnaseq/methods/TrimSequences";
// import BuildGenomeIndex from "../rnaseq/methods/BuildGenomeIndex";
import BuildIndex from "../rnaseq/methods/BuildIndex";

export default {
  name: "MethodParams",
  components: {
    // TrimSequences,
    // BuildGenomeIndex,
    BuildIndex,

  },
  computed: {
    ...mapState(['project', 'task']),
    ...mapGetters(["new_project_id"]),
  },
  methods: {
  },
};
</script>