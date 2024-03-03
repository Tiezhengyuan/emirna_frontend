<template>
  <div>
    <MainPage></MainPage>
  </div>
</template>

<script>
import MainPage from "./layouts/MainPage";

export default {
  name: "App",
  components: {
    MainPage,
  },
  mounted() {
    this.$store.dispatch("getCurrentUser");
    // project
    this.$store.dispatch("getProjects");
    // sample
    this.$store.dispatch("getStudyNames");
    // methods in tasks
    this.$store.dispatch('getMethods');
    // reference
    this.$store.dispatch("getGenomes");

this.$store.dispatch("getSpecieGroups");
    this.$store.dispatch("getTypeRNAs");
  },
};
</script>
