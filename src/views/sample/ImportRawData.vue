<template>
  <b-container>
    <div>
      <div>
        <label>Select a project</label>
        <inputDropdown :data="projects_list" :receive="selectProject"></inputDropdown>
      </div>
      <div>
        <label>Add samples</label>
          <inputDropdown :data="study_names" :receive="selectStudy"></inputDropdown>
        <button>Save</button>
      </div>
    </div>

    <b-container
      v-show="project_files.length > 0"
      class="border-top mt-4 pt-2"
    >
      <h3>{{ current_project.project_id }}</h3>
      <b-table striped hover :items="project_files" :fields="fields">
        <template #table-caption>
          The number of samples is {{ project_files.length }}.
        </template>
      </b-table>
    </b-container>

  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import inputDropdown from "../../components/forms/inputDropdown";

export default {
  name: "ImportRawData",
  components: {
    inputDropdown,
  },
  data () {
    return {
      "fields": ["study_name", "sample_name", "raw_data.length"],
    };
  },
  computed: {
    ...mapState(["current_project"]),
    ...mapGetters(["projects_list", "study_names", "project_files"]),
  },
  methods: {
    selectProject(key_val) {
      this.$store.commit("setCurrentProject", key_val);
      this.$store.dispatch("getCurrentProjectFiles");
    },
    selectStudy(key_val) {
      const study_name = key_val[1]
      this.$store.dispatch("getUnassignedSampleFiles", study_name);
    },
  },
};
</script>

