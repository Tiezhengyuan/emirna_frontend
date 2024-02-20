import { api } from "./api";


export default ({
    state: () => ({
        // load samples
        new_study_name: "",
        // 
        loaded_samples: [],
        current_study_name: "",
        study_names: [],
        
        // browse study samples
        study_samples: [],

        seq_ends: "two_ends",

        raw_data_count: 0,
        unparsed_data: [],


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
              
    }),
    getters: {
        study_name() {
            return {
              name: "study_name",
              label: "Study name",
              value: "",
            };
          },
        input_study_names(state) {
            return {
              name: "study_name",
              label: "Study name",
              value: "",
              options: state.study_names.map((el) => {
                return {
                  value: el,
                  label: el,
                };
              }),
            }
        },
        sample_name_reg(state) {
            return {
              name: "reg",
              label: "RegExpression",
              value: state.parse_samples.reg,
            };
        },

    },
    mutations: {
        setNewStudyName(state, study_name) {
            state.new_study_name = study_name;
        },
        addStudyName(state, data) {
            state.study_names.push(data);
        },
        setLoadedSamples(state, sample_content) {
            state.loaded_samples = [];
            let names = sample_content[0].split(",");
            names = ["sample_name", ...names.slice(1)];
            state.loaded_samples.names = names;
            for (let r = 1; r < sample_content.length; r++) {
                const values = sample_content[r].split(",");
                const item = Object.fromEntries(
                    names.map((name, i) => {
                        return [name, values[i]];
                    })
                );
                state.loaded_samples.push(item);
            }
        },
        deleteSample(state, sample) {
            state.samples = state.samples.filter((el) => {
              const is_sample =
                el.sample_name == sample.sample_name && el.R1_file == sample.R1_file;
              return is_sample ? 0 : 1;
            });
        },
        updateParseSamples(state, key_val) {
            state.parse_samples[key_val[0]] = key_val[1];
        },
        setUnparsedData(state, data) {
            data.sort((a, b) => {
              const a_name = a.sample_name.toUpperCase();
              const b_name = b.sample_name.toUpperCase();
              let cmp = 0;
              if (a_name < b_name) {
                cmp = -1;
              } else if (a_name > b_name) {
                cmp = 1;
              } else {
                const a_batch = a.batch_name.toUpperCase();
                const b_batch = b.batch_name.toUpperCase();
                if (a_batch < b_batch) {
                  cmp = -1;
                } else if (a_batch > b_batch) {
                  cmp = 1;
                }
              }
              return cmp;
            });
            state.unparsed_data = data;
        },
        removeUnparsedData(state, index) {
            state.unparsed_data = state.unparsed_data.filter((el,i) => {
              return index !== i;
            });
        },

        
    },
    actions: {
        // locad study 
        postLoadedSamples(context) {
            console.log(context.state.loaded_samples)
            const data = context.state.loaded_samples.map((el) => {
              let meta = Object.assign({}, el);
              delete meta.sample_name;
              return {
                study_name: context.state.new_study_name,
                sample_name: el.sample_name,
                metadata: meta,
              };
            });
            api
              .post("/sample/load_samples/", data)
              .then(() => {
                context.dispatch("getStudyNames");
                context.state.loaded_samples = [];
                context.state.new_study_name = "";
              })
              .catch((err) => {
                console.log(err);
              });
        },
        // browse study and study samples
        getStudySamples(context, study_name) {
            const config = {study_name: study_name}
            // TODO api filter is not working
            api
              .get("/sample/", config)
              .then((res) => {
                context.state.current_study_name = study_name
                context.state.study_samples = res.data.filter(
                    (el) => el.study_name == study_name
                );
              })
              .catch((err) => {
                console.log(err);
              });
        },
        getStudyNames(context) {
            api
              .get("/sample/study_names/")
              .then((res) => {
                context.state.study_names = res.data.study_names;
                context.state.study_name = "";
              })
              .catch((err) => {
                console.log(err);
              });
        },


        // 
        getStudyFiles(context, study_name) {
            const config = {
              params: {study_name: study_name},
            };
            api
              .get("/sample_file/study_files/", config)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          },
          detectUnparsedData(context) {
            const config = {
              params: context.state.parse_samples,
            };
            console.log(config.params);
            api
              .get("/sample_file/unparsed_data/", config)
              .then((res) => {
                context.commit("setUnparsedData", res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          },

        parseSampleFiles(context) {
            const data = context.state.unparsed_data.map((el) => {
              return {
                sample: el.sample_id,
                raw_data: el.raw_data_id,
              };
            });
            api
              .post("/sample_file/parse_sample_files/", data)
              .then(() => {
                context.state.unparsed_data = [];
              })
              .catch((err) => {
                console.log(err);
              });
        },
        getRawDataCount(context) {
            api
                .get("/raw_data/count/")
                .then((res) => {
                context.state.raw_data_count = res.data.count;
                })
                .catch((err) => {
                console.log(err);
                });
        },

    }
})