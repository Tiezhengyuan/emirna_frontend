import { api } from "./api";

export default ({
    state: () => ({
        projects: [],

        next_project_id: "",
        current_project: {},
        current_updated_project: {},

        deleted_projects: [],
        updated_project: {},

        new_project: {
            project_name: "",
            description: "",
            sequencing: null,
            status: "A",
            genome: null,
        },
    }),
    getters: {
        new_project_id(state) {
            return {
              label: "Project ID: ",
              value: state.next_project_id,
            };
          },
        project_name(state) {
            const val = state.new_project.project_name;
            return {
              name: "project_name",
              label: "Project Name",
              value: val ? val : "",
            };
        },
        project_description(state) {
            const val = state.new_project.description;
            return {
              name: "description",
              label: "Project Description",
              value: val ? val : "",
            };
        },
        sequencing(state) {
            const val = state.new_project.sequencing;
            return {
              name: "sequencing",
              label: "Sequencing Technique",
              value: val ? val : "",
              required: true,
              options: [
                { value: "M", label: "mRNA-Seq" },
                { value: "MI", label: "miRNA-Seq" },
                { value: "SC", label: "scRNA-Seq" },
                { value: "O", label: "Other" },
              ],
            };
        },
        project_status(state) {
            const val = state.new_project.status;
            return {
              name: "status",
              label: "Project Status",
              value: val ? val : "",
              options: [
                { value: "A", label: "active" },
                { value: "I", label: "inactive" },
              ],
            };
        },
        project_names(state) {
            return state.projects.map((el) => {
              return el.project_name;
            });
          },
        
        projects_list(state) {
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
        setNewProject(state) {
            // initialize project_id
            if (state.projects.length > 0) {
              const last = state.projects[state.projects.length - 1];
              const next_id = Number(last.project_id.slice(1)) + 1;
              state.next_project_id = "P" + next_id.toString().padStart(3, "0");
            } else {
              state.next_project_id = "P001";
            }
            state.new_project.project_id = state.next_project_id;
            // state.new_project.sequencing = state.default_project.sequencing.value;
            // state.new_project.status = state.default_project.status.value;
        },
        setCurrentProject(state, key_val) {
            state.current_project = {
              project_id: key_val[1],
            };
        },
          // setCurrentProject(state, project) {
          //   state.current_project = project;
          //   state.current_updated_project = {
          //     owner: project.owner,
          //   };
          // },
        setNextProjectID(state, data) {
            state.next_project_id = data.project_id;
        },
          // update
        updateUpdatedProject(state, key_val) {
            state.updated_project[key_val[0]] = key_val[1];
        },
        updateNewProject(state, key_val) {
            state.new_project[key_val[0]] = key_val[1];
        },
        addNewProject(state) {
            state.projects.push(state.new_project);
        },
        selectProject(state, selected_project) {
            state.current_project = selected_project;
        },
        updateCurrentProject(state, key_val) {
            state.current_project[key_val[0]] = key_val[1];
        },
        updateUpdated(state) {
            const curr_id = state.current_project.id;
            state.updated_projects[curr_id] = state.current_updated_project;
            console.log(state.updated_projects);
            state.current_project = {};
            state.current_updated_project = {};
        },
        // deleted
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
        getProjects(context) {
            api.get("/project").then((res) => {
            context.commit("setUserProjects", res.data);
            context.commit("setNewProject");
            });
        },
        getNextProjectID(context) {
            api.get("/project/next_project_id/").then((res) => {
            context.commit("setNextProjectID", res.data);
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
            api
                .put(`/project/${project_id}/`, updated)
                .then((res) => {
                console.log(res);
                })
                .catch((err) => {
                console.log(err);
                });
            }
            context.state.updated_projects = {};
        },
        postNewProject(context) {
            const u = context.state.updated_project;
            const n = context.state.new_project;
            const project = {
            project_name: u.project_name ? u.project_name : n.project_name,
            description: u.description ? u.description : n.description,
            status: u.status ? u.status : n.status,
            sequencing: u.sequencing ? u.sequencing : n.sequencing,
            };
            api
            .post("/project/", project)
            .then((res) => {
                const reference = {
                project: res.data.project_id,
                genome: u.genome ? u.genome : n.genome,
                };
                context.dispatch("postReference", reference);
            })
            .catch((err) => {
                console.log(err);
            });
        },

    }
})