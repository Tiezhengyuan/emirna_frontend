<template>
<b-container fluid class="bg-dark">
  <b-row>
    <b-col cols="2" align-self="center">
      <b-img :src="require('../assets/erna_logo.png')" alt="logo" 
        thumbnail rounded="0"></b-img>
    </b-col>

    <b-col class="text-white" align-self="center">
      <h1>Bioinformatics for miRNA-Seq Data Analysis</h1>
    </b-col>

    <b-col cols="auto" align-self="end" class="text-white">
      <span class="p-3">
        User Name: <mark>{{ user.current_user.username }}</mark>
      </span>
      <b-link href="#" class="text-decoration-none">logout</b-link>
    </b-col>
  </b-row>
</b-container>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "HeaderBar",
  computed: {
    ...mapState(["user"]),
  },
};
</script>

