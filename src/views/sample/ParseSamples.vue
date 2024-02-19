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
          <b-col>
            <inputDropdown :data="input_study_names" :receive="receive"></inputDropdown>
          </b-col>
          <b-col>
            <inputText :data="sample_name_reg" :receive="receive"></inputText>
          </b-col>
          <b-col>
            <button @click="parseSampleFiles">Submit</button>
          </b-col>
        </b-row>

        <b-table striped
          :items="sample.unparsed_data"
          :fields="fields"
          v-show="sample.unparsed_data.length"
        >
          <template #cell(Actions)="row">
            <b-button @click="removeFile(row.index)">delete</b-button>
          </template>
          <template #cell(Details)="row">
            <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
              Details via check
            </b-form-checkbox>
          </template>
        </b-table>
      </b-card-text>

    </b-card>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import inputDropdown from "../../components/forms/inputDropdown";
import inputText from "../../components/forms/inputText";

export default {
  name: "ParseSamples",
  components: {
    inputDropdown,
    inputText,
  },
  data () {
    return {
      fields: ["Actions", "sample_name", "batch_name", "file_name", "Details"],
    };
  },
  computed: {
    ...mapState(["sample"]),
    ...mapGetters(["input_study_names", "sample_name_reg"]),
  },
  methods: {
    receive(key_val) {
      this.$store.commit("updateParseSamples", key_val);
      this.$store.dispatch("detectUnparsedData");
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
