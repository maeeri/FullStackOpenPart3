const { response } = require('express')
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const { default: mongoose } = require('mongoose')

const app = express()

app.use(cors())
app.use(express.static('build'))

app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms - :body'))

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

let people = []

/*[
    { 
        id: 1,
        name: 'Arto Hellas', 
        number: '040-123456' 
    },
    { 
        id: 2,
        name: 'Ada Lovelace', 
        number: '39-44-5323523' 
    },
    { 
        id: 3,
        name: 'Dan Abramov', 
        number: '12-43-234345' 
    },
    { 
        id: 4,
        name: 'Mary Poppendieck', 
        number: '39-23-6423122' 
    }]

const generateId = () => {
    return Math.floor(Math.random() * 25000)
}*/

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for a number of people</p><p>${date}</p>`)
})

app.get('/api/people/', (req, res) => {
    Person.find({}).then(people => {
        console.log(res)
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

    /*const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }*/
})

app.delete('/api/people/:id', (req, res) => {
    const id = Number(req.params.id)
    people = people.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/people', (req, res) => {
    const body = req.body
    //console.log(body)

    if (body.name === undefined || body.number === undefined) {
        res.status(400).json({
            error: 'not a valid contact'
        })
    }

    const person = {
        name: body.name,
        number: body.number
    }


    if (people.every(p => p.name !== person.name )) {
        person.save().then(sPerson => {
            res.json(sPerson)
        })
    } else {
        res.status(400).json({
            error: 'person already in the phonebook'
        })
    }
})