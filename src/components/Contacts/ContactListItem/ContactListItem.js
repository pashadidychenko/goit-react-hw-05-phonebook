import React from "react";
import PropTypes from "prop-types";
import styles from "./ContactListItem.module.css";

const ContactListItem = ({ contact, deleteContact }) => {
  return (
    <li data-id={contact.id} className={styles.contactListItem}>
      <h4>{contact.name}:</h4>
      <h4>{contact.number}</h4>
      <button type="button" onClick={deleteContact}>
        x
      </button>
    </li>
  );
};

export default ContactListItem;

ContactListItem.propTypes = {
  contact: PropTypes.object,
};
