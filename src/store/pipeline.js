import { api } from "./api";


export default ({
  state: () => ({
    project_samples: [],
    unassigned_samples: [],
    
    // asynchronous tasks
    celery_tasks: [],

  }),
  getters: {},
  mutations: {
    clearParser(state) {
      state.project_samples = []
      state.unassigned_samples = []
    },
    removeUnassignedSample(state, sample_index) {
      state.unassigned_samples.splice(sample_index, 1);
    },
  },
  actions: {
    // InjectData.vue
    getProjectData(context) {
      const config = {
        params: {
          project_id: context.rootState.project.current_project.project_id,
          study_name: context.rootState.sample.current_study.study_name,
        },
      };
      api
        .get("/sample_project/project_data/", config)
        .then((res) => {
          context.state.project_samples = res.data.project_samples;
          context.state.unassigned_samples = res.data.unassigned_samples;
        });
    },
  postProjectSamples(context) {
    const data ={
      project_id: context.rootState.project.current_project.project_id,
      samples: context.state.unassigned_samples,
    };
    console.log(data)
    api
      .post("/sample_project/load_project_samples/", data)
      .then(() => {
        context.dispatch('getProjectData');
      });
  },
  deleteProjectSample(context, item) {
    api
      .delete(`/sample_project/${item.sample_project_id}`)
      .then(() => {
        context.dispatch("getProjectData");
      });
  },
  // AsyncTasks.vue
  getCeleryTasks(context, status = "ALL") {
    const config = {
      params: { status: status },
    };
    api
      .get("/celery_task_result/", config)
      .then((res) => {
        context.state.celery_tasks = res.data.map((el) => {
          return {
            task_name: String(el.task_name).replace("celery_tasks.tasks.", ""),
            date_created: el.date_created.split(".")[0],
            date_done: el.date_done.split(".")[0],
            status: el.status,
            task_id: el.task_id,
            result: el.result,
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },

  }
})