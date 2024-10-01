const express = require('express')
const userController = require('../Controllers/UserController')
const blogController = require('../Controllers/BlogController')

const route = express.Router()
const jwtMiddleware = require('../Middleware/jwt')

route.post('/register', userController.register);
route.post('/login', userController.login);

route.get('/all-blogs', blogController.getAllBlogs)
route.post('/add-blog', jwtMiddleware, blogController.addBlog)
route.get('/get-user-blogs', jwtMiddleware, blogController.getUserBlogs)
route.patch('/edit-blog/:id', jwtMiddleware, blogController.editBlog)
route.delete('/delete-blog/:id', jwtMiddleware, blogController.deleteBlog)

module.exports = route