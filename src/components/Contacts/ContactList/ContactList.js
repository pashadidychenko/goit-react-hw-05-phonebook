import React from "react";
import ContactListItem from "../ContactListItem/ContactListItem";
import PropTypes from "prop-types";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import styles from "./ContactList.module.css";
import slideTransition from "../transitions/slide.module.css";

const ContactList = ({ contactList, deleteContact }) => {
  return (
    <TransitionGroup component="ul" className={styles.contactList}>
      {contactList.map((contact) => (
        <CSSTransition
          key={contact.id}
          timeout={250}
          classNames={slideTransition}
        >
          <ContactListItem
            deleteContact={() => deleteContact(contact.id)}
            contact={contact}
            key={contact.id}
          />
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default ContactList;

ContactList.propTypes = {
  contactList: PropTypes.array,
};
