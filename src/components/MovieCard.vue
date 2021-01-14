<template>
  <figure class="movie-card">
    <div class="image-container"></div>
    <div class="info">
      <p>{{ data.Title }}</p>
      <div class="bottom-info">
        <span>{{ data.Year }}, {{ data.imdbID }}</span>
        <span></span>
      </div>
    </div>
    <div class="bookmark" @click="onBookmarkClick" v-if="!hideBookmarkIcon">
      <!-- Normally I use icons -->
      <img src="../assets/images/bookmark-fill.png" v-if="movieData.isBookmarked" />
      <img src="../assets/images/bookmark.png" v-else />
    </div>
  </figure>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { MovieDataInterface } from '@/interfaces/global'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'MovieCard',
  props: {
    movieData: {
      type: Object as () => MovieDataInterface,
      required: true
    },
    hideBookmarkIcon: {
      type: Boolean
    }
  },
  setup(props) {
    const store = useStore()
    let data = ref(props.movieData)

    let saveMovieBookmark = (movie: MovieDataInterface) => store.dispatch('addMovie', movie)
    let removeMovieBookmark = (id: string) => store.dispatch('removeMovie', id)
    
    function onBookmarkClick() {
      data.value.isBookmarked = !data.value.isBookmarked
      if (data.value.isBookmarked) {
        saveMovieBookmark(data.value)
      }
      else {
        removeMovieBookmark(data.value.imdbID)
      }
    }
    return {
      data,
      onBookmarkClick
    }
  },
});
</script>

<style lang="scss" scoped>
.movie-card {
  width: 200px;
  margin: 0 auto 24px auto;
  border-radius: 6px;
  position: relative;
  .image-container {
    background: #eee;
    min-height: 250px;
    transition: .2s all ease-in-out;
    box-shadow: 0 0 6px 2px rgba(200, 200, 200, 0.5);
    &:hover {
      box-shadow: 0 0 8px 2px rgba(200,200,200, .7);
    }
  }
  .info {
    padding: 0 6px 0 4px;
    p {
      text-align: left;
      font-size: 14px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bottom-info {
      display: flex;
      justify-content: space-between;
      span {
        opacity: .7;
      }
    }
  }
  .bookmark {
    position: absolute;
    top: 4px;
    right: 4px;
    cursor: pointer;
  }
}
</style>
