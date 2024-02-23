<template>
  <div>
    <TrimSequences></TrimSequences>
  </div>
  
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import TrimSequences from "../rnaseq/methods/TrimSequences";

export default {
  name: "MethodParams",
  components: {
    TrimSequences,
  },
  computed: {
    ...mapState(['project', 'task']),
    ...mapGetters(["new_project_id"]),
  },
  methods: {
  },
};
</script>