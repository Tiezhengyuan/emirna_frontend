<template>
  <b-container>
    <b-card pills>

      <b-card-header header-tag="nav">
        <b-nav>
          <b-nav-item >
            <router-link to="/manage/load_samples"
              class="text-decoration-none">Load Samples</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/manage/create_project"
              class="text-decoration-none">Create Project</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/manage/import_raw_data"
              class="text-decoration-none">Import Raw Data</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/manage/build_reference"
              class="text-decoration-none">Build Reference</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/manage/update_projects"
              class="text-decoration-none">Update Projects</router-link>
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
  name: "ViewManage",
};
</script>
