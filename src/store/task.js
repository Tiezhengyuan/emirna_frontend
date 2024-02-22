import { api } from "./api";


export default ({
    state: () => ({
        project_tasks: [],
        new_task_id: null,
        deleted_tasks: [],
        task_tree: {},

        current_task: {},
        celery_tasks: [],
        task_methods: [
          { task_method: "sequence alignment", component: "AlignerBowtie" },
          { task_method: "genome alignment", component: "AlignerTophat" },
          { task_method: "genome assembly", component: "AssemblerCufflinks" },
          { task_method: "Count reads", component: "CountReads" },
          { task_method: "trim sequence", component: "TrimSeq" },
          { task_method: "quality control", component: "" },
        ],

      
    }),
    getters: {
        // otherTaskIds(state, task_id) {

        // },
    },
    mutations: {
        clearTask(state){
            state.project_tasks = []
            state.deleted_tasks = []
            state.task_tree = {}
            state.current_task = {}
        },
        // task.SelectMethod.vue
        setCurrentMethod(state, method) {
            state.current_task['task_method'] = method.task_method
            state.current_task['method_component'] = method.component
        },
        addTask(state) {
            const new_task = {
                ...state.current_task,
                task_id: state.new_task_id,
                need_save: true,
                status: null,
            }
            state.task_tree[state.new_task_id] = []
            state.project_tasks.push(new_task);
        },
        nextTaskId(state) {
            const current_id = Number(state.new_task_id.slice(-2))
            state.new_task_id = 'T' + String(current_id + 1).padStart(2, '0');
        },

        // task.NewTask.vue
        deleteTask(state, task_index) {
            const task_id = state.project_tasks[task_index].task_id;
            state.deleted_tasks.push(task_id);
            state.project_tasks.splice(task_index, 1);
        },
        updateTaskStatus(state, pair) {
            state.project_tasks[pair[0]] = pair[1];
        },
        selectTask(state, task_index) {
            state.current_task = state.project_tasks[task_index]
        },

        // task.TaskRelations.vue
        updateParentTask(state, pair) {
            state.task_tree[pair[0]] = pair[1]
            console.log(state.task_tree)
        },
        selectTaskMethod(state, task_obj) {
            state.current_task = task_obj;
        },

        // refreshProjectTasks(state) {
        //     state.tasks = state.tasks.filter((el) => {
        //       return el.project == state.current_project ? 0 : 1;
        //     });
        // },




        
    },
    actions: {
        getProjectTasks(context) {
            const project_id = context.rootState.project.current_project.project_id
            const config = {
                params: {project_id: project_id}
            }
            api
            .get("/task/", config).then((res) => {
                context.state.project_tasks = res.data.map((el) => {
                    return {
                        task_id: el.task_id,
                        task_method: el.method_tool.method,
                        status: el.task_execution ? el.task_execution.status : null,
                    };
                })
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getNewTaskId(context) {
            const project_id = context.rootState.project.current_project.project_id
            const config = {
                params: {project_id: project_id}
            }
            api
            .get("/task/next_task_id", config).then((res) => {
                context.state.new_task_id = res.data
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getCeleryTasks(context, status="ALL") {
            const config = {
                params: { status: status },
            };
            api
            .get("/celery_task_result/", config)
            .then((res) => {
                context.state.celery_tasks = res.data.map((el) => {
                el.task_name = String(el.task_name).replace("celery_tasks.tasks.", "");
                el.date_created = el.date_created.split(".")[0];
                el.date_done = el.date_done.split(".")[0];
                return el;
                });
            })
            .catch((err) => {
                console.log(err);
            });
        },

    }
})