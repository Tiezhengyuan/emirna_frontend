import { api } from "./api";


export default ({
    state: () => ({
        current_user: {},
        new_project_owner: '',
    }),
    getters: {

    },
    mutations: {
        setCurrentUser(state, user) {
            state.current_user = {
              username: user.username,
              groups: user.groups,
              id: user.id,
              email: user.email,
            };
        },
        setNewProjectOwner(state) {
            state.new_project_owner = state.current_user.id;
        }
    },
    actions: {
        getCurrentUser(context) {
            api
              .get("/user/current/")
              .then((res) => {
                context.commit("setCurrentUser", res.data);
              })
              .catch((err) => {
                console.log(err);
              });
          },
        
    }
})