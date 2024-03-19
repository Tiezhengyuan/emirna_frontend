<template>
  <b-container class="p-2">
    <h3>Create a new project</h3>
    <b-container class="border m-2 p-2 bv-example-row">
      <b-row align-v="center" align-h="center" class="m-2">
        <b-col cols="4">Project ID: </b-col>
        <b-col cols="4">{{project.new_project.project_id}}</b-col>
      </b-row>
      <b-row align-v="center" align-h="center" class="m-2">
        <b-col cols="4">Project Name: </b-col>
        <b-col cols="4">
          <b-form-input v-model="project.new_project.project_name"></b-form-input>
        </b-col>
      </b-row>
      <b-row align-v="center" align-h="center" class="m-2">
        <b-col cols="4">Description:</b-col>
        <b-col cols="4">
          <b-form-input v-model="project.new_project.description"></b-form-input>
        </b-col>
      </b-row>
    </b-container>
    
    <b-container class="m-2">
      <b-button variant="success" class="m-2" @click="create">Create</b-button>
      <b-button variant="secondary" @click="reset">Reset</b-button>
    </b-container>

    <div v-show="showSuccess">
      A new project was created.
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProjectCreate",
  data() {
    return {
      showSuccess: false,
    };
  },
  computed: {
    ...mapState(["project"]),
  },
  methods: {
    create() {
      this.$store.dispatch("createNewProject");
      this.showSuccess = true;
    },
    reset() {
      window.location.reload();
    },
  },
};
</script>
