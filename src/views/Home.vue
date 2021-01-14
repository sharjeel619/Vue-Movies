<template>
  <section class="home">
    <MovieListGrid :moviesData="movieList" v-if="movieList.length" />
    <div class="no-data-msg" v-if="!showLoader && !movieList.length">
      <h2>No data found!</h2>
    </div>
    <div class="loader-container" ref="loaderRef">
      <img src="../assets/images/loader.svg" width="100" v-if="showLoader" />
    </div>
  </section>
</template>
<script lang="ts">
import { defineComponent, toRefs, reactive, onMounted, computed, getCurrentInstance } from 'vue'
import { useStore } from 'vuex'
import MovieListGrid from '@/components/MovieListGrid.vue'
import { MovieDataInterface, MovieDataResponseInterface } from '@/interfaces/global'
import {getMoviesList, getSearchResults} from '@/api/api'
export default defineComponent({
  name: 'Home',
  components: {
    MovieListGrid
  },
  setup() {
    const store = useStore()
    const internalInstance = getCurrentInstance()
    const emitter = internalInstance?.appContext.config.globalProperties.$emitter
    let observerOptions = {
      root: null,
      rootMargin: "50px",
      threshold: .1,
    }
    let observer:IntersectionObserver
    const dataProperties = reactive({
      movieList: [] as MovieDataInterface[],
      showLoader: false as boolean,
      page: 0 as number,
      totalCount: 0 as number,
      searchQuery: '' as string,
      favouriteMovies: computed(() => store.getters.movies) as any,
    })

    function onSearch() {
      emitter.on('searchQuery', (searchVal: string) => {
        dataProperties.searchQuery = searchVal
        dataProperties.movieList = []
        dataProperties.page = 0
        fetchMovieData()
      })
    }

    function observerCB(elements: any) {
      const {isIntersecting} = elements[0]
      if (dataProperties.showLoader || !isIntersecting || dataProperties.movieList.length >= dataProperties.totalCount) return
      fetchMovieData()
    }

    function bindInfiniteScroll() {
      observer = new IntersectionObserver(observerCB, observerOptions)
      let loaderRef = document.querySelector('.loader-container') as Element
      observer.observe(loaderRef)
    }

    async function fetchMovieData() {
      try {
        dataProperties.page++
        dataProperties.showLoader = true
        let getMovieData: MovieDataResponseInterface = dataProperties.searchQuery.length ? await getSearchResults(dataProperties.searchQuery, dataProperties.page) : await getMoviesList(dataProperties.page)
        dataProperties.totalCount = getMovieData.total
        let movieData = getMovieData.data.map((item: MovieDataInterface) => ({...item, isBookmarked: dataProperties.favouriteMovies[item.imdbID]}))
        dataProperties.movieList = [...dataProperties.movieList, ...movieData]
      }
      catch(e) {
        console.error(e)
      }
      finally {
        dataProperties.showLoader = false
      }
    }

    onMounted(() => {
      fetchMovieData()
      bindInfiniteScroll()
      onSearch()
    })

    return {
      ...toRefs(dataProperties)
    }
  }
})

</script>
<style lang="scss" scoped>
.home {
  margin-top: 75px;
  padding: 0 16px;
  .loader-container {
    display: flex;
    justify-content: center;
    margin: 50px 16px;
  }
}
</style>