import React, { Component } from 'react';
import AppCss from '../components/App.module.css';

import { ContactForm } from './Form/Form';
import { Filter } from './Filter/Filter';
import { ContactList } from './Contacts/Contacts';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    // contacts: [],
    filter: '',
  };

  onSubmitHandler = data => {
    const { name, number } = data;
    if (this.state.contacts.find(elem => elem.name === name)) {
      return alert(`${name} is already exists in contacts`);
    }
    if (this.state.contacts.find(elem => elem.number === number)) {
      return alert(`${number} is already exists`);
    }
    return this.setState(prevState => {
      return { contacts: [...prevState.contacts, data] };
    });
  };

  deleteContacts = id => {
    // console.log(id);
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  findByName = e => {
    const { value } = e.currentTarget;
    const find = this.state.contacts.filter(({ name }) => name.toLowerCase().includes(value.toLowerCase()));
    this.setState({ filter: find });
  };

  render() {
    return (
      <div className={AppCss.component}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.onSubmitHandler} />
        <h2>Contacts</h2>
        <Filter options={this.state.contacts} onChange={this.findByName} />
        {this.state.filter ? (
          <ContactList options={this.state.filter} onDelete={this.deleteContacts} />
        ) : (
          <ContactList options={this.state.contacts} onDelete={this.deleteContacts} />
        )}
      </div>
    );
  }
}