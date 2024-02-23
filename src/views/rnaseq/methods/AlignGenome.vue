<template>
  <SetParams>

    <template #required>
      
      required
      
    </template>
  </SetParams>
</template>

<script>
import { mapState } from "vuex";
import SetParams from './SetParams';

export default {
  name: "AlignGenome",
  components: {
    SetParams,
  },
  computed: {
    ...mapState(['task']),
  },
};
</script>
