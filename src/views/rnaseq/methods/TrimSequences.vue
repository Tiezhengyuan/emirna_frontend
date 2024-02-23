<template>
  <SetParams>
    <template #required>
      <b-form-group label="3-end adapter sequence">
        <b-form-input v-model="msg" @change="update3end"></b-form-input>
      </b-form-group>
    </template>
  </SetParams>
</template>

<script>
import { mapState } from "vuex";
import SetParams from './SetParams';

export default {
  name: "TrimSequences",
  components: {
    SetParams,
  },
  data() {
    return {
      'adapter_3end': 3,
    }
  },
  computed: {
    ...mapState(['task']),
    msg: {
      get() {
        return this.task.current_task.params.adapter_3end;
      },
      set(val) {
        this.adapter_3end = val
      }
    }
  },
  methods: {
    update3end() {
      const pair = ["adapter_3end", this.adapter_3end]
      this.$store.commit("updateCurrentParams", pair)
    }
  },
};
</script>
