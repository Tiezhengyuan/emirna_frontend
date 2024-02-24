<template>
  <SetParams>

    <template #required>
      <b-form-group label-cols="4" label="Select RNA type">
        <b-form-select v-model="selectedRNAType" @change="setRNAType"
          :options="reference.rna_types"></b-form-select>
      </b-form-group>

      <b-form-group label-cols="4" label="Select RNA">
        <b-form-select v-model="selectedRNA" @change="setRNA"
          :options="rnas"></b-form-select>
      </b-form-group>
    </template>

  </SetParams>
</template>

<script>
import { mapState } from "vuex";
import SetParams from './SetParams';

export default {
  name: "BuildIndex",
  components: {
    SetParams,
  },
  computed: {
    ...mapState(['reference']),
    rnas() {
      return this. reference.type_rnas[this.selectedRNAType];
    }
  },
  data () {
    return {
      selectedRNAType: '',
      selectedRNA: '',
    }
  },
  methods: {
    setRNAType(){
      const pair = ['annot_type', this.selectedRNAType]
      this.$store.commit('updateCurrentParams', pair)
    },
    setRNA(){
      const pair = ['annot_id', this.selectedRNA]
      this.$store.commit('updateCurrentParams', pair)
    }
  },
};
</script>
