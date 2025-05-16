const UserDto = require('../dto/user-dto')
const RoomModel = require('../models/room-model')
const UserModel = require('../models/user-model')
const { handleServerError } = require('../utils/error-debug')

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


class UserController {
    async register(req, res) {
        const { phone, name, password } = req.body

        try {
            if (!phone | !name | !password) {
                return res.status(400).json({
                    error: 'Все поля обязательны'
                })
            }

            const condidate = await UserModel.findOne({ phone })

            if (condidate) {
                return res.status(400).json({
                    error: "Пользователь уже существует"
                })
            }
            const hashedPass = await bcrypt.hash(password, 5)
            const user = await UserModel.create({
                name, 
                phone, 
                password: hashedPass,
                role: 'user'
            })

            res.send(user)

        } catch (error) {
            handleServerError(res, error, 'register')
        }
    }
    async login(req, res) {
        const { phone, password } = req.body

        try {
            const user = await UserModel.findOne({ phone })
            if (!user) {
                return res.status(400).json({ error: 'Неверный логин или пароль' })
            }
            const isPassValid = await bcrypt.compare(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({ error: 'Неверный логин или пароль' })
            }
            const userDto = new UserDto(user)
            const token = jwt.sign({ ...userDto }, process.env.JWT_SECRET)
            res.send({
                user: userDto,
                token
            })
        } catch (error) {
            handleServerError(res, error, 'login')
        }
    }
}

module.exports = new UserController()