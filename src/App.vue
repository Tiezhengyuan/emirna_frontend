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
    this.$store.dispatch("getProjects");
    this.$store.dispatch("getProjectOptions");
    this.$store.dispatch("getStudyNames");
    this.$store.dispatch("getCurrentUser");
    // methods in tasks
    this.$store.dispatch('getMethods');
    // reference
    this.$store.dispatch("getSpecieGroups");
    this.$store.dispatch("getDataSources");
    this.$store.dispatch("getReadyGenomes");
    this.$store.dispatch("getTypeRNAs");
  },
};
</script>
