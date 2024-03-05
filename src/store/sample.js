import { api } from "./api";


export default ({
    state: () => ({
      // mounted at app.vue
      study_names: [],

      // LoadSamples.vue:
      // they are data before saved into db
      new_study_name: "",
      loaded_samples: [],
        
      // BrowseStudySamples.vue, ParseSamples.vue
      current_study: {},
      // BrowseStudySamples.vue
      study_samples: [],


        seq_ends: "two_ends",

        raw_data_count: 0,
        unparsed_data: [],
    }),
    getters: {},
    mutations: {
      initCurrentStudy(state) {
        state.current_study = {
          study_name: null,
          reg: "<S>",
        }
      },
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
      // deleteSample(state, sample) {
      //     state.samples = state.samples.filter((el) => {
      //       const is_sample =
      //         el.sample_name == sample.sample_name && el.R1_file == sample.R1_file;
      //       return is_sample ? 0 : 1;
      //     });
      // },
      updateParseSamples(state, key_val) {
          state.parse_samples[key_val[0]] = key_val[1];
      },
      removeUnparsedData(state, index) {
          state.unparsed_data = state.unparsed_data.filter((el,i) => {
            return index !== i;
          });
      },

        
    },
    actions: {
      // app.vue, used in InjectData.vue
      getStudy(context) {
        api
          .get("/sample/front_study/")
          .then((res) => {
            context.state.study_names = res.data.study_names;
            context.commit('initCurrentStudy');
          })
          .catch((err) => {
            console.log(err);
          });
      },
      // LoadSamples.vue
      postLoadedSamples(context) {
          const data = context.state.loaded_samples.map((el) => {
            let meta = Object.assign({}, el);
            delete meta.sample_name;
            return {
              study_name: context.state.new_study_name,
              sample_name: el.sample_name,
              metadata: meta,
            };
          });
          api.post("/sample/load_samples/", data)
            .then((res) => {
              context.dispatch("getStudy");
              context.state.loaded_samples = [];
              context.state.new_study_name = "";
              console.log(res)
            })
            .catch((err) => {
              console.log(err);
            });
      },
      // BrowseStudySamples.vue
      getStudySamples(context) {
        const config = {
          params: {
            study_name: context.state.current_study.study_name,
          }
        }
        api.get("/sample_file/study_files/", config)
          .then((res) => {
            context.state.study_samples = res.data;
          });
      },
      // BrowseSample.vue
      deleteStudySamples(context) {
        const config = {
          params: {
            study_name: context.state.current_study.study_name,
          }
        }
        api
          .delete("/sample/delete_study_samples/", config)
          .then(() => {
            context.dispatch('getStudy');
          });
      },

      // ParseSamples.vue
      getUnparsedData(context) {
        const config = {
          params: context.state.current_study,
        };
        console.log(config.params);
        api.get("/sample_file/unparsed_data/", config)
          .then((res) => {
            context.state.unparsed_data = res.data;
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