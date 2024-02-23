<template>
  <b-container class="m-2 text-center">
    <h3>{{ task.current_task.label }}</h3>
    <h5>{{ task.current_task.tool_name}} {{ task.current_task.version}} </h5>
    <b-container>
      <b-button variant="success" @click="save">Save</b-button>
      <b-button variant="info" @click="reset">Reset</b-button>
    </b-container>

    <b-card class="m-2">
      <b-card-header>Required parameters</b-card-header>
      <b-card-body>
        <slot name="required"></slot>
      </b-card-body>
    </b-card>

    <b-card class="m-2">
      <b-card-header>Optional Parameters</b-card-header>
      <b-card-body>
        <slot name="optional"></slot>
      </b-card-body>
    </b-card>

    <b-card class="m-2">
      <b-card-header>Output options</b-card-header>
      <b-card-body>
        <slot name="output"></slot>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "SetParams",
  mounted() {
    this.$store.commit('setCurrentParams', this.task.current_task_index);
  },
  computed: {
    ...mapState(["task"]),
  },
  methods: {
    save() {
      this.$store.commit('updateParams', this.task.current_task_index);
    },
    reset() {
      this.$store.commit('setCurrentParams', this.task.current_task_index);
    },
  },
};
</script>



