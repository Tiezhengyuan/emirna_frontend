import { api } from "./api";


export default ({
    state: () => ({
        project_tasks: [],

        new_task_id: null,
        deleted_tasks: [],
        // task relation determined by api
        task_tree: {},
        // task relation updated by UI
        // child in key, parents in value
        task_pair: {},
        
        // methods
        methods: [],
        method_tools: {},
        method_parents: {},

        current_task: {},
        current_task_index: 0,
        current_method: {},
        current_method_tool: {},
        current_params: {},
        test: 3,
    }),
    getters: {
        setT: (state) => (x) => {
            state.test = x
            return state.test
        },
        setChecked: (state) => (task_index) => {
            const task_id = state.project_tasks[task_index].task_id;
            // console.log('set checked')
            // console.log(state.task_tree)
            const parents= state.task_tree[task_id]
            const checked = parents ? parents.filter(el => el.check).map(el => el.value) : [];
            // console.log(state.task_tree)
            return checked
        }
    },
    mutations: {
        // RNAseqView.vue
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

        // TaskRelation.vue
        updateTaskPair(state, pair) {
            state.task_pair[pair[0]] = pair[1]
        }
    },
    actions: {
        // ProjectSelect.vue
        getProjectTasks(context) {
            const project_id = context.rootState.project.current_project.project_id
            const config = {
                params: {project_id: project_id}
            }
            api.get("/task/project_tasks/", config).then((res) => {
                console.log('get project tasks')
                context.state.project_tasks = res.data;
            }).catch((err) => {
                console.log(err);
            });
        },
        getTaskTree(context) {
            const project_id = context.rootState.project.current_project.project_id
            const config = {
                params: {project_id: project_id}
            }
            api.get("/task_tree/task_parents/", config).then((res) => {
                context.state.task_tree = res.data;
                // console.log("get task tree")
                // console.log(context.state.task_tree)
                context.dispatch("getProjectTasks")
            }).catch((err) => {
                console.log(err);
            });
        },
        getNewTaskId(context) {
            const project_id = context.rootState.project.current_project.project_id
            const config = {
                params: {project_id: project_id}
            }
            api.get("/task/next_task_id", config).then((res) => {
                context.state.new_task_id = res.data
            })
            .catch((err) => {
                console.log(err);
            });
        },
        // App.vue
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
        getMethodParents(context) {
            api
            .get("/method_relation/parents/")
            .then((res) => {
                context.state.method_parents = res.data
            })
            .catch((err) => {
                console.log(err);
            });
        },
        // SelectMethod.vue
        saveNewTask(context) {
            const project_id = context.rootState.project.current_project.project_id
            const method_tool = context.state.current_method_tool
            const data = {
                project_id: project_id,
                tasks: [{
                    task_id: context.state.new_task_id,
                    params: method_tool ? method_tool.params : null,
                    method_tool_id: method_tool ? method_tool.method_tool_id : null,
                }],
            }
            api.post("task/load_tasks/", data).then(() => {
                context.dispatch("getProjectTasks");
                context.dispatch("getTaskTree");
                context.dispatch("getNewTaskId");
            }).catch((err) => {
                console.log(err);
            });
        },
        // NewTask.vue
        saveTaskPairs(context) {
            const task_id = context.state.current_task.task_id
            const data = {
                project_id: context.rootState.project.current_project.project_id,
                child: task_id,
                parents: context.state.task_pair[task_id],
            }
            console.log(data)
            api.post('/task_tree/update_task_pairs/', data).then(()=>{
                context.dispatch("getTaskTree");
            }).catch(()=>{})
        },
        // ??? NewTask.vue
        // saveTask(context, task_index) {
        //     const project_id = context.rootState.project.current_project.project_id
        //     const task = context.state.project_tasks[task_index]
        //     const data = {
        //         project_id: project_id,
        //         tasks: [{
        //             task_id: task.task_id,
        //             task_name: task.task_name,
        //             params: task.params,
        //             is_ready : task.is_ready,
        //             method_tool_id: task.method_tool_id,
        //         }],
        //     }
        //     api.post("task/load_tasks/", data).then(() => {
        //         // console.log(context.project_tasks)
        //     }).catch((err) => {
        //         console.log(err);
        //     });
        // },
    }
})