<template>
  <b-container>
    <b-card pills>

      <b-card-header header-tag="nav">
        <b-nav>
          <b-nav-item>
            <router-link to="/reference/download_reference"
              class="text-decoration-none">Download reference</router-link>
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
  name: "ReferenceView",
};
</script>
