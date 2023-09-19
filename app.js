const express = require("express")
const models = require('./models')

const app = express()

app
    .use(express.urlencoded({ extended: false }))
    .use(express.json())
    .post('/register', (req, res) => {
        const { email, password } = req.body
        const { User } = models

        console.log(req.body)
        
        User.create({ email, password })
            .then((result) => {
                console.log(result)
                return res.status(201).send({
                    'status-code': 201,
                    'email': email,
                    'message': "Berhasil registrasi!!!",
                    'id': result.id
                })
        })
        .catch((e) => {
            console.log(e)
            res.status(400).send(e.errors)
        })
    })

module.exports = app