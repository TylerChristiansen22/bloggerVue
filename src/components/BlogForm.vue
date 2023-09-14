<template>
    <form class="component row m-5" @submit.prevent="createBlog">
        <div class="col-6 mb-2">
            <input v-model="blogData.title" type="text" class="form-control" placeholder="title?">
        </div>
        <div class="col-6">
            <input v-model="blogData.imgUrl" type="text" class="form-control" placeholder="imgUrl?">
        </div>
        <div class="col-12">
            <textarea v-model="blogData.body" type="text" class="form-control" placeholder="body?"></textarea>
        </div>
        <div class="col-4">
            <button class="btn btn-primary">Create Blog</button>
        </div>
    </form>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import Pop from '../utils/Pop.js';
import { blogsService } from '../services/BlogsService.js';
export default {
    setup() {
        const blogData = ref({})
        return {
            blogData,
            async createBlog() {
                try {
                    await blogsService.createBlog(blogData.value)
                    blogData.value = {}
                } catch (error) {
                    Pop.error(error)
                }
            }

        }
    }
};
</script>


<style lang="scss" scoped></style>