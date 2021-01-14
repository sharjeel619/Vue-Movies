import { createStore } from 'vuex'
import FavouriteMovies from './modules/FavouriteMovies'
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})
export default createStore({
  modules: {
    FavouriteMovies
  },
  plugins: [vuexLocal.plugin]
})
