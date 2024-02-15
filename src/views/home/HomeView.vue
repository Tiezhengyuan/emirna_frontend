<template>
<b-container>
  <b-list-group>

    <b-list-group-item>
      <div @click="changeShowAsync">
        <span class="h3 p-2">Asynchronized Tasks</span>
        <b-icon v-show="showAsync" icon="box-arrow-in-up"></b-icon>
        <b-icon v-show="!showAsync" icon="box-arrow-in-down"></b-icon>
      </div>
      <AsyncTasks v-if="showAsync"></AsyncTasks>  
    </b-list-group-item>

    <b-list-group-item>
      <div @click="changeShowProcessing">
        <span class="h3 p-2">Monitor Processing Status</span>
        <b-icon v-show="showProcessing" icon="box-arrow-in-up"></b-icon>
        <b-icon v-show="!showProcessing" icon="box-arrow-in-down"></b-icon>
      </div>
      <ProcessingStatus v-if="showProcessing"></ProcessingStatus>
    </b-list-group-item>

    <b-list-group-item>
      <div @click="changeShowSummary">
        <span class="h3 p-2">Summary of eRNA</span>
        <b-icon v-show="showSummary" icon="box-arrow-in-up"></b-icon>
        <b-icon v-show="!showSummary" icon="box-arrow-in-down"></b-icon>
      </div>
      <HomeSummary v-if="showSummary"></HomeSummary>
    </b-list-group-item>

  </b-list-group>
</b-container>
</template>

<script>
import HomeSummary from "./HomeSummary";
import ProcessingStatus from "./ProcessingStatus";
import AsyncTasks from "./AsyncTasks";

export default {
  name: "HomeView",
  components: {
    HomeSummary,
    ProcessingStatus,
    AsyncTasks,
  },
  data() {
    return {
      showAsync: false,
      showProcessing: false,
      showSummary: false,
    };
  },
  methods: {
    changeShowAsync() {
      this.showAsync = !this.showAsync;
    },
    changeShowProcessing() {
      this.showProcessing = !this.showProcessing;
    },
    changeShowSummary() {
      this.showSummary = !this.showSummary;
    },
  },
};
</script>

