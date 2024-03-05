<template>
  <b-container>
    <b-row class="border mb-3">
      <b-col cols="4">Select a Study</b-col>
      <b-col cols="4">
        <b-form-select v-model="sample.current_study.study_name" @change="receive"
          :options="sample.study_names"></b-form-select>
      </b-col>
    </b-row>

    <div v-show="showSamples">
      <h4>Study Samples</h4>
      <p>Study Name: <em>{{sample.current_study.study_name}}</em>
        <b-button variant="danger" size="sm" class="m-2"
          @click="deleteStudy">Delete</b-button>
      </p>
      <b-table striped :items="sample.study_samples" :fields="fields">
        <template #cell(RawData)="row">{{row.item.raw_data.length}}</template>
      </b-table>
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "BrowseStudySamples",
  mounted() {
    this.$store.commit('initCurrentStudy')
  },
  data() {
    return {
      fields: ["study_name", "sample_name", "metadata", "RawData"]
    }
  },
  computed: {
    ...mapState(["sample"]),
    showSamples() {
      return this.sample.current_study.study_name && (this.sample.study_samples.length > 0);
    },
  },
  methods: {
    receive() {
      if (this.sample.current_study.study_name) {
        this.$store.dispatch('getStudySamples')
      }
    },
    deleteStudy() {
      this.$store.dispatch('deleteStudySamples');
    },
  },
};
</script>

