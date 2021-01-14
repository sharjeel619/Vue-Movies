<template>
  <div class="movie-list-container">
    <div class="movie-list">
      <MovieCard
        v-for="(item) in moviesData"
        :key="item.imdbID"
        :movieData="item"
        :hideBookmarkIcon="hideIcon"
      />
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent
} from "vue";
import MovieCard from "@/components/MovieCard.vue";
import { MovieDataInterface } from "@/interfaces/global";
export default defineComponent({
  name: "MovieListGrid",
  props: {
    moviesData: {
      type: Array as () => Array<MovieDataInterface>
    },
    hideIcon: {
      type: Boolean
    }
  },
  components: {
    MovieCard,
  },
});
</script>
<style lang="scss" scoped>
.movie-list-container {
  margin: 0 auto;
  overflow: hidden;
  max-width: 1440px;
  .movie-list {
    display: grid;
    grid-gap: 1rem;
    grid-template-columns: repeat(auto-fill, minmax(15rem, 1fr));
  }
}
</style>