import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/contacts/operations';
import ContactsFilter from 'components/ContactsFilter';

const ContactsList = () => {
  const contacts = useSelector(state => state.contacts.contacts);
  const filteredbyName = useSelector(state => state.filter.filter);
  const { token } = useSelector(state => state.auth); ////////////o {token}
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts(token));
  }, [dispatch, token]);

  return (
    <ul>
      <ContactsFilter />
      <h1>{filteredbyName}</h1>
      {contacts ? (contacts
        .filter(contact => contact.name.toLowerCase().includes(filteredbyName))

        .map(contact => (
          <li key={contact.id}>
            {contact.name} : {contact.phone}
            <button
              onClick={() => {
                dispatch(deleteContact(contact.id));
              }}
            >
              delete
            </button>
          </li>
        ))):(console.log("no hay contactos todavia"))
      
        }
    </ul>
  );
};

export default ContactsList;
/* 
 */
