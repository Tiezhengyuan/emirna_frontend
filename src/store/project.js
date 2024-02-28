import { api } from "./api";

export default ({
    state: () => ({
        // defined with app mounted
        projects: [],
        project_options: {},

        // new project or selected project
        current_project: {},
        current_updated_project: {},

        deleted_projects: [],
        // project_id is key
        updated_projects: {},
    }),
    getters: {
        project_id(state) {
            return {
              label: "Project ID: ",
              value: state.current_project.project_id,
            };
        },
        project_name(state) {
            return {
              name: "project_name",
              label: "Project Name",
              value: state.current_project.project_name,
            };
        },
        project_description(state) {
            return {
              name: "description",
              label: "Project Description",
              value: state.current_project.description,
            };
        },
        sequencing(state) {
            const val = state.current_project.sequencing;
            return {
              name: "sequencing",
              label: "Sequencing Technique",
              value: val ? val : null,
              required: true,
              options: state.project_options.sequencing,
            };
        },
        project_status(state) {
            return {
              name: "status",
              label: "Project Status",
              value: state.current_project.status,
              options: state.project_options.status,
            };
        },
        project_names(state) {
            return state.projects.map((el) => {
              return el.project_name;
            });
          },
        
        input_projects(state) {
            const options = state.projects.map((el) => {
              return {
                value: el.project_id,
                label: el.project_id,
              };
            });
            return {
              name: "project_id",
              label: "Project ID",
              value: "",
              options: options,
            };
        },        
    },
    mutations: {
        // state.current_project
        clearCurrentProject(state) {
            state.current_project = {};
        },
        setCurrentProject(state, project_id) {
            state.current_project = {
              project_id: project_id,
            };
        },
        updateCurrentProject(state, key_val) {
            state.current_project[key_val[0]] = key_val[1];
        },
        refreshCurrentProject(state, project) {
            state.current_project = project;
        },
        
        // update projects
        updateUpdatedProject(state, key_val) {
            state.updated_project[key_val[0]] = key_val[1];
        },
        // ProjectSelect.vue
        selectProject(state, projects_index) {
            state.current_project = state.projects[projects_index];
        },
        updateUpdatedProjects(state) {
            const curr_id = state.current_project.project_id;
            state.updated_projects[curr_id] = state.current_project;
            state.current_project = {};
        },
        updateDeleted(state, selected) {
            state.projects = state.projects.filter((el) => {
              return el.project_id != selected;
            });
            state.deleted_projects.push(selected);
        },
      
    },
    actions: {
        // App.vue
        getProjects(context) {
            api.get("/project").then((res) => {
                context.state.projects =  res.data;
            });
        },
        getProjectOptions(context) {
            api.get("/project/options/").then((res) => {
                context.state.project_options =  res.data;
            });
        },

        // ProjectCreate.vue
        getNewProject(context) {
            api.get("/project/new_project/").then((res) => {
                context.state.current_project = res.data;
            });
        },
        createNewProject(context) {
            const data = context.state.current_project;
            console.log(data);
            api.post("/project/", data).then(() => {
                context.dispatch("getProjects");
                context.dispatch("getNewProject");
            })
            .catch((err) => {
                console.log(err);
            });
        },

        // ProjectUpdate.vue
        deleteProjects(context) {
            for (let project_id of context.state.deleted_projects) {
                api.delete(`/project/${project_id}/`).then(() => {
                    context.state.deleted_projects = [];
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        updateProjects(context) {
            for (let project_id of Object.keys(context.state.updated_projects)) {
                const updated = context.state.updated_projects[project_id];
                api.put(`/project/${project_id}/`, updated)
                .then(() => {
                    context.state.updated_projects = {};
                })
                .catch((err) => {
                    console.log(err);
                });
            }
            
        },
    }
})