<template>
  <b-container>
    <b-card pills>

      <b-card-header header-tag="nav">
        <b-nav>

          <b-nav-item id="load">
            <router-link to="/sample/load_samples" class="text-decoration-none"
            >Load Samples</router-link>
            <b-popover target="load" triggers="hover" placement="top">
              <b>Create a new study and import samples from *.csv.</b>
            </b-popover>
          </b-nav-item>

          <b-nav-item v-b-popover.hover.top="'Parse samples with raw data in FASTQ'">
            <router-link to="/sample/parse_samples" class="text-decoration-none"
            >Parse RawData</router-link>
          </b-nav-item>

          <b-nav-item v-b-popover.hover.top="'Confirm sample information given a study'">
            <router-link to="/sample/browse_study_samples" class="text-decoration-none"
            >Browse Samples</router-link>
          </b-nav-item>

          <b-nav-item v-b-popover.hover.top="'Inject study and parsed raw data into a project'">
            <router-link to="/sample/inject_data" class="text-decoration-none"
            >Inject Data</router-link>
          </b-nav-item>

        </b-nav>
      </b-card-header>

      <b-card-body class="text-center">
        <router-view></router-view>
      </b-card-body>

    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "SampleView",
};
</script>
