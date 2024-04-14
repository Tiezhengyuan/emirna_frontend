import { api } from "./api";
// import cookies from "vue-cookies";

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
            state.current_project = {
                ...state.projects[project_index],
                project_index: project_index,
            };
        },

        // ProjectList.vue
        // ProjectSelect.vue
        selectProject(state, project_index) {
            state.current_project = {
                ...state.projects[project_index],
                project_index: project_index,
            };
        },
        // update projects
        updateUpdatedProjects(state) {
            const curr_id = state.current_project.project_id;
            console.log(curr_id)
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
            const headers = {
                'X-CSRFToken':context.rootState.user.csrf_token
            }
            api.post("/api/project/", context.state.new_project, {headers})
            .then(() => {
                context.dispatch("getProjects");
            }).catch((err) => {
                console.log(err);
            });
        },

        // ProjectUpdate.vue
        deleteProjects(context) {
            for (let project_id of context.state.deleted_projects) {
                api.delete(`/api/project/${project_id}/`)
                    .then(() => {
                        context.state.deleted_projects = [];
                    }).catch((err) => {
                        console.log(err);
                    });
            }
        },
        updateProjects(context) {
            console.log(context.state.updated_projects)
            for (let project_id of Object.keys(context.state.updated_projects)) {
                const updated = context.state.updated_projects[project_id];
                const data = {
                    project_id: updated.project_id,
                    project_name: updated.project_name,
                    description: updated.description,
                    owner: updated.owner.user_id,
                }
                api.put(`/api/project/${project_id}/`, data)
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