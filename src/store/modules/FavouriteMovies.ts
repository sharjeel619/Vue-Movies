import { MovieDataInterface } from "@/interfaces/global"
export default {
  state: () => ({
    movies: {}
  }),
  getters: {
    movies: (state: any) => state.movies
  },
  mutations: {
    addFavouriteMovie: (state: any, data: MovieDataInterface) => {
      state.movies[data.imdbID] = data
    },
    removeFavouriteMovie: (state: any, id: number) => {
      delete state.movies[id]
    }
  },
  actions: {
    addMovie: (context: any, data: any) => {
      context.commit('addFavouriteMovie', data)
    },
    removeMovie: (context: any, data: any) => {
      context.commit('removeFavouriteMovie', data)
    }
  }
}