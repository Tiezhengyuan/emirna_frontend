<template>
  <div class="container update-projects">
    <div class="apply-changes">
      <button @click="applyChanges">Apply all changes</button>
      <!-- {{ deleted_projects }} -->
      <!-- {{ updated_projects }} -->
    </div>
    <ProjectEdit v-if="showUpdate"></ProjectEdit>
    <ProjectList></ProjectList>
  </div>
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
  computed: {
    ...mapState(["current_project", "deleted_projects", "updated_projects"]),
    showUpdate() {
      return Object.keys(this.current_project).length === 0 ? false : true;
    },
  },
  methods: {
    applyChanges() {
      if (this.deleted_projects) {
        this.$store.dispatch("deleteProjects");
      }
      if (this.updated_projects) {
        this.$store.dispatch("updateProjects");
      }
    },
  },
};
</script>

<style scoped>
.container.update-projects {
  border: 1px solid white;
}
.container.update-projects .apply-changes button {
  font-size: 24px;
  margin: 10px;
  padding: 5px;
  color: white;
  background-color: red;
}
</style>
