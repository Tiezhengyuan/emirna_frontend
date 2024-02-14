import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import HomeView from "../views/home/HomeView";
import ManageView from "../views/ManageView";
import RNAseqView from "../views/rnaseq/RNAseqView";
import ToolsView from "../views/tools/ToolsView";

import ProjectCreate from "../views/project/ProjectCreate";
import ProjectUpdate from "../views/project/ProjectUpdate";
import ManageRawData from "../views/ManageRawData";
import ManageSample from "../views/ManageSample";
import ManageReference from "../views/ManageReference";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/manage",
    name: "manage",
    component: ManageView,
    children: [
      {
        path: "create_project",
        name: "create_project",
        component: ProjectCreate,
      },
      {
        path: "update_projects",
        name: "update_projects",
        component: ProjectUpdate,
      },
      {
        path: "load_samples",
        name: "load_samples",
        component: ManageSample,
      },
      {
        path: "import_raw_data",
        name: "import_raw_data",
        component: ManageRawData,
      },
      {
        path: "build_reference",
        name: "build_reference",
        component: ManageReference,
      },
    ],
  },
  {
    path: "/rnaseq",
    name: "rnaseq",
    component: RNAseqView,
  },
  {
    path: "/tools",
    name: "tools",
    component: ToolsView,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
