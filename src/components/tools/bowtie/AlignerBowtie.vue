<template>
  <b-container class="m-2 text-center">
    <h3>aligner: Bowtie2</h3>
    <b-card class="m-2">
      <b-card-header>Required parameters</b-card-header>
      <b-card-body>
        <BowtieRequired></BowtieRequired>
      </b-card-body>
    </b-card>

    <b-card class="m-2">
      <b-card-header>Alignment options</b-card-header>
      <b-card-body>
        <BowtieAlignment></BowtieAlignment>
      </b-card-body>
    </b-card>

    <b-card class="m-2">
      <b-card-header>Output options</b-card-header>
      <b-card-body>
        <BowtieOutput></BowtieOutput>  
      </b-card-body>
    </b-card>
    <b-container>
      <b-button variant="success" @click="save">Save</b-button>
    </b-container>
  </b-container>
</template>

<script>
import BowtieRequired from "./BowtieRequired";
import BowtieAlignment from "./BowtieAlignment";
import BowtieOutput from "./BowtieOutput";

export default {
  name: "AlignerBowtie",
  components: {
    BowtieRequired,
    BowtieAlignment,
    BowtieOutput,
  },
  methods: {
    save() {
      console.log("save Bowtie2");
    },
  },
};
</script>

