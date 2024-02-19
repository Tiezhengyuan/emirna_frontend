import { api } from "./api";


export default ({
    state: () => ({
        current_project_files: [],
        project_samples: [],
        unassigned_sample_files: [],
    }),
    getters: {
        project_files(state) {
            return [...state.current_project_files, ...state.unassigned_sample_files];
        },

    },
    mutations: {

    },
    actions: {
        getCurrentProjectFiles(context) {
            const config = {
              params: {
                project_id: context.rootState.project.current_project.project_id,
              },
            };
            api
              .get("/sample_project/project_sample_files", config)
              .then((res) => {
                context.state.current_project_files = res.data;
              })
              .catch((err) => {
                console.log(err);
              });
        },
        getProjectSamples(context, project_id) {
            api
              .get(`/project_sample/${project_id}`)
              .then((res) => {
                context.state.project_samples = res.data;
              })
              .catch((err) => {
                console.log(err);
              });
          },
        getUnassignedSampleFiles(context, study_name) {
            const config = {
              params: {
                project_id: context.state.current_project.project_id,
                study_name: study_name
              },
            };
            api
              .get("/sample_project/unassigned_sample_files/", config)
              .then((res) => {
                context.state.current_study_name = study_name;
                context.state.unassigned_sample_files = res.data;
              })
              .catch((err) => {
                console.log(err);
              });
        },    
    }
})