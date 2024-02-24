import { api } from "./api";


export default ({
    state: () => ({
        project_tasks: [],

        new_task_id: null,
        deleted_tasks: [],
        task_tree: {},
        
        // methods
        methods: [],
        method_tools: {},

        current_task: {},
        current_task_index: 0,
        current_method: {},
        current_method_tool: {},
        current_params: {},
        celery_tasks: [],
    }),
    getters: {
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
            state.current_method = method
        },
        setCurrentMethodTool(state, method_tool) {
            state.current_method_tool = method_tool
        },
        addTask(state) {
            const new_task = {
                ...state.current_method,
                ...state.current_method_tool,
                task_id: state.new_task_id,
                need_save: true,
                status: null,
            }
            state.task_tree[state.new_task_id] = []
            state.project_tasks.push(new_task);
            // console.log(new_task)
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
            state.current_task_index = task_index
        },
        // task.TaskRelations.vue
        updateParentTask(state, pair) {
            state.task_tree[pair[0]] = pair[1]
            // console.log(state.task_tree)
        },

        // set method parameters
        setCurrentParams(state, task_index){
            if (task_index < state.project_tasks.length) {
                const task = state.project_tasks[task_index]
                state.current_params = task.params ? task.params : {};
            }
        },
        updateCurrentParams(state, key_val) {
            state.current_params[key_val[0]] = key_val[1];
            console.log(state.current_params)
        },
        updateTaskParams(state, task_index){
            if (task_index < state.project_tasks.length) {
                state.project_tasks[task_index].params = state.current_params;
                console.log(state.project_tasks[task_index].params)
            }
        },        
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
        // SelectMethod.vue
        getMethodNames(context) {
            api
            .get("/method/method_names/")
            .then((res) => {
                context.state.methods = res.data
            })
            .catch((err) => {
                console.log(err);
            });
        },
        getMethodTools(context) {
            api
            .get("/method_tool/method_tools/")
            .then((res) => {
                context.state.method_tools = res.data
            })
            .catch((err) => {
                console.log(err);
            });
        },
    }
})