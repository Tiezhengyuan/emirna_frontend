<template>
  <b-container>
    <b-container class="border mb-3">
      <inputDropdown :data="input_study_names" :receive="receive"></inputDropdown>
    </b-container>

    <h4 v-show="sample.study_samples.length > 0">
      Study Samples
    </h4>
    <p>Study Name: <em>{{sample.current_study_name}}</em></p>
    <b-table striped :items="sample.study_samples">
    </b-table>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import inputDropdown from "../../components/forms/inputDropdown";

export default {
  name: "BrowseStudySamples",
  components: {
    inputDropdown,
  },
  computed: {
    ...mapState(["sample"]),
    ...mapGetters(['input_study_names']),
  },
  methods: {
    receive(key_val) {
      this.$store.dispatch('getStudySamples', key_val[1])
    },
  },
};
</script>

