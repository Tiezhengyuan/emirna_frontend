<template>
  <b-container>
    <h3>Download Genome References</h3>
    <label>Note: genome DNA and transcripts</label>
    <b-container class="border m-2">
      <!-- specie -->
      <inputDropdown :data="specie_group" :receive="selectGroup"></inputDropdown>
      <inputDropdown v-show="showSpecie" :data="specie" :receive="receive"></inputDropdown>
      <!-- genome -->
      <inputDropdown :data="data_source" :receive="selectDataSource"></inputDropdown>
      <inputDropdown v-show="showVersion" :data="version" :receive="receive"></inputDropdown>
    </b-container>
    <div>
      <b-button variant="success" class="m-2" @click="submit"
        >Submit download request</b-button>
      <b-button variant="secondary" @click="reset">Reset</b-button>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from "vuex";
import inputDropdown from "../components/forms/inputDropdown";

export default {
  name: "ManageReference",
  components: {
    inputDropdown,
  },
  computed: {
    ...mapGetters(["specie_group", "data_source", "specie", "version"]),
  },
  data() {
    return {
      showSpecie: false,
      showVersion: false,
    };
  },
  methods: {
    selectGroup(key_val) {
      this.$store.commit("updateNewGenome", key_val);
      this.$store.dispatch("getSpecies");
      this.showSpecie = true;
    },
    receive(key_val) {
      this.$store.commit("updateNewGenome", key_val);
    },
    selectDataSource(key_val) {
      this.$store.commit("updateNewGenome", key_val);
      this.$store.dispatch("getVersions");
      this.showVersion = true;
    },
    submit() {
      this.$store.dispatch("requestNewGenome");
      window.location.reload();
    },
    reset() {
      window.location.reload();
    },
  },
};
</script>
