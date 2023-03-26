import React, { Component } from 'react';

import { save } from '../storage.js';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import FormCss from '../Form/Form.module.css';

export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  addContacts = e => {
    e.preventDefault();
    const { name, number } = this.state;
    const newUser = {
      id: nanoid(),
      name,
      number,
    };
    if (this.props.onSubmit(newUser)) {
      this.setState({ name: '', number: '' });
      save('contacts', newUser);
    } else this.setState({ name: '' });
  };

  render() {
    return (
      <form onSubmit={this.addContacts} className={FormCss.form}>
        <div className={FormCss.input__contacts}>
          <label className={FormCss.input__item}>
            Name
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={this.handleNameChange}
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
            />
          </label>

          <label className={FormCss.input__item}>
            Number
            <input
              type="tel"
              name="number"
              value={this.state.number}
              onChange={this.handleNameChange}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
            />
          </label>
          <button type="submit" className={FormCss.input__btn}>
            Add contact
          </button>
        </div>
      </form>
    );
  }
}

ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
