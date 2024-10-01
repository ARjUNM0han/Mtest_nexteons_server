const blogs = require('../Model/Blog')
const jwt = require('jsonwebtoken')


exports.getAllBlogs = async (req, res) => {
    try {
        const allBlogs = await blogs.find().populate('author', 'username')
        res.status(200).json(allBlogs)
    } catch (error) {
        res.status(400).json(error)
    }
}

exports.addBlog = async (req, res) => {
    const { title, content, description } = req.body
    try {
        const existingBlog = await blogs.findOne({ title })
        if (existingBlog) {
            res.status(406).json('Blog Already Added!!')
        } else {
            const newBlog = new blogs({
                title, description, content, author: req.payload
            })
            await newBlog.save()
            res.status(201).json(newBlog)
        }
    } catch (error) {
        console.log(error)
        res.status(400).json(400)
    }
}



exports.getUserBlogs = async (req, res) => {
    const userId = req.payload
    try {
        const userBlogs = await blogs.find({ author: userId }).populate('author', 'name')
        res.status(200).json(userBlogs)
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving blogs', error })
    }
}
exports.editBlog = async (req, res) => {
    const { title, content, description } = req.body
    try {
        const existingBlog = await blogs.findByIdAndUpdate({ _id: req.params.id }, {
            title,
            content,
            description
        })

        await existingBlog.save()
        res.status(200).json(existingBlog)
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }
}
exports.deleteBlog = async (req, res) => {
    const { id } = req.params
    try {
        const deleteBlog = await blogs.findByIdAndDelete({ _id: id })
        res.status(200).json('blog deleted successfully')
    } catch (error) {
        console.log(error)
        res.status(400).json(error)
    }

}