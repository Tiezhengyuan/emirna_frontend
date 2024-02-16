<template>
<b-container fluid class="bg-dark">
  <b-row>
    <b-col align-self="center">
      <b-img thumbnail rounded="0" src="#" alt="logo"></b-img>
    </b-col>

    <b-col class="text-white">
      <h1>eRNA</h1>
    </b-col>

    <b-col align-self="end" class="text-white">
      <span class="p-3">
        User Name: <mark>{{ current_user.username }}</mark>
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
    ...mapState(["current_user"]),
  },
};
</script>

