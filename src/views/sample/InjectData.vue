<template>
  <b-container>
    <b-row align-v="center">
      <b-col cols="3" class="border p-2 text-start">
        <b-form-group label="Select one Project">
            <b-form-select v-model="project.current_project"
              :options="project.project_options.projects"></b-form-select>
        </b-form-group>
        <b-form-group label="Select Parsed Samples">
            <b-form-select v-model="sample.current_study.study_name"
              :options="sample.study_names"></b-form-select>
        </b-form-group>

        <b-button variant="info" class="m-2" @click="getData">View Data</b-button>
        <b-button variant="secondary" class="m-2" @click="resetSelect">Reset</b-button>
      </b-col>

      <b-col>
        <!-- show current project sample files -->
        <b-container
          v-show="pipeline.project_samples.length > 0"
          class="border-top mt-4 pt-2"
        >
          <h4>Project: {{ project.current_project.project_id }}</h4>
          <b-table striped hover :items="pipeline.project_samples" :fields="fields">
            <template #cell(raw_data)="row">{{row.item.raw_data.length}}</template>
            <template #cell(action)="row">
              <b-button variant="danger" size="sm" @click="deleteSample(row.item)">Delete</b-button>
            </template>
            <template #table-caption>
              The number of samples is {{ pipeline.project_samples.length }}.
            </template>
          </b-table>
        </b-container>

        <!-- show unassigned sample files -->
        <b-container
          v-show="pipeline.unassigned_samples.length > 0"
          class="border-top mt-4 pt-2"
        >
          <h4>Unassigned samples in Study {{sample.current_study.study_name}}</h4>
          <b-button variant="success" class="m-3"
            @click="injectSamples">Inject Samples</b-button>
          <b-table striped hover :items="pipeline.unassigned_samples" :fields="fields">
            <template #cell(raw_data)="row">{{row.item.raw_data.length}}</template>
            <template #cell(action)="row">
              <b-button variant="secondary" size="sm" @click="removeUnassigned(row)">Remove</b-button>
            </template>
            <template #table-caption>
              The number of samples is {{ pipeline.unassigned_samples.length }}.
            </template>
          </b-table>
        </b-container>
      </b-col>

    </b-row>
  </b-container>
</template>

<script>
import { mapState} from "vuex";

export default {
  name: "InjectData",
  data () {
    return {
      "fields": ["study_name", "sample_name", "raw_data", "Action"],
    };
  },
  computed: {
    ...mapState(["project", "sample", "pipeline"]),
  },
  methods: {
    getData() {
      if (this.project.current_project.project_id && this.sample.current_study.study_name) {
        this.$store.dispatch("getProjectData")
      }
    },
    resetSelect() {
      this.$store.commit("clearCurrentProject");
      this.$store.commit("initCurrentStudy");
      this.$store.commit("clearParser");
    },
    deleteSample(item) {
      this.$store.dispatch("deleteProjectSample", item);
    },
    injectSamples(){
      this.$store.dispatch('postProjectSamples');
    },
    removeUnassigned(row) {
      this.$store.commit("removeUnassignedSample", row.index);
    },
  },
};
</script>

