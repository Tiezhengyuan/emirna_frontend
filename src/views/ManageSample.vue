<template>
  <b-container>
    <fieldset>
      <legend>Load samples into database</legend>
      <b-container>
        <div>
          <inputText :data="study_name" :receive="setStudyName"></inputText>
          <SelectFile></SelectFile>
        </div>
        <div>
          <button @click="saveSamples">Save Samples</button>
        </div>
      </b-container>
      <ManageSampleShow></ManageSampleShow>
    </fieldset>

    <fieldset>
      <legend>Parse raw data with samples</legend>
      <ManageSampleParse></ManageSampleParse>
    </fieldset>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import inputText from "../components/forms/inputText";
import SelectFile from "../components/forms/SelectFile";
import ManageSampleParse from "./ManageSampleParse";
import ManageSampleShow from "./ManageSampleShow";

export default {
  name: "ManageSample",
  components: {
    inputText,
    SelectFile,
    ManageSampleShow,
    ManageSampleParse,
  },
  mounted() {
    this.$store.dispatch("getStudyNames");
  },
  computed: {
    ...mapState(["loaded_samples", "new_study_name"]),
    ...mapGetters(["study_name"]),
  },
  methods: {
    setStudyName(key_val) {
      this.$store.commit("setNewStudyName", key_val[1]);
    },
    saveSamples() {
      if (this.new_study_name && this.loaded_samples.length > 0) {
        this.$store.dispatch("postLoadedSamples");
      } else {
        console.log("study name or samples should not be empty.")
      }
    },
  },
};
</script>
