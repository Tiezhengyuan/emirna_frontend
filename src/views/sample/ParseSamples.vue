<template>
  <b-container>
    <b-card
      header="Parse raw data with samples"
      border-variant="secondary"
      header-bg-variant="secondary"
      header-text-variant="white"
      align="center"
      class="mt-3"
    >
      <b-card-text>

        <b-row align-v="center" class="border p-2 mb-5">
          <b-col>Select study</b-col>
          <b-col>
            <b-form-select v-model="sample.current_study.study_name" @change="updateParsing"
              :options="sample.study_names"></b-form-select>
          </b-col>
          <b-col>Select data batch </b-col>
          <b-col>
            <b-form-select v-model="sample.current_study.batch_name" @change="updateParsing"
              :options="sample.batch_names"></b-form-select>
          </b-col>
          <b-col>Regular Expression</b-col>
          <b-col>
            <b-form-input disabled v-model="sample.current_study.reg"
              @change="updateParsing"></b-form-input>
          </b-col>
        </b-row>

        <b-row class="border">
          <div class="bg-info fw-bold fs-5 p-2">
            Detect unparsed FASTQ Data
            <b-button v-b-toggle.unparsed variant="info" size="sm">
              <strong v-if="showUnparsed">collapse<b-icon icon="arrow-up"></b-icon></strong>
              <strong v-else>expand<b-icon icon="arrow-down"></b-icon></strong>
            </b-button>
          </div>
          <b-collapse v-model="showUnparsed" id="unparsed" v-show="sample.unparsed_data.length > 0">
            <div class="m-2">
              <b-button variant="success" @click="parseSampleFiles">Submit</b-button>
            </div>
            <b-table striped :items="sample.unparsed_data" :fields="fields">
              <template #cell(Actions)="row">
                <b-button @click="removeFile(row.index)">delete</b-button>
              </template>
              <template #cell(Details)="row">
                <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
                  Details via check
                </b-form-checkbox>
                <!-- {{row}} -->
              </template>
            </b-table>
          </b-collapse>
        </b-row>

      </b-card-text>
    </b-card>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ParseSamples",
  mounted() {
    this.$store.commit('initCurrentStudy')
  },
  data () {
    return {
      fields: ["Actions", "sample_name", "batch_name", "file_name", "Details"],
      showUnparsed: true,
    };
  },
  computed: {
    ...mapState(["sample"]),
  },
  methods: {
    updateParsing() {
      this.$store.dispatch("getUnparsedData");
    },
    removeFile(i) {
      // i is index of unparsed_data
      this.$store.commit("removeUnparsedData", i);
    },
    parseSampleFiles() {
      this.$store.dispatch("parseSampleFiles");
    },
  },
};
</script>
