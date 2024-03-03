<template>
  <b-row>
    <b-col>
      <label>{{ data.label }}</label>
    </b-col>
    <b-col>
      <label>{{ data.value }}</label>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "inputText",
  props: ["data",],
};
</script>
