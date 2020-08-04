import React from "react";
import styles from "./Alert.module.css";

const Alert = () => {
  return (
    <div className={styles.alert}>
      <p>Контакт з таким іменем вже існує</p>
    </div>
  );
};

export default Alert;
