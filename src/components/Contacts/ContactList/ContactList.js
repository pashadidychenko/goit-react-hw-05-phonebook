import React from "react";
import ContactListItem from "../ContactListItem/ContactListItem";
import PropTypes from "prop-types";
import styles from "./ContactList.module.css";

const ContactList = ({ contactList, deleteContact }) => {
  return (
    <ul className={styles.contactList}>
      {contactList.map((contact) => (
        <ContactListItem
          deleteContact={() => deleteContact(contact.id)}
          contact={contact}
          key={contact.id}
        />
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contactList: PropTypes.array,
};
