import Router from "express"
import * as blogService from './blog.service.js'
const router = Router()
// create blogs
router.post('/create',blogService.createBlog)
// update blog
router.patch('/:id',blogService.updateBlog)
// delete blog
router.delete('/:id',blogService.deleteBlog)
// get all blogs
router.get('/',blogService.getAllBlogs)
// get blog by id
router.get('/:id',blogService.getBlogById)

export default router