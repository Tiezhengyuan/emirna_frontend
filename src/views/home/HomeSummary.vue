<template>
  <b-container>
    <b-table caption-top class="" :items="items"></b-table>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "HomeSummary",
  mounted() {
    this.$store.dispatch("getRawDataCount");
  },
  computed: {
    ...mapState(["project", "sample"]),
    items() {
      return [
        {"Item": "Projects", "Number": this.project.projects.length},
        {"Item": "Study", "Number": this.sample.study_names.length},
        {"Item": "Raw data", "Number": this.sample.raw_data_count},
      ];
    },
  },
};
</script>
