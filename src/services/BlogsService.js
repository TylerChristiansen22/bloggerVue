import { AppState } from "../AppState.js"
import { Blog } from "../models/Blog.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"



class BlogsService {
    async getBlogs() {
        AppState.blogs = []
        let res = await api.get('api/blogs')
        logger.log(res.data)
        AppState.blogs = res.data.map(blog => new Blog(blog))
    }

    async getBlogsByProfileId(profileId) {
        AppState.blogs = []
        const res = await api.get(`api/blogs?creatorId=${profileId}`)
        logger.log(res.data)
        AppState.blogs = res.data.map(blog => new Blog(blog))
    }

    async createBlog(blogData) {
        const res = await api.post('api/blogs', blogData)
        const newBlog = new Blog(res.data)
        AppState.blogs.unshift(newBlog)
        return newBlog
    }
}

export const blogsService = new BlogsService