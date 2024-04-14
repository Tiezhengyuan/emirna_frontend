import { api, endpoint } from "./api";


export default ({
    state: () => ({
        //determined by api
        project_tasks: [],
        task_tree: {},
        new_task_id: null,
        project_status: null,

        // defined by the API: method_tool/front_methods/
        methods: [],
        method_tools: {},
        method_parents: {},
        
        // determined by front-end
        current_task: {},
        // update params
        current_params: {},
        // child in key, parents in value
        current_parents: {},

    }),
    getters: {
        setChecked: (state) => (task_index) => {
            const task_id = state.project_tasks[task_index].task_id;
            const parents= state.task_tree[task_id]
            const checked = parents ? parents.filter(el => el.check).map(el => el.value) : [];
            return checked
        }
    },
    mutations: {
        // RNAseqView.vue
        clearTask(state){
            state.project_tasks = []
            state.task_tree = {}
            state.current_task = {}
            state.current_params = {}
            state.current_parents = {}

        },
        // task.NewTask.vue
        selectTask(state, task_index) {
            state.current_task = state.project_tasks[task_index]
            if (state.current_task.params) {
                state.current_params = {
                    ...state.current_task.params,
                    change: false,
                }
            }else {
                state.current_params = {}
            }
            state.current_parents = {}
            // console.log(state.current_task)
        },
        // SetParams.vue
        setCurrentParams(state){
            if (state.current_task.params) {
                state.current_params = {
                    ...state.current_task.params,
                    change: false,
                }
            }else {
                state.current_params = {}
            }
            // console.log(state.current_params)
        },
        updateCurrentParams(state, pair) {
            state.current_params[pair[0]] = pair[1];
        },

        // TaskRelation.vue
        updateTaskParents(state, pair) {
            state.current_parents[pair[0]] = pair[1]
            console.log(state.current_parents)
        }
    },
    actions: {
        // App.vue
        getMethods(context) {
            api
            .get("/api/method_tool/front_methods/")
            .then((res) => {
                context.state.methods = res.data.method_names
                context.state.method_tools = res.data.method_tools
                context.state.method_parents = res.data.method_parents
            })
            .catch((err) => {
                console.log(err);
            });
        },
        // SetParams.vue
        updateTaskParams(context) {
            const data = {
                project_id: context.rootState.project.current_project.project_id,
                task_id: context.state.current_task.task_id,
                params: context.state.current_params,
            }
            console.log(data)
            api.put('/api/task/update_params/', data)
                .then(() => {
                    context.dispatch('getProjectTasks')
                    context.state.current_params.change = false
                })
        },
        
        // ProjectSelect.vue
        getProjectTasks(context) {
            const project_id = context.rootState.project.current_project.project_id
            const config = {
                params: {project_id: project_id}
            }
            api.get("/api/task/front_project_tasks/", config).then((res) => {
                // console.log('get project tasks')
                // console.log(res.data)
                context.state.task_tree = res.data.task_tree;
                context.state.project_tasks = res.data.tasks;
                context.state.new_task_id = res.data.new_task_id;
                context.state.project_status = res.data.project_status;
            }).catch((err) => {
                console.log(err);
            });
        },
        // SelectMethod.vue
        saveTask(context, task) {
            const data = {
                project_id: context.rootState.project.current_project.project_id,
                tasks: [task,],
            }
            console.log(data)
            api.post("/api/task/load_tasks/", data).then(() => {
                context.state.current_params = {}
                context.dispatch("getProjectTasks");
            });
        },
        // NewTask.vue
        deleteTask(context) {
            const config = {
                params: {
                    project_id: context.rootState.project.current_project.project_id,
                    task_id: context.state.current_task.task_id,
                }
            }
            api.delete('/api/task/delete_tasks/', config)
                .then(()=>{
                    context.commit('clearTask')
                    context.dispatch("getProjectTasks");
                })
        },
        // TaskRelations.vue
        saveTaskParents(context) {
            const task_id = context.state.current_task.task_id
            const data = {
                project_id: context.rootState.project.current_project.project_id,
                child: task_id,
                parents: context.state.current_parents[task_id],
            }
            api.post('/api/task_tree/update_task_parents/', data)
                .then(()=>{
                    context.dispatch("getProjectTasks");
                })
        },
        // RNAseqHeader.vue
        executeTasks(context) {
            const config = {
                params: {
                    project_id: context.rootState.project.current_project.project_id,
                }
            }
            endpoint.get('/celery_tasks/execute_tasks', config)
                .then((res)=>{
                    console.log(res.data.task_id)
                })
        },
    }
})