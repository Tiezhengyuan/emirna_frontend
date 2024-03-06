<template>
  <SetParams>

    <template #required>
      <b-form-group label="Select genome">
        <b-form-select v-model="project.current_project.genome.genome_id" @change="setGenome"
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
  computed: {
    ...mapState(['project', 'task', 'reference']),
  },
  methods: {
    setGenome(){
      const pair = ['genome_id', this.project.current_project.genome.genome_id]
      this.$store.commit('updateCurrentParams', pair)
    },
}
};
</script>
