<template>
  <b-container>

    <h4 v-show="sample.loaded_samples.length > 0">
      Samples of the study <em>{{ sample.new_study_name }}</em>
    </h4>

    <b-table striped hover class="border"
      :items="sample.loaded_samples" :fields="sample_header">
      <template #table-caption>
        Number of samples is {{ sample.loaded_samples.length }}.
      </template>
    </b-table>
    
    <slot></slot>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ShowSamples",
  computed: {
    ...mapState(["sample"]),
    sample_header() {
      if (this.sample.loaded_samples.length > 0){
        return Object.keys(this.sample.loaded_samples[0]);
      }
      return [];
    },
  },
};
</script>

