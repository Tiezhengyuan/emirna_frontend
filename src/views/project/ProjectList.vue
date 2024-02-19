<template>
  <b-container class="border mt-3 p-2">
    <b-table stripped :items="project.projects" :fields="fields">
      <template #cell(Actions)="row">
        <b-button class="p-1 m-1" @click="deleteProject(row.item)"
          >Delete</b-button>
        <b-button class="p-1 m-1" @click="editProject(row.item)"
          >Edit</b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProjectList",
  computed: {
    ...mapState(["project"]),
  },
  data() {
    return {
      deleted: [],
      fields: ['project_id', 'project_name', 'description', 
        'sequencing', 'status', 'Actions'],
    };
  },
  methods: {
    deleteProject(project) {
      const selected = project.project_id;
      if (this.deleted.indexOf(selected) == -1) {
        this.deleted.push(selected);
        this.$store.commit("updateDeleted", selected);
      }
    },
    editProject(project) {
      this.$store.commit("refreshCurrentProject", project);
    },
  },
};
</script>
