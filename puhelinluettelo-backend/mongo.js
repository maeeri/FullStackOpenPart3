const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
  })

const password = process.argv[2]
const url = `mongodb+srv://maeeri:${password}@cluster0.ejlhw9v.mongodb.net/puhelinluettelo?retryWrites=true&w=majority`
const Person = mongoose.model('Person', personSchema)

mongoose.connect(url, () => {
    if (process.argv.length > 3) {
        const person = new Person({
            name: process.argv[3],
            number: process.argv[4]
        })

        person.save().then(result => {
            console.log(`added ${person.name} number ${person.number} to phonebook`)
        mongoose.connection.close()
        })
    } else {
        Person.find({}).then(res => {
            res.forEach(person => {
              console.log(person)
            })
            mongoose.connection.close()
          })
    }
})