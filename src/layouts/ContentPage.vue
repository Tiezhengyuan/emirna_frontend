<template>
  <b-container>
    <b-card title="Applications" no-body>
      <b-card-header header-tag="nav">
        <b-nav>
          <b-nav-item active>
            <router-link to="/">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/sample">Samples</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/manage">Management</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/rnaseq">Bioinformatics Pipeline</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/tools">Tools</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/debugging">Debugging</router-link>
          </b-nav-item>
        </b-nav>
      </b-card-header>
  
      <b-card-body>
        <router-view></router-view>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "ContentPage",
};
</script>

