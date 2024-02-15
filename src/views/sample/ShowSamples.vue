<template>
  <div>
    <b-table striped hover :items="items" :fields="fields">
      <template #table-caption>This is a table caption.</template>
    </b-table>


    <table border="1">
      <caption v-show="loaded_samples.length > 0">
        Samples of the study {{ study_name }}
      </caption>
      <thead>
        <tr>
          <th v-for="(name, h) in sample_header" :key="h">{{ name }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(values, s) in loaded_samples" :key="s">
          <td v-for="(val, i) in values" :key="i">{{ val }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "ShowSamples",
  data() {
      return {
        table_name: "Name",
        fields: ['first_name', 'last_name', 'age'],
        items: [
          { isActive: true, age: 40, first_name: 'Dickerson', last_name: 'Macdonald' },
          { isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw' },
          { isActive: false, age: 89, first_name: 'Geneva', last_name: 'Wilson' },
          { isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney' }
        ]
      }
    },
  computed: {
    ...mapState(["study_name", "loaded_samples"]),
    sample_header() {
      if (this.loaded_samples.length > 0){
        return Object.keys(this.loaded_samples[0]);
      }
      return []
    },
  },
};
</script>

