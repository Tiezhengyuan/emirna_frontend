<template>
  <b-container>
  <h3>getters</h3>

  <h3>mutations</h3>
    {{project.projects}}
    <button @click="myClick">set user projects</button>
  <h3>getters</h3>
    Project: {{new_project_id}}

  <h3>State</h3>
    {{project.projects}}
    {{user}}
  </b-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
  name: "StoreData",
  computed: {
    ...mapState(['project', 'user']),
    ...mapGetters(["new_project_id"]),
  },
  methods: {
    myClick() {
      this.$store.commit('setUserProjects', ['a','b'])
    },
  },
};
</script>