<template>
  <b-container>
      <b-card
        header="Load Samples or Phenotypes into Database"
        border-variant="primary"
        header-bg-variant="primary"
        header-text-variant="white"
        align="center"
      >
        <b-card-text>
          <b-row align-v="center" class="m-2">
            <b-col cols="8">
              <SelectFile></SelectFile>
            </b-col>
          </b-row>
          <b-row align-v="center" class="m-2">
            <b-col cols="4">Enter Study Name:</b-col>
            <b-col cols="6">
              <b-form-input v-model="sample.new_study_name"></b-form-input>
              <label v-show="showNameHint" class="font-weight-bold">
                No empty study name or duplicated name!
              </label>
            </b-col>
          </b-row>

          <h4 v-show="sample.loaded_samples.length > 0">
            Samples of the study <em>{{ sample.new_study_name }}</em>
          </h4>
          <b-table striped hover class="border" :items="sample.loaded_samples">
            <template #table-caption>
              Number of samples is {{ sample.loaded_samples.length }}.
            </template>
          </b-table>

          <b-button variant="success" :disabled="!canLoad" @click="saveSamples">Save Samples</b-button>
          <div v-show="doLoad">Try to load samples</div>
        </b-card-text>
      </b-card>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import SelectFile from "./SelectFile";


export default {
  name: "LoadSamples",
  components: {
    SelectFile,
  },
  data() {
    return {
      'doLoad': false,
    };
  },
  computed: {
    ...mapState(["sample"]),
    showNameHint() {
      if (this.sample.new_study_name) {
        const name = this.sample.new_study_name;
        console.log(this.sample.study_names.find(el => el.value == name))
        return this.sample.study_names.find(el => el.value == name);
      }
      return true
    },
    canLoad() {
      return !this.showNameHint && this.sample.loaded_samples.length > 0
    },
  },
  methods: {
    saveSamples() {
      if (this.canLoad) {
        this.$store.dispatch("postLoadedSamples");
        this.doLoad=true;
      }
    },
  },
};
</script>
