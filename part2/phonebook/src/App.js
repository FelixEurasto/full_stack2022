import { useEffect, useState } from "react";
import personService from './services/persons'


const SearchFilter = ({ filter, onChange }) => {
  return (
    <form>
        <div>
          filter shown with:{" "}
          <input value={filter} onChange={onChange} />
        </div>
      </form>
  )
}

const AddPeopleForm = ({ onSubmit, nameValue, numberValue, onChangeName, onChangeNumber }) => {
  return (
  <form onSubmit={onSubmit}>
        <div>
          name: <input value={nameValue} onChange={onChangeName} />
        </div>
        <div>
          number: <input value={numberValue} onChange={onChangeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
  </form>
  )
}

const RenderPerson = ({ person, deletePerson }) => {
  return (
    <li className="person">
      {person.name} {person.number}
      <button onClick={deletePerson}>{'delete'}</button>
    </li>
  )
}

const SuccessNotification = ({ message }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className="success">
        <p>{message}</p>
      </div>
    )
  }
}


const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [successMessage, setSuccessMesssage] = useState(null)

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    setNewFilter(event.target.value);
  };

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    };

    let found = false;
    let toChangeId = -1
    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name === newName) {
        found = true;
        toChangeId = persons[i].id
        console.log(toChangeId)
      }
    }
    if (found) {
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        personService
      .changePersonNumber(toChangeId, personObject)
      .then(response => {
        setPersons(persons.map(person => person.id !== toChangeId ? person : response))
      })
      setSuccessMesssage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMesssage(null)
        }, 3000)
      }

    } else {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setSuccessMesssage(`Added ${newName}`)
        setTimeout(() => {
          setSuccessMesssage(null)
        }, 3000)
      })
    }
  };

  const deletePerson = (id) => {
    personService
    .delete(id)
    .then(response => {
      setPersons(persons.filter(person => person.id != id))
    })
  }

  const personsToShow = (newFilter.length == 0)
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessNotification message={successMessage}/>
      <SearchFilter filter={newFilter} onChange={handleFilterChange}/>
      <AddPeopleForm nameValue={newName} numberValue={newNumber}
        onSubmit={addPerson} onChangeName={handleNameChange} onChangeNumber={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person) => (
          <RenderPerson key={person.id} person={person} deletePerson={() => deletePerson(person.id)}/>
        ))}
    </ul>
    </div>
  );
};

export default App;
