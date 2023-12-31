import { useDispatch, useSelector } from 'react-redux';

import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/contacts/operations';
import ContactsFilter from 'components/ContactsFilter';
import AddContact from 'components/AddContact/AddContact';
import { Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ContactsList = () => {
  const {contacts} = useSelector(state => state.contacts);
  const filteredbyName = useSelector(state => state.filter.filter);
  const { token } = useSelector(state => state.auth); ////////////o {token}
  const dispatch = useDispatch();
  // const {isLoading} = useSelector(state =>state.contacts)

  useEffect(() => {
    
    dispatch(fetchContacts(token));
  }, [dispatch,token]);

  const handleDelete = (contactId) =>{
    console.log("contactId", contactId);
    console.log("token", token);
    dispatch(deleteContact({contactId,token}))
  }
  
  return (
    <ul>
      <AddContact/>
      <ContactsFilter />
      <h1>{filteredbyName}</h1>
      {contacts ? (contacts
        .filter(contact => contact.name.toLowerCase().includes(filteredbyName))

        .map(contact => (
          <li key={contact.id}>
            {contact.name} : {contact.number}
            <Chip
        label=""
        onClick={()=>handleDelete(contact.id)}
        onDelete={()=>handleDelete(contact.id)}
        deleteIcon={<DeleteIcon/>}
        variant="outlined"
      />
            
          </li>
        ))):(<h2>Let's add the firts contact</h2>)
      
        }
    </ul>
  );
};

export default ContactsList;

