<template>
  <b-container class="text-center">
    <h3>Create a new project</h3>

    <b-container v-if="showInput" class="border m-2">
      <PairedLabel :data="new_project_id"></PairedLabel>
      <inputText :data="project_name" :receive="receive"></inputText>
      <inputText :data="project_description" :receive="receive"></inputText>
      <inputDropdown :data="sequencing" :receive="receive"></inputDropdown>
      <inputDropdown :data="project_status" :receive="receive"></inputDropdown>
      <inputDropdown :data="ready_genome" :receive="receive"></inputDropdown>
      <b-button variant="success" class="m-2" @click="create">Create</b-button>
      <b-button variant="secondary" @click="reset">Reset</b-button>
    </b-container>
    <b-container v-show="showWarning">
      Either Sequencing or genome should be selected.
    </b-container>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import PairedLabel from "../../components/showing/PairedLabel";
import inputText from "../../components/forms/inputText";
import inputDropdown from "../../components/forms/inputDropdown";

export default {
  name: "ProjectCreate",
  components: {
    PairedLabel,
    inputText,
    inputDropdown,
  },
  mounted() {
    this.$store.dispatch("getGenomes");
    this.$store.dispatch("getNextProjectID");
  },
  data() {
    return {
      showInput: true,
      showWarning: false,
    };
  },
  computed: {
    ...mapState(["project"]),
    ...mapGetters(["new_project_id", "project_name", "project_description",
      "sequencing", "project_status", "ready_genome"]),
  },
  methods: {
    receive(key_val) {
      this.$store.commit("updateUpdatedProject", key_val);
    },
    create() {
      if (this.project.updated_project.sequencing && this.project.updated_project.genome) {
        this.$store.dispatch("postNewProject");
      } else {
        this.showWarning = true;
      }
    },
    reset() {
      window.location.reload();
    },
  },
};
</script>
