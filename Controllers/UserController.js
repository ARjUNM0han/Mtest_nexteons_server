const users = require('../Model/User')
const jwt = require('jsonwebtoken')

exports.register = async (req, res) => {
    const { username, email, password } = req.body
    try {
        const existingUser = await users.findOne({ email })
        if (!existingUser) {
            const newUser = new users({
                username, password, email
            })
            await newUser.save()
            res.status(201).json(newUser)
        } else {
            res.status(404).json("User Alredy exists")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await users.findOne({ email })
        if (user) {
            if (user.password == password) {
                const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
                res.status(200).json({ token, username: user.username })
            } else {
                res.status(404).json('email/password incorrect')
            }
        } else {
            res.status(404).json(user)
        }
    } catch (error) {
        res.status(404).json(error)
    }
}
