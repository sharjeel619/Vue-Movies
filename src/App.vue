<template>
  <Header />
  <router-view />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import Header from '@/components/Header.vue'
export default defineComponent({
  components: {
    Header
  },
  props: {
    msg: String,
  },
});
</script>

<style lang="scss">
</style>
