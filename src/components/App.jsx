import React, { Component } from 'react';
import { save, load } from './storage.js';
import AppCss from '../components/App.module.css';
import { ContactForm } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './Contacts/Contacts';

export class App extends Component {
  state = {
    // contacts: [
    //   { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //   { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //   { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //   { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    // ],
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    if (load('ContactsArray') === null) {
      return [];
    }

    const readLocalStorage = load('ContactsArray');
    if (readLocalStorage.length > 0) {
      if (this.state.contacts.length === 0) {
        return this.setState({ contacts: readLocalStorage });
      }
      return 'Contacts not empty';
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      console.log('Contacts added succesfuly');
      save('ContactsArray', contacts);
    }
  }

  onSubmitHandler = data => {
    const { name } = data;
    if (this.state.contacts.find(elem => elem.name === name)) {
      alert(`${name} is already existing`);
      return false;
    } else {
      this.setState(prevState => {
        return {
          contacts: [...prevState.contacts, data],
        };
      });
      return true;
    }
  };

  deleteContacts = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  findByName = e => {
    const { value } = e.currentTarget;
    return this.setState({ filter: value });
  };
  sortingName = () => {
    if (this.state.filter === '') {
      if (this.state.contacts.length === 0) {
        return [];
      }
      return this.state.contacts;
    }
    return this.state.contacts.filter(({ name }) => name.toLowerCase().includes(this.state.filter.toLowerCase()));
  };

  render() {
    const sortingName = this.sortingName();
    return (
      <div className={AppCss.component}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitHandler} />
        <h2>Contacts</h2>
        <Filter onChange={this.findByName} />
        <ContactList options={sortingName} onDelete={this.deleteContacts} />
      </div>
    );
  }
}
