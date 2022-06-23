import PropTypes from 'prop-types';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import s from './Form.module.css';

export default function Form({ onAddContact }) {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const nameId = nanoid();
  const phoneId = nanoid();

  const handleInputChange = e => {
    setId(() => {
      return nanoid();
    });

    switch (e.currentTarget.name) {
      case 'name':
        setName(e.currentTarget.value);
        break;
      case 'number':
        setNumber(e.currentTarget.value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAddContact({ id, name, number });
    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
    setId('');
  };

  return (
    <>
      <form
        name="signup_form"
        autoComplete="on"
        onSubmit={handleSubmit}
        className={s.form}
      >
        <div className={s.container}>
          <label htmlFor={nameId} className={s.label}>
            Name
            <input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={handleInputChange}
              id={nameId}
              className={s.input}
            />
          </label>
          <label htmlFor={phoneId} className={s.label}>
            Number
            <input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={handleInputChange}
              id={phoneId}
              className={s.input}
            />
          </label>
          <button type="submit" className={s.button}>
            Add contact
          </button>
        </div>
      </form>
    </>
  );
}

Form.propTypes = {
  onAddContact: PropTypes.func.isRequired,
};
