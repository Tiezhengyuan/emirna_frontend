<template>
  <b-container class="border m-2">
    <b-button variant="primary" v-b-toggle.parent size="sm">
      Expand parent tasks
    </b-button>
    <b-button pill size="sm" variant="success" title="Save task" id="task-save"
      :disabled="disableSave" @click="saveParents">
      <b-icon icon="save"></b-icon>
    </b-button>

    <b-collapse id="parent">
      <b-form-group>
        <b-form-checkbox-group :options="parent_task_ids"
          name="parent_task_id" v-model="selected" @change="updateParent"
        ></b-form-checkbox-group>
      </b-form-group>
    </b-collapse>
  </b-container>
</template>

<script>
import { mapState, mapGetters } from "vuex";

export default {
  name: "TaskRelations",
  props: ["task_index"],
  data() {
    return {
      selected: [],
      disableSave: true,
    }
  },
  beforeMount() {
    this.selected = this.setChecked(this.task_index)
  },
  computed: {
    ...mapState(["task"]),
    ...mapGetters(["setChecked"]),
    project_task() {
      return this.task.project_tasks[this.task_index];
    },
    parent_task_ids() {
      const task_id = this.task.project_tasks[this.task_index].task_id;
      return this.task.task_tree[task_id];
    },
  },
  methods: {
    updateParent() {
      this.disableSave = false
      // console.log(this.selected)
      const pair = [this.project_task.task_id, this.selected];
      // console.log(pair)
      this.$store.commit("updateTaskParents", pair);
    },
    saveParents() {
      if (Object.keys(this.task.current_parents).length > 0) {
        // console.log("current parents")
        // console.log(this.task.current_parents)
        this.$store.dispatch('saveTaskParents');
      }
    },
  },
};
</script>

