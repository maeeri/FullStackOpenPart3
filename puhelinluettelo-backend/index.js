const { req, res } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const { default: mongoose } = require('mongoose')

const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, req, res, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return res.status(400).send({ error: 'malformatted id' })
    }

    if (error.name === 'ReferenceError') {
        return res.status(400).send({ error: 'not a valid contact' })
    }

    next(error)
}

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


app.get('/info', (req, res) => {
    const date = new Date()
    Person.find({})
    .then(people => {
        res.send(`<p>Phonebook has info for ${people.length} people</p><p>${date}</p>`)
    })
    .catch(error => next(error))
})

app.get('/api/people/', (req, res) => {
    Person.find({}).then(people => {
        res.json(people)
    })
})
  
app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center">Welcome</h1>')
})

app.get('/api/people/:id', (req, res) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
})

app.delete('/api/people/:id', (req, res) => {
    Person.findByIdAndRemove(req.params.id)
        .then(result => {
            res.status(204).end()
        })
        .catch(error => next(error))
})

app.post('/api/people', (req, res, next) => {
    const body = req.body

    if (body.name === undefined || body.number === undefined) {
        next(error)
    }

    const person = new Person({
        name: body.name,
        number: body.number
    })

    person.save().then(sPerson => {
        res.json(sPerson)
    })

})

app.put('/api/people/:id', (req, res, next) => {
    const body = req.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(req.params.id, person, {new: true})
        .then(uPerson => {
            res.json(uPerson)
        })
        .catch(error => next(error))
})

app.use(unknownEndpoint)
app.use(errorHandler)