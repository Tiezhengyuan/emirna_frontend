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
    this.$store.dispatch("getStudy");
    // methods in tasks
    this.$store.dispatch('getMethods');
    //genome reference
    this.$store.dispatch("getGenomes");
    // RNA annotations
    this.$store.dispatch("getRNAs");
  },
};
</script>
