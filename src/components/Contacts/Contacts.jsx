import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import { ContactsItem } from '../Contacts/Contacts_item';
import ContactCss from './Contacts.module.css';

export const ContactList = ({ options, onDelete }) => (
  <ul className={ContactCss.contact}>
    {options.map(({ id, name, number }) => (
      <ContactsItem name={name} id={id} key={nanoid()} number={number} onDelete={onDelete} />
    ))}
  </ul>
);

ContactList.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};
