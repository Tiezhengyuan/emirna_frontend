export default {
  raw_data_count: 0,
  // project_id: "P0001",
  seq_ends: "two_ends",
  loaded_samples: [],
  new_study_name: "",
  current_study_name: "",
  study_names: [],
  project_samples: [],
  unparsed_data: [],
  unassigned_sample_files: [],
  parse_samples: {
    study_name: "",
    reg: "<S>",
  },
  samples: [
    {
      sample_name: "sample1",
      R1_file: "//P001//sample1_1_R1.fq",
      R2_file: "//P001//sample1_1_R2.fq",
    },
    {
      sample_name: "sample1",
      R1_file: "//P001//sample1_2_R1.fq",
      R2_file: "//P001//sample1_2_R2.fq",
    },
    {
      sample_name: "sample2",
      R1_file: "F:raw\\sample2_1_R1.fq",
      R2_file: "F:raw\\sample2_1_R2.fq",
    },
    {
      sample_name: "sample2",
      R1_file: "F:raw\\sample2_2_R1.fq",
      R2_file: "F:raw\\sample2_2_R2.fq",
    },
  ],

    // build new reference
    data_sources: [],
    specie_groups: [],
    species: [],
    genomes: [],
    versions: [],
    new_genome: {},
  
    ready_genomes: [],
    current_ref: {
      data_source: "",
      specie: "",
    },
};
