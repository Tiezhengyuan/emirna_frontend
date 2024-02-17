export default {
    // 
    setCurrentUser(state, user) {
      state.current_user = {
        username: user.username,
        groups: user.groups,
        id: user.id,
        email: user.email,
      };
    },

    // sry
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
      // initialize other params
      state.new_project.owner = state.current_user.id;
      // state.new_project.sequencing = state.default_project.sequencing.value;
      // state.new_project.status = state.default_project.status.value;
    },
    setCurrentProject(state, key_val) {
      state.current_project = {
        project_id: key_val[1],
      };
      state.current_study_name = "";
      state.unassigned_sample_files = [];
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
  addTask(state, new_task) {
    state.new_task_id += 1;
    state.tasks.push(new_task);
  },
  deleteTask(state, task) {
    state.tasks = state.tasks.filter((el) => {
      return el.task_id == task.task_id ? 0 : 1;
    });
  },
  refreshProjectTasks(state) {
    state.tasks = state.tasks.filter((el) => {
      return el.project == state.current_project ? 0 : 1;
    });
  },
  updateTaskStatus(state, task_obj) {
    state.tasks.forEach((el) => {
      if (el.task_id == task_obj.task_id) {
        el.status = task_obj.status;
      }
    });
  },
  setParentTask(state, task_pair) {
    state.tasks.forEach((el) => {
      if (el.task_id == task_pair[0]) {
        el.parent_task = task_pair[1];
      }
    });
  },
  selectTask(state, task_obj) {
    state.current_task = task_obj;
  },
};
