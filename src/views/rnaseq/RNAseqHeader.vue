<template>
  <b-container class="border mb-2">
    <b-row>
      <b-col>
        <SelectProject class="select">
          <div class="container-label">I. Select Project</div>
        </SelectProject>
      </b-col>
      <b-col>
        <div class="container-arrow">>></div>
      </b-col>

      <b-col>
        <SelectMethod class="select">
          <div class="container-label">II: Select method</div>
        </SelectMethod>
      </b-col>
      <b-col>
        <div class="container-arrow">>></div>
      </b-col>

      <b-col>
        <OperateTasks class="select"></OperateTasks>
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

<style scoped>
.container-arrow {
  height: 120px;
  width: 30px;
  margin: 5px;
  padding: 5px;
  line-height: 100px;
  box-sizing: border-box;
  background-color: lightgray;
}
.container-label {
  margin: 10px;
}
.select {
  height: 120px;
  margin: 5px;
  padding: 5px;
  background-color: lightblue;
}
</style>
