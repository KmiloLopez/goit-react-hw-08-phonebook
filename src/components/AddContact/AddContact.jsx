import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import { addContact, fetchContacts } from 'redux/contacts/operations';

/* import PropTypes from 'prop-types'; */

const AddContact = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [validated, setValidated] = useState(true);
  const contacts = useSelector(state => state.contacts.contacts);
  const { token } = useSelector(state => state.auth);

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };
  useEffect(() => {
    if (name && number) {
      setValidated(false);
    }
  }, [name, number]);

  const handleSubmit = e => {
    e.preventDefault();
    console.log('map contacts', contacts); // undefined
    
    const finder = contacts ? (contacts.map(contact => {
      if (contact.name === name) {
        const vary = 'true';
        return vary;
      }

      return false;
    })):([false])
    
    
    if (finder.find(findtrue => findtrue === 'true')) {
      alert('Contact already in the list');
    } else {
      const userInfo = { name, number };
      dispatch(
        addContact({
          userInfo,
          token,
        })
      );
      dispatch(fetchContacts(token))
      alert('Contact Successfully Added to the contact list');
    }

    setValidated(true);
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };
  return (
    <form onSubmit={handleSubmit}>
      <h2>Add new Contact</h2>
      <p>Name</p>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        value={name}
        onChange={handleChange}
      />
      <p>Number</p>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        value={number}
        onChange={handleChange}
      />
      <button type="submit" disabled={validated}>
        Add contact
      </button>
    </form>
  );
};

export default AddContact;
/* AddContact.propTypes = {
  name: PropTypes.string,
  number: PropTypes.number
} */
