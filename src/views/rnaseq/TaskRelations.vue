<template>
  <b-container class="border m-2">
    <b-button variant="primary" v-b-toggle.parent size="sm">
      Expand parent tasks
    </b-button>
    <b-collapse id="parent">
      <b-form-group>
        <b-form-checkbox-group :options="parent_task_ids" :checed="checked"
          name="parent_task_id" v-model="selected" @change="updateParent"></b-form-checkbox-group>
      </b-form-group>
    </b-collapse>

  </b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "TaskRelations",
  props: ["task_index"],
  data() {
    return {
      selected: [],
      visible: false,
    }
  },
  computed: {
    ...mapState(["task"]),
    project_task() {
      return this.task.project_tasks[this.task_index];
    },
    parent_ids() {
      const task_id = this.task.project_tasks[this.task_index].task_id;
      return this.task.task_tree[task_id]
    },
    parent_task_ids() {
      const this_task = this.task.project_tasks[this.task_index];
      const parent_ids = this.task.project_tasks.filter((el) => {
          return this_task.task_id !== el.task_id;
        }).map((el) => {
          return {text: el.task_id, value: el.task_id};
        });
      return parent_ids
    },
    checked() {
      const task_id = this.task.project_tasks[this.task_index].task_id;
      const checked_ids = this.task.task_tree[task_id];
      return this.task.project_tasks.map((el) => {
        const task_id = el.task_id;
        return checked_ids.find((el) => el == task_id ? true : false)
      })
    }
  },
  methods: {
    updateParent() {
      this.visible = !this.visible
      // console.log(this.selected)
      const pair = [this.project_task.task_id, this.selected];
      this.$store.commit("updateParentTask", pair);
    },
  },
};
</script>

