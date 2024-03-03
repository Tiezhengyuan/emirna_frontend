<template>
  <b-container>
    {{project.current_project.project_id}}, {{sample.current_study_name}}
    <b-row align-v="center">
      <b-col cols="3" class="border p-2 text-start">
        <b-form-group label="Select one Project">
            <b-form-select v-model="project.current_project"
              :options="project.project_options.projects"></b-form-select>
        </b-form-group>
        <b-form-group label="Select one Study">
            <b-form-select v-model="sample.current_study_name"
              :options="sample.study_names"></b-form-select>
        </b-form-group>

        <b-button variant="success" class="m-3"
          @click="injectSamples">Inject samples</b-button>
      </b-col>

      <b-col>
        <!-- show current project sample files -->
        <b-container
          v-show="pipeline.current_project_files.length > 0"
          class="border-top mt-4 pt-2"
        >
          <h4>Project: {{ project.current_project.project_id }}</h4>
          <b-table striped hover :items="pipeline.current_project_files" :fields="fields">
            <template #table-caption>
              The number of samples is {{ pipeline.current_project_files.length }}.
            </template>
          </b-table>
        </b-container>

                <!-- show unassigned sample files -->
        <b-container
          v-show="pipeline.unassigned_sample_files.length > 0"
          class="border-top mt-4 pt-2"
        >
          <h4>Unassigned samples in Study {{sample.current_study_name}}</h4>
          <b-table striped hover :items="pipeline.unassigned_sample_files" :fields="fields">
            <template #table-caption>
              The number of samples is {{ pipeline.unassigned_sample_files.length }}.
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
      "fields": ["study_name", "sample_name", "raw_data.length"],
    };
  },
  computed: {
    ...mapState(["project", "sample", "pipeline"]),
  },
  methods: {
    selectProject(key_val) {
      this.$store.commit("setCurrentProject", key_val[1]);
      this.$store.dispatch("getCurrentProjectFiles");
    },
    selectStudy(key_val) {
      const study_name = key_val[1]
      this.$store.commit("setCurrentStudyName", study_name)
      this.$store.dispatch("getUnassignedSampleFiles", study_name)
    },
    injectSamples(){
      this.$store.dispatch('postProjectSamples')
    },
  },
};
</script>

