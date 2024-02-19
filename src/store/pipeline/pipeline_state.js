export default {
  current_user: {},
  // project
  projects: [],
  next_project_id: "",
  current_project: {},
  current_updated_project: {},
  deleted_projects: [],
  current_project_files: [],
  updated_project: {},
  // task
  current_task: {},
  celery_tasks: [],


  // constant objects
  new_project: {
    project_name: "",
    description: "",
    sequencing: null,
    status: "A",
    genome: null,
    study_name: "",
  },
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
};
