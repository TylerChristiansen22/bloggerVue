<template>
    <div v-if="profile" class="container-fluid">
        <section class="row">
            <div class="cover-img">
                <div class="col-12 d-flex">
                    <img class="profile-pic ms-5 mt-1" :src="profile.picture" :alt="profile.name">
                    <p class="mt-5 ms-2 fs-3">{{ profile.name }}</p>
                </div>
                <div class="col-6 ms-5 card">
                    <p>{{ profile.bio }}</p>
                </div>
            </div>
            <div v-for="blog in blogs" :key="blog.id" class="col-12">
                <BlogCard :blog="blog" />
            </div>
        </section>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import Pop from '../utils/Pop.js';
import { profilesService } from '../services/ProfilesService.js';
import { useRoute, useRouter } from 'vue-router';
import { blogsService } from '../services/BlogsService.js';
export default {
    setup() {
        onMounted(() => {
            getProfileById();
            getBlogsByProfileId()
        })
        const route = useRoute()
        async function getBlogsByProfileId() {
            try {
                await blogsService.getBlogsByProfileId(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        async function getProfileById() {
            try {
                await profilesService.getProfileById(route.params.profileId)
            } catch (error) {
                Pop.error(error)
            }
        }
        return {
            blogs: computed(() => AppState.blogs),
            profile: computed(() => AppState.activeProfile),
            account: computed(() => AppState.account),
            coverImg: computed(() => `url(${AppState.activeProfile?.coverImg})`)
        }
    }
};
</script>


<style lang="scss" scoped>
.profile-pic {
    height: 200px;
    width: 200px;
    border-radius: 100%;
    object-fit: cover;
    object-position: center;
}

.cover-img {
    background-image: v-bind(coverImg);
    background-size: cover;
    background-position: center;
}
</style>