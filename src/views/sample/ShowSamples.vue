<template>
  <b-container>

    <h4 v-show="loaded_samples.length > 0">
      Samples of the study {{ study_name }}
    </h4>

    <b-table striped hover class="border"
      :items="loaded_samples" :fields="sample_header">
      <template #table-caption>
        Number of samples is {{ loaded_samples.length }}.
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
    ...mapState(["study_name", "loaded_samples"]),
    sample_header() {
      if (this.loaded_samples.length > 0){
        return Object.keys(this.loaded_samples[0]);
      }
      return [];
    },
  },
};
</script>

