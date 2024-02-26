<template>
  <b-container>
    <b-button variant="success" @click="applyChanges">Apply all changes</b-button>
    <b-row>
      <b-col cols="auto 8">
        <ProjectList></ProjectList>
      </b-col>
      <b-col cols="auto 4">
        <ProjectEdit v-if="showUpdate"></ProjectEdit>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import ProjectEdit from "./ProjectEdit";
import ProjectList from "./ProjectList";

export default {
  name: "ProjectUpdate",
  components: {
    ProjectEdit,
    ProjectList,
  },
  mounted() {
    this.$store.commit("clearCurrentProject");
  },
  computed: {
    ...mapState(["project"]),
    showUpdate() {
      return Object.keys(this.project.current_project).length === 0 ? false : true;
    },
  },
  methods: {
    applyChanges() {
      if (this.project.deleted_projects) {
        this.$store.dispatch("deleteProjects");
      }
      if (this.project.updated_projects) {
        this.$store.dispatch("updateProjects");
      }
      window.location.reload();
    },
  },
};
</script>

