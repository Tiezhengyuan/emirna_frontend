import { api, endpoint } from "./api";


export default ({
    state: () => ({
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
      
    }),
    getters: {
          data_source(state) {
            return {
              name: "data_source",
              label: "Data source of genome",
              value: "",
              options: state.data_sources.map((el) => {
                return { value: el, label: el, };
              }),
            };
          },
          specie_group(state) {
            return {
              name: "group",
              label: "Group of organism",
              value: "",
              options: state.specie_groups.map((el) => {
                return { value: el, label: el, };
              }),
            };
          },
          specie(state) {
            const options = state.species.map((el) => {
              return { value: el, label: el, };
            });
            return {
              name: "specie",
              label: "Specie",
              options: options,
            };
          },
          version(state) {
            const options = state.versions.map((el) => {
              return { value: el, label: el, };
            });
            return {
              name: "version",
              label: "Genome version",
              options: options,
            };
          },
          ready_genome(state) {
            const options = state.ready_genomes.map((el) => {
              return {
                value: el.id,
                label: `${el.specie}_${el.data_source}_${el.version}`,
              };
            });
            return {
              name: "genome",
              label: "Genome",
              required: true,
              options: options,
            };
          },
        
          new_specie(state) {
            const options = state.new_species.map((el) => {
              return {
                value: el,
                label: el,
              };
            });
            return {
              name: "specie",
              label: "Specie",
              options: options,
            };
          },
        
                
    },
    mutations: {
        setGenomes(state, data) {
            state.genomes = data;
        },
        updateNewGenome(state, key_val) {
            state.new_genome[key_val[0]] = key_val[1];
        },
    },
    actions: {
        getDataSources(context) {
            api
              .get("./genome/data_sources/")
              .then((res) => {
                context.state.data_sources = res.data.names;
              })
              .catch((err) => {
                console.log(err);
              });
          },
          getGenomes(context) {
            const config = {
              params: { is_ready: 'True' },
            };
            api
              .get("./genome/", config)
              .then((res) => {
                context.state.ready_genomes = res.data;
              })
              .catch((err) => {
                console.log(err);
              });
          },
          getSpecieGroups(context) {
            api
              .get("./specie/group_names/")
              .then((res) => {
                context.state.specie_groups = res.data.names;
              })
              .catch((err) => {
                console.log(err);
              });
          },
          getSpecies(context) {
            const config = {
              params: {
                group: context.state.new_genome.group,
              },
            };
            api
              .get("./specie/", config)
              .then((res) => {
                context.state.species = res.data.map((el) => {
                  return el.organism_name;
                });
              })
              .catch((err) => {
                console.log(err);
              });
          },
          getVersions(context) {
            const config = {
              params: {
                data_source: context.state.new_genome.data_source,
                group: context.state.new_genome.group,
                specie: context.state.new_genome.specie,
              },
            };
            api
              .get("./genome/", config)
              .then((res) => {
                context.state.versions = res.data.map((el) => {
                  return el.version;
                });
              })
              .catch((err) => {
                console.log(err);
              });
          },
        
          postReference(context, data) {
            console.log(data);
            api
              .post("/reference/", data)
              .then((res) => {
                console.log(res);
                window.location.reload();
              })
              .catch((err) => {
                console.log(err);
              });
          },
        
          // asynchronization
          requestNewGenome(context) {
            const config = {
              params: context.state.new_genome,
            };
            endpoint
              .get("/celery_tasks/download_genome/", config)
              .then((res) => {
                console.log(res);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        
    }
})