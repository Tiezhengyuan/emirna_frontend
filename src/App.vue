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
    this.$store.dispatch("getStudyNames");
    this.$store.dispatch("getCurrentUser");
  },
};
</script>
