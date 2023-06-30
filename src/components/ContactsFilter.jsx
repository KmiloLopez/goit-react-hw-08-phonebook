import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { filterByName } from 'redux/filterbyName/slice';
import { useEffect } from 'react';

const ContactsFilter = () => {
  const [filter, setFilter] = useState('');

  const dispatch = useDispatch();
  const handleChange = e => {
    setFilter(e.target.value);
  };
  useEffect(() => {
    dispatch(filterByName(filter));
  }, [filter, dispatch]);

  return (
    <>
      <div>Filter by name</div>
      <input type="text" name="filter" value={filter} onChange={handleChange} />
    </>
  );
};
export default ContactsFilter;