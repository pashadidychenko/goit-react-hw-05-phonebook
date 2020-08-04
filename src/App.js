import React from "react";
import PropTypes from "prop-types";
import MainTitle from "./components/Title/MainTitle/MainTitle";
import ContactList from "./components/Contacts/ContactList/ContactList";
import { AddContact } from "./components/Contacts/AddContact/AddContact";
import FindContact from "./components/Contacts/FindContact/FindContact";
import {
  sendStoregData,
  getStoregData,
} from "./components/Services/LocalStoreg";
import { CSSTransition } from "react-transition-group";
import popTransition from "./components/Contacts/transitions/pop.module.css";
import slideTitleTransition from "./components/Contacts/transitions/slideTitle.module.css";
import alertTransition from "./components/Contacts/transitions/alert.module.css";
import styles from "./styles.module.css";
import Alert from "./components/Alet/Alert";

class App extends React.Component {
  state = {
    contacts: [],
    filter: "",
    inOn: false,
    exist: false,
  };

  componentDidMount() {
    this.setState({ contacts: getStoregData() });
    this.setState({ inOn: true });
  }

  componentDidUpdate() {
    sendStoregData(this.state.contacts);
  }

  addContacts = (contact) => {
    contact.name = contact.name.replace(/\b\w/g, (l) => l.toUpperCase());
    if (
      this.state.contacts.find(
        (element) => element.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      this.setState({ exist: true });
      return setTimeout(() => {
        this.setState({ exist: false });
      }, 2000);
    } else {
      this.setState((prevState) => ({
        contacts: prevState.contacts.concat([contact]),
      }));
    }
  };

  filterContact = (e) => {
    let element = e.target.value;
    this.setState({ filter: element });
  };

  filteredContact = () => {
    if (this.state.filter) {
      return this.state.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
      );
    } else {
      return this.state.contacts;
    }
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { contacts, inOn, exist } = this.state;
    return (
      <div className={styles.maineContainer}>
        <div className={styles.subContainer}>
          <CSSTransition
            in={inOn}
            timeout={500}
            classNames={slideTitleTransition}
            unmountOnExit
          >
            <MainTitle />
          </CSSTransition>
          <AddContact onFormSubmit={this.addContacts} />
          <CSSTransition
            in={contacts.length > 1}
            timeout={250}
            classNames={popTransition}
            unmountOnExit
          >
            <FindContact filterContact={this.filterContact} />
          </CSSTransition>
          <ContactList
            contactList={this.filteredContact()}
            deleteContact={this.deleteContact}
          />
        </div>
        <CSSTransition
          in={exist}
          timeout={250}
          classNames={alertTransition}
          unmountOnExit
        >
          <Alert />
        </CSSTransition>
      </div>
    );
  }
}

export default App;

App.propTypes = {
  contacts: PropTypes.array,
  filter: PropTypes.string,
  inOn: PropTypes.bool,
  exist: PropTypes.bool,
};
