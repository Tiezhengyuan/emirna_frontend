const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/',
  devServer: {
    // front-end host
    host: 'localhost',
    port: 8080,
    // across domain to back-end
    // used for local testing
    // but is dermined by nginx conf in container 
    proxy: {
      '^/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '^/celery_tasks': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  }
});
