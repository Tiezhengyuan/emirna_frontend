<template>
  <b-container>

    <b-card-group deck>
      <b-card
        header="Load samples into database"
        border-variant="primary"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>
          <div>
            <inputText :data="study_name" :receive="setStudyName"></inputText>
            <SelectFile></SelectFile>
          </div>
          <div>
            <button @click="saveSamples">Save Samples</button>
          </div>
          <ShowSamples></ShowSamples>
        </b-card-text>
      </b-card>

      <b-card
        header="Parse raw data with samples"
        border-variant="secondary"
        header-bg-variant="secondary"
        header-text-variant="white"
        align="center"
        class="mt-3"
      >
        <b-card-text>
          <ParseSamples></ParseSamples>
        </b-card-text>
      </b-card>
    </b-card-group>

  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import inputText from "../../components/forms/inputText";
import SelectFile from "../../components/forms/SelectFile";
import ParseSamples from "./ParseSamples";
import ShowSamples from "./ShowSamples";

export default {
  name: "LoadSamples",
  components: {
    inputText,
    SelectFile,
    ShowSamples,
    ParseSamples,
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
