import { api } from "./api";

export default ({
    state: () => ({
        // defined with app mounted
        projects: [],
        project_options: {},
        new_project: {},

        // new project or selected project
        current_project: {},
        current_updated_project: {},

        deleted_projects: [],
        // project_id is key
        updated_projects: {},
    }),
    getters: {
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
        // RNAseqview.vue: add/delete tasks
        refreshCurrentProject(state) {
            const project_index = state.current_project.project_index;
            console.log(project_index)
            console.log(state.projects[project_index].status)
            state.current_project = {
                ...state.projects[project_index],
                project_index: project_index,
            };
        },
        
        // update projects
        updateUpdatedProject(state, key_val) {
            state.updated_project[key_val[0]] = key_val[1];
        },
        // ProjectSelect.vue
        selectProject(state, project_index) {
            state.current_project = {
                ...state.projects[project_index],
                project_index: project_index,
            };
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
            api.get("/api/project/front_projects/").then((res) => {
                context.state.new_project = res.data.new_project;
                context.state.projects =  res.data.projects;
                context.state.project_options =  res.data.options;
            });
        },
        // ProjectCreate.vue
        createNewProject(context) {
            api.post("/api/project/", context.state.new_project)
            .then(() => {
                context.dispatch("getProjects");
            }).catch((err) => {
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