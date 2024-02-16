<template>
  <b-container fluid>
    <b-card title="Applications" no-body>
      <b-card-header header-tag="nav">
        <b-nav tabs class="h3">
          <b-nav-item active>
            <router-link to="/" class="text-decoration-none">Home</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/sample" class="text-decoration-none">Samples</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/manage" class="text-decoration-none">Management</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/rnaseq" class="text-decoration-none">Pipeline</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/tools" class="text-decoration-none">Tools</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/debugging" class="text-decoration-none">Debugging</router-link>
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

