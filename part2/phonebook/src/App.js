import { useState, useEffect } from "react";
import "./App.css";
import phonebookService from "./services/persons";

const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const Person = (props) => {
  return (
    <div>
      <p style={{ margin: 0 }}>
        {props.name}
        <br />
        {props.number}
      </p>
    </div>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    phonebookService
      .getAll()
      .then((initialPhonebook) => {
        setPersons(initialPhonebook);
      })
      .catch((error) => {
        setErrorMessage(
          "No se pudieron obtener los datos del servidor, intentelo de nuevo más tarde"
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  }, []);

  // Cambiar el telefono del id recibido
  const changePhoneNumber = (id) => {
    // Obtenemos el objeto persona con el id recibido
    const person = persons.find((n) => n.id === id);
    // Creamos un nuevo objeto con el contenidoo de la persona obtenida cambiando al nuevo telefono
    const changedPerson = { ...person, number: newPhone };

    // Hacemos un update de esa persona
    phonebookService
      .update(id, changedPerson)
      .then((updatedPerson) => {
        //  Actualiamos el estado de personas para actualizar la lista en el browser si la persona no es el id proporcionado entonces lo dejamos igual
        // Si es igual entonces lo cambiamos por updatedPerson (objeto qu regresa la funcion update)
        setPersons(
          persons.map((person) => (person.id !== id ? person : updatedPerson))
        );
      })
      .catch((error) => {
        setErrorMessage(`El contacto ya fue eliminado, actualizando lista.`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.filter((n) => n.id !== id));
      });
  };

  const addPerson = (event) => {
    event.preventDefault();
    if (newName === "" || newPhone === "") {
      alert(`Fill the two inputs`);
    } else {
      if (persons.filter((person) => person.name === newName).length > 0) {
        if (
          window.confirm(
            `${newName} ya esta en la lista de contactos, ¿Desea reemplazar el numero actual con ${newPhone}?`
          )
        ) {
          // Obtener el id de la persona que se va a cambiar el numero
          changePhoneNumber(
            persons.filter((person) => person.name === newName)[0].id
          );
        }
      } else {
        const personObject = {
          name: newName,
          number: newPhone,
        };

        phonebookService
          .create(personObject)
          .then((returnedPhonebook) => {
            // Hay que recordar siempre que se debe de crear un nuevo objeto
            // no modificar el objeto que esta en persons. Concat crea uno
            // y despues hacemos el set
            setPersons(persons.concat(returnedPhonebook));
            setNewName("");
            setNewPhone("");
          })
          .catch((error) => {
            setErrorMessage(error.response.data.error);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };
  const handleNumberChange = (event) => {
    setNewPhone(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  // Función para filtrar las personas en base al filtro de búsqueda
  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const handlePersonDeleted = (id) => {
    if (
      window.confirm(
        `¿Desea eliminar a ${
          persons.filter((person) => person.id === id)[0].name
        }?`
      )
    ) {
      phonebookService
        .deletePerson(id)
        .then(() => {
          // Eliminación exitosa, ahora obtener la lista actualizada
          phonebookService.getAll().then((initialPhonebook) => {
            setPersons(initialPhonebook);
          });
        })
        .catch((error) => {
          setErrorMessage("El contacto ya fue eliminado, actualizando lista.");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <Notification message={errorMessage} />
      <div>
        {/* Hacer la busqueda aqui */}
        filter shown whit a
        <input value={filter} onChange={handleFilterChange} />
      </div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name:
          <input
            id="name"
            value={newName}
            placeholder="Your name"
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            id="number"
            value={newPhone}
            placeholder="Enter the phone number"
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {/* Mostrar personas filtradas */}
      {filteredPersons.map((person) => (
        <div
          key={person.id}
          style={{ display: "flex", marginBottom: 30 + "px", gap: 20 + "px" }}
        >
          <Person name={person.name} number={person.number} />
          <Button
            handleClick={() => handlePersonDeleted(person.id)}
            text="Delete person"
          />
        </div>
      ))}
    </div>
  );
};

export default App;
