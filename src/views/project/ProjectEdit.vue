<template>
  <b-container class="border m-3 p-2">
    <h3>Edit project {{ project.current_project.project_id }}</h3>
    <b-container class="m-3">
    <b-row align-v="center" align-h="center" class="m-2">
      <b-col>Project Name</b-col>
      <b-col>
        <b-form-input v-model="project.current_project.project_name"></b-form-input>
      </b-col>
    </b-row>
    <b-row align-v="center" align-h="center" class="m-2">
      <b-col>Project Description</b-col>
      <b-col>
        <b-form-input v-model="project.current_project.description"></b-form-input>
      </b-col>
    </b-row>
    </b-container>
    <b-button variant="success" size="md" @click="saveUpdate" class="m-2">OK</b-button>
    <b-button variant="secondary" size="md" @click="cancel">Cancel</b-button>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProjectEdit",
  computed: {
    ...mapState(["project"]),
  },
  methods: {
    saveUpdate() {
      this.$store.commit("updateUpdatedProjects");
    },
    cancel() {
      this.$store.commit("clearCurrentProject");
    },
  },
};
</script>

