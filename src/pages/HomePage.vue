<template>
  <BlogForm />
  <div v-for="blog in blogs" :key="blog.id">
    <BlogCard :blog="blog" />
  </div>
</template>

<script>
import { computed, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { blogsService } from '../services/BlogsService.js';
import { AppState } from '../AppState.js'
import ModalWrapper from '../components/ModalWrapper.vue';

export default {
  setup() {
    onMounted(() => {
      getBlogs();
    });
    async function getBlogs() {
      try {
        await blogsService.getBlogs();
      }
      catch (error) {
        Pop.error(error);
      }
    }
    return {
      blogs: computed(() => AppState.blogs)
    };
  },
}
</script>

<style scoped lang="scss"></style>
