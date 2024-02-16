<template>
  <b-container class="border mb-2">
    <b-row class="m-2">
        <OperateTasks class="select"></OperateTasks>
    </b-row>
    <b-row align-v="center" class="my-2">
      <b-col class="p-2 m-1 bg-info bg-gradient text-dark">
        <SelectProject><div>I. Select Project</div></SelectProject>
      </b-col>
      <b-col cols="auto">
        <b-icon icon="chevron-double-right" class="h4"></b-icon>
      </b-col>

      <b-col class="p-2 m-1 bg-info bg-gradient text-dark">
        <SelectMethod class="select"><div>II: Select method</div></SelectMethod>
      </b-col>
      <b-col cols="auto">
        <b-icon icon="chevron-double-right" class="h4"></b-icon>
      </b-col>

      <b-col class="p-2 m-1 bg-info bg-gradient text-dark">
        <SelectMethod class="select"><div>III: Select tool</div></SelectMethod>
      </b-col>

      <b-col class="add-task">
        <button @click="addTask">Add task</button>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import SelectProject from "../project/ProjectSelect";
import SelectMethod from "./SelectMethod";
import OperateTasks from "./OperateTasks";

export default {
  name: "RNAseqHeader",
  components: {
    SelectProject,
    SelectMethod,
    OperateTasks,
  },
};
</script>

