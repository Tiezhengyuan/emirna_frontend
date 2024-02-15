import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import HomeView from "../views/home/HomeView";
import ManageView from "../views/ManageView";
import RNAseqView from "../views/rnaseq/RNAseqView";
import ToolsView from "../views/tools/ToolsView";
import DebuggingView from "../views/DebuggingView";

import ProjectCreate from "../views/project/ProjectCreate";
import ProjectUpdate from "../views/project/ProjectUpdate";
import ImportRawData from "../views/sample/ImportRawData";
import LoadSamples from "../views/sample/LoadSamples";
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
        component: LoadSamples,
      },
      {
        path: "import_raw_data",
        name: "import_raw_data",
        component: ImportRawData,
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
  {
    path: "/debugging",
    name: "debugging",
    component: DebuggingView,
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
