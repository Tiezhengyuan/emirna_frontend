import { api } from "./api";

export default ({
    state: () => ({
        projects: [],

        next_project_id: "",
        // new project or selected project
        current_project: {},
        current_updated_project: {},

        deleted_projects: [],
        // project_id is key
        updated_projects: {},
    }),
    getters: {
        project_id(state) {
            const val = state.current_project.project_id;
            return {
              label: "Project ID: ",
              value: val ? val: state.next_project_id,
            };
          },
        project_name(state) {
            const val = state.current_project.project_name;
            return {
              name: "project_name",
              label: "Project Name",
              value: val ? val : "",
            };
        },
        project_description(state) {
            const val = state.current_project.description;
            return {
              name: "description",
              label: "Project Description",
              value: val ? val : "",
            };
        },
        sequencing(state) {
            const val = state.current_project.sequencing;
            return {
              name: "sequencing",
              label: "Sequencing Technique",
              value: val ? val : null,
              required: true,
              options: [
                { value: "mrna-seq", label: "mRNA-Seq" },
                { value: "mirna-seq", label: "miRNA-Seq" },
                { value: "scrna-seq", label: "scRNA-Seq" },
                { value: "other", label: "other" },
              ],
            };
        },
        project_status(state) {
            const val = state.current_project.status;
            return {
              name: "status",
              label: "Project Status",
              value: val ? val : "A",
              options: [
                { value: "active", label: "active" },
                { value: "ready", label: "ready" },
                { value: "locked", label: "locked" },
                { value: "deleted", label: "deleted" },
              ],
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
        setUserProjects(state, projects) {
            state.projects = projects;
          },
        
        // state.new_project
        setNewProject(state) {
            if (state.projects.length > 0) {
              const last = state.projects[state.projects.length - 1];
              const next_id = Number(last.project_id.slice(1)) + 1;
              state.next_project_id = "P" + next_id.toString().padStart(3, "0");
            } else {
              state.next_project_id = "P001";
            }
            state.current_project.project_id = state.next_project_id;
        },
        updateNewProject(state, key_val) {
            state.current_project[key_val[0]] = key_val[1];
        },
        addNewProject(state) {
            state.projects.push(state.current_project);
        },
        
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
        setNextProjectID(state, data) {
            state.next_project_id = data.project_id;
        },
        updateUpdatedProject(state, key_val) {
            state.updated_project[key_val[0]] = key_val[1];
        },
        selectProject(state, selected_project) {
            state.current_project = selected_project;
        },
        updateUpdatedProjects(state) {
            const curr_id = state.current_project.project_id;
            state.updated_projects[curr_id] = state.current_project;
            state.current_project = {};
        },
        updateDeleted(state, selected) {
            // update state.projects
            state.projects = state.projects.filter((el) => {
              return el.project_id != selected;
            });
            // update state.deleted_projects
            state.deleted_projects.push(selected);
        },
      
    },
    actions: {
        // create new project
        // get new project_id, set current_project, and post current_project
        getNextProjectID(context) {
            api
            .get("/project/next_project_id/")
            .then((res) => {
                context.commit("setNextProjectID", res.data);
                context.commit("setCurrentProject", res.data.project_id);
            });
        },
        createNewProject(context) {
            const u = context.state.updated_project;
            const n = context.state.current_project;
            const data = {
                project_name: u.project_name ? u.project_name : n.project_name,
                description: u.description ? u.description : n.description,
                status: u.status ? u.status : n.status,
                sequencing: u.sequencing ? u.sequencing : n.sequencing,
            };
            api
            .post("/project/", data)
            .then(() => {
                context.dispatch("getProjects");
            })
            .catch((err) => {
                console.log(err);
            });
        },

        getProjects(context) {
            api.get("/project").then((res) => {
            context.commit("setUserProjects", res.data);
            context.commit("setNewProject");
            });
        },
        deleteProjects(context) {
            for (let project_id of context.state.deleted_projects) {
            api
                .delete(`/project/${project_id}/`)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                console.log(err);
                });
            }
            context.state.deleted_projects = [];
        },
        updateProjects(context) {
            for (let project_id of Object.keys(context.state.updated_projects)) {
                const updated = context.state.updated_projects[project_id];
                const data = {
                    project_id: project_id,
                    project_name: updated.project_name,
                    description: updated.description,
                    sequencing: updated.sequencing,
                    owner: updated.owner.id,
                }
                api
                .put(`/project/${project_id}/`, data)
                .then((res) => {
                    console.log(res);
                })
                .catch((err) => {
                    console.log(err);
                });
            }
            context.state.updated_projects = {};
        },


    }
})