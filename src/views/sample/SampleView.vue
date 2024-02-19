<template>
  <b-container>
    <b-card pills>

      <b-card-header header-tag="nav">
        <b-nav>
          <b-nav-item >
            <router-link to="/sample/load_samples"
              class="text-decoration-none">Load Samples</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/sample/parse_samples"
              class="text-decoration-none">Parse Samples</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/sample/import_raw_data"
              class="text-decoration-none">Import Raw Data</router-link>
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
