<template>
  <b-container class="text-center">
    <h3>Create a new project</h3>

    <b-container v-if="showInput" class="border m-2">
      <PairedLabel :data="project_id"></PairedLabel>
      <inputText :data="project_name" :receive="receive"></inputText>
      <inputText :data="project_description" :receive="receive"></inputText>
      <inputDropdown :data="sequencing" :receive="receive"></inputDropdown>
      <inputDropdown :data="project_status" :receive="receive"></inputDropdown>
      <b-button variant="success" class="m-2" @click="create">Create</b-button>
      <b-button variant="secondary" @click="reset">Reset</b-button>
    </b-container>
    <b-container v-show="showWarning">
      Sequencing technique should be selected.
    </b-container>
    <b-container v-show="showSuccess">
      A new project was created.
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
    this.$store.dispatch("getNextProjectID");
  },
  data() {
    return {
      showInput: true,
      showWarning: false,
      showSuccess: false,
    };
  },
  computed: {
    ...mapState(["project"]),
    ...mapGetters(["project_id", "project_name", "project_description",
      "sequencing", "project_status"]),
  },
  methods: {
    receive(key_val) {
      this.$store.commit("updateCurrentProject", key_val);
    },
    create() {
      if (this.project.current_project.sequencing) {
        this.$store.dispatch("createNewProject");
        this.showWarning = false;
        this.showSuccess = true;
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
