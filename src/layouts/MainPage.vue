<template>
  <b-container>
    <HeaderBar></HeaderBar>
    <ContentPage></ContentPage>
    <!-- <FooterBar></FooterBar> -->
  </b-container>

</template>

<script>
import HeaderBar from "./HeaderBar";
import ContentPage from "./ContentPage";
// import FooterBar from "./FooterBar";

export default {
  name: "MainPage",
  components: {
    HeaderBar,
    ContentPage,
    // FooterBar,
  },
};
</script>

