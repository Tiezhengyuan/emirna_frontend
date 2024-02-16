<template>
  <b-container class="border m-3 p-2">
    <h3>Edit project {{ current_project.project_id }}</h3>
    <b-container class="m-3">
      <inputText :data="project_name" :receive="receive"></inputText>
      <inputText :data="description" :receive="receive"></inputText>
      <inputDropdown :data="sequencing" :receive="receive"></inputDropdown>
      <inputDropdown :data="status" :receive="receive"></inputDropdown>
    </b-container>
    <b-button variant="success" @click="saveUpdate">save update</b-button>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import inputText from "../../components/forms/inputText";
import inputDropdown from "../../components/forms/inputDropdown";

export default {
  name: "ProjectEdit",
  components: {
    inputText,
    inputDropdown,
  },
  computed: {
    ...mapState(["current_project"]),
    project_name() {
      return {
        name: "project_name",
        label: "Project Name",
        value: this.current_project.project_name,
      };
    },
    description() {
      return {
        name: "description",
        label: "Description",
        value: this.current_project.description,
      };
    },
    sequencing() {
      return {
        name: "sequencing",
        label: "Sequencing Technique",
        value: this.current_project.sequencing,
        options: [
          { value: "M", label: "mRNA-Seq", name: "a" },
          { value: "MI", label: "miRNA-Seq", name: "a" },
          { value: "SC", label: "scRNA-Seq", name: "a" },
          { value: "O", label: "Other", name: "a" },
        ],
      };
    },
    status() {
      return {
        name: "status",
        label: "Status",
        value: this.current_project.status,
        options: [
          { value: "A", label: "active" },
          { value: "I", label: "inactive" },
        ],
      };
    },
  },
  methods: {
    receive(key_val) {
      this.$store.commit("updateCurrentProject", key_val);
    },
    saveUpdate() {
      this.$store.commit("updateUpdated");
    },
  },
};
</script>

