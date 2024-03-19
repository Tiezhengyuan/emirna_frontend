<template>
  <b-container fluid class="border mb-2">
    <b-row align-v="center" class="my-2">
      <b-col cols="auto">
        <b-button variant="success" size="lg"
          @click="executeTasks">Execute Tasks</b-button>
      </b-col>
      <b-col cols="1"></b-col>

      <b-col cols="auto" class="p-2 m-1 bg-info bg-gradient text-dark">
        <SelectProject><div>I. Select Project</div></SelectProject>
      </b-col>
      <b-col cols="auto">
        <b-icon icon="chevron-double-right" class="h4"></b-icon>
      </b-col>

      <b-col cols="auto" class="p-2 m-1 bg-info bg-gradient text-dark">
        <SelectMethod></SelectMethod>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import SelectProject from "../project/ProjectSelect";
import SelectMethod from "./SelectMethod";

export default {
  name: "RNAseqHeader",
  components: {
    SelectProject,
    SelectMethod,
  },
  computed: {
    ...mapState(["project", "task"]),
  },
  methods: {
    executeTasks() {
      this.$store.dispatch('executeTasks');
    },
  }
};
</script>

