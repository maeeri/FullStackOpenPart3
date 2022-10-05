import { useState, useEffect } from 'react'
import PersonForm from './components/PersonForm'
import Input from './components/Input'
import PersonList from './components/PersonList'
import personService from './services/persons'
import './index.css'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setNewSearch] = useState('')
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    getPersons()
  }, [message])


  const addPerson = (event) => {
    event.preventDefault()

    if (persons.every(person => person.name.toLowerCase() !== newName.toLowerCase())) {
      const personObject = {
      name: newName,
      number: newNumber
      }
      personService.create(personObject)
      setPersons(persons.concat(personObject))
      setMessage(`${personObject.name} added`)
        errorTimeOut()
      console.log(personObject)
      getPersons()
    }
    else {
      updatePerson()
    }
    setNewName('')
    setNewNumber('')
    getPersons()
  }

  const updatePerson = () => {
    if (window.confirm(`${newName} is already in the phonebook. Would you like to update the number?`)) {
      const personObject = {
        name: newName,
        number: newNumber
        }

      const person = persons.find(person => person.name === newName)

      if (person !== (undefined || null)) {
        personService
        .update(person.id, personObject)
        .then(returnedPersons => {
          setPersons(returnedPersons)
          setMessage(`${person.name} updated`)
          errorTimeOut()
        })
      } else {
        handleError(`${person.name} has already been removed from the phonebook`)
      }
      
    }
    setNewName('')
    getPersons()
  }

  const getPersons = () => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
       })
  }

  const errorTimeOut = () => {
    setTimeout(() => {
      setMessage(null)
    }, 3000)
  }

  const handleError = msg => {
    handleErrorChange()
    setMessage(msg)
    errorTimeOut()
    handleErrorChange()
  }

  const handlePersonChange = (event) => {
      setNewName(event.target.value)
    };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  function deletePerson(id) {
    let person = persons.find(person => person.id === id)
    if(window.confirm(`Are you sure you want to delete ${person.name}?`))
    {
      if (person !== (undefined || null)) {
        personService.deleteEntry(id)
        .then(returnedPersons => {
          setPersons(persons.concat(returnedPersons))
          console.log(returnedPersons)
        })
        setMessage(`${person.name} deleted`)
        errorTimeOut()
      } else {
        handleError(`${person.name} has already been removed from the phonebook`)
      }
    }
    getPersons()
  }

  const handleErrorChange = () => {
    setError(!error)
  }

  const showPersons = Object.values(persons).filter(person => 
    typeof person.name === 'string' && typeof search === 'string' 
      ? person.name.toLowerCase().includes(search.toLowerCase()) 
      : '')
    
  return (
    <div className="phonebook">
      <h2>Phonebook</h2>
      <Notification type={error} message={message} />
      <table>
        <tbody>
          <Input name='filter' term={search} action={handleSearchChange} />
        </tbody>
      </table>
      <h2>Add new contact</h2>
        <PersonForm submit={addPerson} nameTerm={newName} numberTerm={newNumber} nameAction={handlePersonChange} numberAction={handleNumberChange} />
      <h2>Numbers</h2>
        <PersonList showPersons={showPersons} handleClick={deletePerson} />
      </div>
  )
}

export default App
