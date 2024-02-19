<template>
  <b-container>
    <b-card class="border">
      <b-card-header>
        <b-nav>
          <b-nav-item active>
            <router-link to="/debugging/simple_table">Simple table</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/debugging/simple_input">Simple input</router-link>
          </b-nav-item>
          <b-nav-item>
            <router-link to="/debugging/store_data">Store</router-link>
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
    name: "DebuggingView",
}
</script>