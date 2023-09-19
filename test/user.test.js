const request = require('supertest')

const { User } = require('../models')
const app = require('../app')

const newUser = {
    email: "swandewi@gmail.com",
    password: "password"
}

afterAll((done) => {
    console.log(process.env.NODE_ENV)
    User.destroy({ truncate: true })
        .then(() => done())
        .catch(err => done(err))
})

describe('Register cases', () => {
    // base case(s)
    test('SUCCESS - Register a new user', (done) => {
        request(app)
            .post('/register')
            .send({...newUser})
            .end((err, res) => {
                if (err) throw err
                expect(res.status).toBe(201)
                expect(res.body).toHaveProperty('status-code', expect.any(Number))
                expect(res.body).toHaveProperty('message', expect.any(String))
                expect(res.body).toHaveProperty('id', expect.any(Number))
                expect(res.body).toHaveProperty('email', expect.any(String))
                done()
        })
    })  

    // edge case(s)
    test('ERROR = Invalid email format', (done) => {
        request(app)
            .post('/register')
            .send({ ...newUser, email: 'budiman.com' })
            .end((err, res) => {
                const errors = ['Invalid email format']
                if (err) throw err
                
                expect(res.status).toBe(400)
                expect(res.body).toHaveProperty('errors', expect.any(Array))
                expect(res.body.errors).toEqual(expect.arrayContaining(errors))
                done()
        })
    })
})