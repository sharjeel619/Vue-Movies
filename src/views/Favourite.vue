<template>
  <section class="favourite">
    <MovieListGrid :moviesData="favMovies" :hideIcon="true" v-if="favMovies.length" />
    <div class="no-data-msg" v-else>
      <h2>No movies added yet!</h2>
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from 'vuex'
import MovieListGrid from '@/components/MovieListGrid.vue'
import { MovieDataInterface } from "@/interfaces/global";
export default defineComponent({
  name: "MovieCard",
  components: {
    MovieListGrid
  },
   setup() {
    const store = useStore()
    let localData = computed(() => store.getters.movies).value
    let favMovies: MovieDataInterface[] = []
    Object.keys(localData).forEach((item) => {
      favMovies.push(localData[item])
    })
    return {
      favMovies
    }
  },
})
</script>
<style lang="scss" scoped>
  .favourite {
    margin-top: 75px;
    padding: 0 16px;
  }
</style>
