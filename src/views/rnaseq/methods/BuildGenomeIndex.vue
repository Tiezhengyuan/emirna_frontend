<template>
  <SetParams>

    <template #required>
      <b-form-group label="Select genome">
        <b-form-select v-model="selectedGenome" @change="setGenome"
          :options="reference.ready_genomes"></b-form-select>
      </b-form-group>

    </template>

  </SetParams>
</template>

<script>
import { mapState } from "vuex";
import SetParams from './SetParams';

export default {
  name: "BuildGenomeIndex",
  components: {
    SetParams,
  },
  data() {
    return {
      selectedGenome: '',
    }
  },
  computed: {
    ...mapState(['reference']),
  },
  methods: {
    setGenome(){
      const pair = ['genome_id', this.selectedGenome]
      this.$store.commit('updateCurrentParams', pair)
    },
}
};
</script>
