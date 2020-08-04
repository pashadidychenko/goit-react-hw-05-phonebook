import React from "react";
import MainTitle from "./components/Title/MainTitle/MainTitle";
import ContactList from "./components/Contacts/ContactList/ContactList";
import { AddContact } from "./components/Contacts/AddContact/AddContact";
import FindContact from "./components/Contacts/FindContact/FindContact";
import {
  sendStoregData,
  getStoregData,
} from "./components/Services/LocalStoreg";
import styles from "./styles.module.css";

class App extends React.Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    this.setState({ contacts: getStoregData() });
  }

  componentDidUpdate() {
    sendStoregData(this.state.contacts);
  }

  addContacts = (contact) => {
    if (
      this.state.contacts.find(
        (el) => el.name.toLowerCase() === contact.name.toLowerCase()
      )
    ) {
      alert("Контакт з таким іменем вже існує");
    } else {
      this.setState((prevState) => ({
        contacts: prevState.contacts.concat([contact]),
      }));
    }
  };

  filterContact = (e) => {
    let ele = e.target.value;
    this.setState({ filter: ele });
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
    return (
      <div className={styles.maineContainer}>
        <div className={styles.subContainer}>
          <MainTitle />
          <AddContact onFormSubmit={this.addContacts} />
          <FindContact filterContact={this.filterContact} />
          <ContactList
            contactList={this.filteredContact()}
            deleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;

App.propTypes = {};
