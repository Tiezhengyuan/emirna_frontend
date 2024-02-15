<template>
  <b-container class="border mt-3 p-2">
    <table border="1">
      <thead>
        <tr>
          <th>Project ID</th>
          <th>Project Name</th>
          <th>Description</th>
          <th>Sequencing</th>
          <th>Status</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, i) in projects" :key="i">
          <td>{{ project.project_id }}</td>
          <td>{{ project.project_name }}</td>
          <td>{{ project.description }}</td>
          <td>{{ project.sequencing }}</td>
          <td>{{ project.status }}</td>
          <td>
            <b-button class="p-1 m-1" @click="deleteProject(project)"
            >Delete</b-button>
            <b-button class="p-1 m-1" @click="editProject(project)"
            >Edit</b-button>
          </td>
        </tr>
      </tbody>
    </table>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ProjectList",
  computed: {
    ...mapState(["projects"]),
  },
  data() {
    return {
      deleted: [],
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
      this.$store.commit("setCurrentProject", project);
    },
  },
};
</script>
