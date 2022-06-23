import Form from 'components/Form/Form';
import Section from 'components/Section/Section';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { useState, useEffect } from 'react';
import initialContacts from './initialContacts.json';

export default function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const contactsJSON = localStorage.getItem('contacts');
    const contacts = JSON.parse(contactsJSON);
    if (contacts !== initialContacts || contacts) {
      if (contacts !== null) {
        setContacts(contacts);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const contactHandler = contact => {
    if (uniqueContactValidator(contact) === true) {
      return;
    }
    setContacts(prev => {
      return [...prev, contact];
    });
  };

  const uniqueContactValidator = newContact => {
    if (
      contacts.some(
        contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
      )
    ) {
      window.alert(`'${newContact.name}' is already in contacts`);
      return true;
    }
  };

  const filterHandler = e => {
    setFilter(e.currentTarget.value);
  };

  const deleteHandler = id => {
    setContacts(() => {
      return contacts.filter(contact => contact.id !== id);
    });
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  return (
    <>
      <Section title="Phonebook">
        <Form onAddContact={contactHandler} />
      </Section>
      <Section title="Contacts">
        <Filter queryValue={filter} onFilter={filterHandler} />
        <ContactList contacts={filteredContacts} onDelete={deleteHandler} />
      </Section>
    </>
  );
}
