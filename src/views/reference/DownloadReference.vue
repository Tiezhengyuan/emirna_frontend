<template>
  <b-container>
    <h3>
      Download Genome References
      <b-button  v-b-popover.hover.top="'References include genome DNA, transcripts'"
        size="sm" title="Note">
        <b-icon icon="question-circle-fill" aria-label="help"></b-icon>
      </b-button>
    </h3>

    <b-container class="border m-2">
      <b-row align-h="center" align-v="center" class="m-2">
        <b-col cols="4">Group of Organism</b-col>
        <b-col cols="4">
          <b-form-select v-model="reference.new_genome.group_name"
            :options="reference.specie_groups"></b-form-select>
        </b-col>
      </b-row>

      <b-row v-show="reference.new_genome.group_name"
        align-h="center" align-v="center" class="m-2">
        <b-col cols="4">Specie</b-col>
        <b-col cols="4">
          <b-form-select v-model="reference.new_genome.specie_name"
            :options="group_species"></b-form-select>
        </b-col>
      </b-row>

      <b-row align-h="center" align-v="center" class="m-2">
        <b-col cols="4">Data Source of Genome</b-col>
        <b-col cols="4">
          <b-form-select v-model="reference.new_genome.data_source"
            :options="reference.data_sources"></b-form-select>
        </b-col>
      </b-row>
      <b-row v-show="showVersion" align-h="center" align-v="center" class="m-2">
        <b-col cols="4">Genome Version</b-col>
        <b-col cols="4">
          <b-form-select v-model="reference.new_genome.version"
            :options="versions"></b-form-select>
        </b-col>
      </b-row>
    </b-container>

    <div>
      <b-button variant="success" class="m-2" @click="submit"
        >Submit download request</b-button>
      <b-button variant="secondary" @click="reset">Reset</b-button>
    </div>
    <div v-show="reference.new_genome.version">
      Try to download genome from {{reference.new_genome.data_source}}:
      specie: {{reference.new_genome.specie_name}},
      version: {{reference.new_genome.version}}.
    </div>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "DownloadReference",
  mounted() {
    this.$store.commit('initNewGenome')
  },
  computed: {
    ...mapState(["reference",]),
    group_species() {
      const group_name = this.reference.new_genome.group_name
      return this.reference.group_species[group_name];
    },
    showVersion() {
      const specie_name = this.reference.new_genome.specie_name;
      const data_source = this.reference.new_genome.data_source;
      return (specie_name && data_source) ? true : false;
    },
    versions() {
      const specie_name = this.reference.new_genome.specie_name;
      const data_source = this.reference.new_genome.data_source;
      return (specie_name && data_source) ? this.reference.version_genomes[data_source][specie_name] : [];
    },
  },
  methods: {
    submit() {
      this.$store.dispatch("requestNewGenome");
    },
    reset() {
      window.location.reload();
    },
  },
};
</script>
