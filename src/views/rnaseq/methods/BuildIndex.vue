<template>
  <SetParams>
    <template #required>
      <b-form-group label="Select RNA type">
        <b-form-select v-model="task.current_params.annot_type" :options="reference.rna_types"
          @change="changeRNAType"></b-form-select>
      </b-form-group>

      <b-form-group label="Select RNA">
        <b-form-select v-model="task.current_params.id" :options="type_rnas" @change="setRNA"></b-form-select>
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
  afterMounted() {
    this.$set(this.$store.state.task.current_params, 'model', 'RNA')
  },
  computed: {
    ...mapState(['reference', 'task']),
    type_rnas() {
      return this.reference.type_rnas[this.task.current_params.annot_type];
    },
  },
  data () {
    return {
      select_model: 'RNA',
      rna_type: this.$store.state.task.current_params.annot_type,
      select_rna: this.$store.state.task.current_params.id,
    }
  },
  methods: {
    changeRNAType(val) {
      this.rna_type = val;
      this.$set(this.$store.state.task.current_params, 'model', 'RNA');
      this.$set(this.$store.state.task.current_params, 'id', null);
      this.$store.state.task.current_params.change=true;
    },
    setRNA(val){
      this.$store.state.task.current_params.change=true;
      this.$set(this.$store.state.task.current_params, 'id', val);
    }
  },
};
</script>
