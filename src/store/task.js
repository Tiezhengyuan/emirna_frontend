import { api } from "./api";


export default ({
    state: () => ({
        current_task: {},
        celery_tasks: [],

        new_task_id: 10,
        task_methods: [
          { task_method: "sequence alignment", component: "AlignerBowtie" },
          { task_method: "genome alignment", component: "AlignerTophat" },
          { task_method: "genome assembly", component: "AssemblerCufflinks" },
          { task_method: "Count reads", component: "CountReads" },
          { task_method: "trim sequence", component: "TrimSeq" },
          { task_method: "quality control", component: "" },
        ],
        tasks: [
          {
            project: "P001",
            task_method: "Trim sequence",
            status: "pending",
            parent_task: "",
            task_id: 9,
          },
        ],
      
    }),
    getters: {

    },
    mutations: {
        refreshProjectTasks(state) {
            state.tasks = state.tasks.filter((el) => {
              return el.project == state.current_project ? 0 : 1;
            });
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
        
    },
    actions: {
        getProjectTasks(context, project_id) {
            api.get("/task/", ).then((res) => {
              console.log(res, context, project_id);
            }).catch((err) => {
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