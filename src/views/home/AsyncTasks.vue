<template>
  <b-container>
    <div>
      <inputRadio :data="status" :receive="getStatus"></inputRadio>
      <inputCheckbox :data="select_columns" :receive="receive"></inputCheckbox>
    </div>

    <div>
      <table border="1">
        <thead>
          <tr>
            <th>No.</th>
            <th v-for="(header, m) in table_header" :key="m">
              {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, i) in pipeline.celery_tasks" :key="i">
            <td>{{ i + 1 }}</td>
            <td v-for="(name, j) in col_names" :key="j">
              {{ item[name] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </b-container>
</template>

<script>
import { mapState } from "vuex";
import inputCheckbox from "../../components/forms/inputCheckbox";
import inputRadio from "../../components/forms/inputRadio";

export default {
  name: "AsyncTasks",
  components: {
    inputCheckbox,
    inputRadio,
  },
  mounted() {
    this.$store.dispatch("getCeleryTasks");
  },
  computed: {
    ...mapState(["pipeline"]),
    table_header() {
      return this.select_columns.options.filter((el) => {
        return el.checked ? 1 : 0;
      }).map(el => el.label);
    },
    col_names() {
      return this.select_columns.options.filter((el) => {
        return el.checked ? 1 : 0;
      }).map(el => el.value);
    },
  },
  data() {
    return {
      status: {
        label: "Filter data by status",
        name: "status",
        value: "ALL",
        options: ["ALL", "SUCCESS", "FAILURE"],
      },
      select_columns: {
        label: "Select columns",
        name: "data",
        options: [
          {label: "Task Name", value: "task_name", checked: true},
          {label: "Status", value: "status", checked: true},
          {label: "Date Created", value: "date_created", checked: true},
          {label: "Date Done", value: "date_done", checked: true},
          {label: "Task ID", value: "task_id", checked: false},
          {label: "Result", value: "result", checked: false},
        ],
      },
    };
  },
  methods: {
    receive(obj){
      this.select_columns = obj;
    },
    getStatus(key_val) {
      this.$store.dispatch("getCeleryTasks", key_val[1]);
    },
  },
};
</script>

