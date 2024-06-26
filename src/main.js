import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

// bootstrap
import {BootstrapVue, IconsPlugin } from 'bootstrap-vue'
// This imports all the layout components such as <b-container>, <b-row>, <b-col>:
import { LayoutPlugin } from 'bootstrap-vue'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(LayoutPlugin)


// This imports <b-modal> as well as the v-b-modal directive as a plugin:
import { ModalPlugin } from 'bootstrap-vue'
Vue.use(ModalPlugin)

// This imports <b-card> along with all the <b-card-*> sub-components as a plugin:
import { CardPlugin } from 'bootstrap-vue'
Vue.use(CardPlugin)

// This imports directive v-b-scrollspy as a plugin:
import { VBScrollspyPlugin } from 'bootstrap-vue'
Vue.use(VBScrollspyPlugin)

// This imports the dropdown and table plugins
import { DropdownPlugin, TablePlugin } from 'bootstrap-vue'
Vue.use(DropdownPlugin)
Vue.use(TablePlugin)


import { LinkPlugin } from 'bootstrap-vue'
Vue.use(LinkPlugin)


import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  LayoutPlugin,
  render: (h) => h(App),
}).$mount("#app");




