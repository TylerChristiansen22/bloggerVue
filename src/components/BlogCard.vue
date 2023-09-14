<template>
    <section class="row justify-content-center">
        <div class="col-10 card bg-primary text-dark my-2 elevation-2 overflow">
            <div class="row">
                <div class="col-9">
                    <RouterLink :to="{ name: 'Profile', params: { profileId: blog.creatorId } }">
                        <img class="profile-pic" :src="blog.creator.picture" :alt="blog.creator.name">
                        <p>{{ blog.creator.name }}</p>
                    </RouterLink>
                    <p>{{ blog.title }}</p>
                    <p>{{ blog.body }}</p>
                    <p>{{ blog.createdAt }}</p>
                </div>
                <div class="col-3">
                    <img class="img-sizing p-0 rounded" :src="blog.imgUrl" :alt="blog.title">
                </div>
                <div v-if="blog.creatorId == account.id">
                    <button @click="deleteBlog" class="btn btn-danger">Delete Post</button>
                </div>
            </div>
        </div>
    </section>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Blog } from '../models/Blog.js';
import { RouterLink } from 'vue-router';
import Pop from '../utils/Pop.js';
import { blogsService } from '../services/BlogsService.js';
export default {
    props: { blog: { type: Blog, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            async deleteBlog() {
                try {
                    if (await Pop.confirm('Are you sure you want to delete this blog post?')) {
                        const blogId = props.blog.id
                        await blogsService.deleteBlog(blogId)
                        Pop.success('Deleted Blog!')
                    }
                } catch (error) {
                    Pop.error(error)
                }
            }
        };
    },
    components: { RouterLink }
};
</script>


<style lang="scss" scoped>
.img-sizing {
    height: 100%;
    width: 100%;
    object-fit: cover;
    object-position: center;
}

.profile-pic {
    height: 50px;
    width: 50px;
    border-radius: 50em;
    object-fit: cover;
    object-position: center;
}

.overflow {
    overflow: hidden;
}
</style>