<template>
  <b-container class="border m-3 p-2">
    <h3>Edit project {{ project.current_project.project_id }}</h3>
    <b-container class="m-3">
      <inputText :data="project_name" :receive="receive"></inputText>
      <inputText :data="project_description" :receive="receive"></inputText>
      <inputDropdown :data="sequencing" :receive="receive"></inputDropdown>
    </b-container>
    <b-button variant="success" @click="saveUpdate">save update</b-button>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import inputText from "../../components/forms/inputText";
import inputDropdown from "../../components/forms/inputDropdown";

export default {
  name: "ProjectEdit",
  components: {
    inputText,
    inputDropdown,
  },
  computed: {
    ...mapState(["project"]),
    ...mapGetters(['project_name', 'project_description', 'sequencing']),
  },
  methods: {
    receive(key_val) {
      this.$store.commit("updateCurrentProject", key_val);
    },
    saveUpdate() {
      this.$store.commit("updateUpdatedProjects");
    },
  },
};
</script>

