const { response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

const PORT = 3000
app.listen(PORT)
console.log(`Server is running on port ${PORT}`)

let persons = [
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
}

app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/', (req, res) => {
    res.json(persons)
})

app.get('/', (req, res) => {
    res.send('<h1 style="text-align:center">Welcome</h1>')
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(p => p.id !== id)
    res.status(204).end()
})

app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)

    if (!body.name || !body.number) {
        res.status(400).json({
            error: 'not a valid contact'
        })
    }

    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }


    if (persons.every(p => p.name !== newPerson.name )) {
        persons = persons.concat(newPerson)
        res.json(newPerson)
    } else {
        res.status(400).json({
            error: 'person already in the phonebook'
        })
    }
})