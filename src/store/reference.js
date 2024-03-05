import { api, endpoint } from "./api";


export default ({
  state: () => ({
      // determined by actions: getGenomes()
      data_sources: [],
      ready_genomes: [],
      specie_groups: [],
      group_species:{},
      version_genomes: {},
      
      species: [],
      genomes: [],
      versions: [],
      new_genome: {},
    
      type_rnas: {},
      rna_types: [],
      current_reference: {},
  }),
  getters: {
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
    initNewGenome(state) {
      state.new_genome = {
        'group_name': '',
        'data_source': '',
        'specie_name': '',
        'version': null,
      }
    },
    updateCurrentReference(state, pair) {
      state.current_reference[pair[0]] = pair[1];
      // console.log(state.current_reference)
    },
  },
  actions: {
    // App.vue
    getGenomes(context) {
      api
        .get("./genome/front_genomes/")
        .then((res) => {
          context.state.data_sources = res.data.data_sources;
          context.state.ready_genomes = res.data.ready_genomes;
          context.state.specie_groups = res.data.specie_groups;
          context.state.group_species = res.data.group_species;
          context.state.version_genomes = res.data.version_genomes;
        });
    },
    // download genome, asynchronization
    requestNewGenome(context) {
      const config = {
        params: context.state.new_genome,
      };
      console.log(config)
      endpoint.get("/celery_tasks/download_genome/", config)
        .then(() => {
          context.commit('initNewGenome');
        });
    },
    
    // select RNA for build index
    getTypeRNAs(context) {
      api
        .get("./rna/type_rnas/")
        .then((res) => {
          context.state.type_rnas = res.data;
          context.state.rna_types = Object.keys(res.data).map((el) => {
            return {text: el, value: el}
          })
        })
        .catch((err) => {
          console.log(err);
        });
    },


    //?? 
    postReference(context, data) {
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
  },
})