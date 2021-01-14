<template>
  <header>
    <nav>
      <router-link to="/">
        <img src="../assets/images/logo1.jpg" lazy="true" />
      </router-link>
      <div class="routes">
        <router-link to="/">Home</router-link>
        <router-link to="/favourites">Favourites</router-link>
      </div>
    </nav>
    <section class="banner">
      <h1 class="title">Search your favorite movies</h1>
      <div class="search-bar" v-if="showSearchBar">
        <img src="../assets/images/search.svg" alt="Search Icon" width="15" @click="searchMovie" />
        <input placeholder="Search movies by title.." autofocus @input="setInputVal" @keyup.enter="searchMovie" />
      </div>
    </section>
    
  </header>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, watch} from "vue"
import { useRoute } from 'vue-router'
export default defineComponent({
  name: "Header",
  setup() {
    let searchInput = ref('')
    let showSearchBar = ref(true)
    const route = useRoute()
    const internalInstance = getCurrentInstance()
    const emitter = internalInstance?.appContext.config.globalProperties.$emitter

    function setInputVal(e: any) {
      searchInput.value = e.target.value
    }

    function searchMovie() {
      emitter.emit('searchQuery', searchInput.value)
    }

    watch(() => route.path, () => {
      showSearchBar.value = route.path.includes('favourites') ? false : true
    })

    return {
      emitter,
      setInputVal,
      searchMovie,
      showSearchBar
    }
  },
});
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
$searchBarHeight: 50px;
header {
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 24px;
    @media (max-width: $xs) {
      padding: 6px 12px; 
    }
    img {
      width: 100px;
    }
    .routes {
      a {
        &:not(:last-child) {
          margin-right: 16px;
        }
        font-size: 17px;
        &.router-link-active {
          border-bottom: 1px dashed $textColor;
        }
      }
    }
  }
  .banner {
    display: flex;
    align-items: center;
    justify-content: center;
    background: $beige;
    height: 275px;
    position: relative;
    @media (max-width: $xs) {
      height: 225px; 
    }
    .title {
      font-size: 36px;
      font-weight: 600;
      margin: 0 16px;
      @media (max-width: $xs) {
        font-size: 28px;    
      }
    }
    .search-bar {
      position: absolute;
      bottom: -25px;
      width: 400px;
      background-color: #fff;
      border: 1px solid #fafafa;
      box-shadow: 0 5px 6px 3px rgba(200,200,200, .2);
      border-radius: 50px;
      display: flex;
      align-items: center;
      transition: .2s all ease-in-out;
      @media (max-width: $xs) {
        width: 90vw;    
      }
      &:hover, &:focus {
        box-shadow: 0 7px 6px 3px rgba(200,200,200, .4);
      }
      img {
        cursor: pointer;
        margin-left: 16px;
      }
      input {
        border-color: transparent;
        width: 100%;
        height: $searchBarHeight;
        outline: none;
        border-radius: 50px;
        font-size: 16px;
        padding: 0 15px 0 12px;
      }
    }
  }
}
</style>
