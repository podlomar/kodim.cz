import React, { FormHTMLAttributes, useActionState, type JSX } from "react";
import styles from "./styles.module.scss";

interface Props {
  action?: FormHTMLAttributes<HTMLFormElement>["action"];
  children: React.ReactNode;
}

const Form = ({ action, children }: Props): JSX.Element => {
  return (
    <form className={styles.form} action={action}>
      {children}
    </form>
  );
};

const Fields = ({ children }: Props): JSX.Element => {
  return (
    <div className={styles.fields}>
      {children}
    </div>
  );
}

const Controls = ({ children }: Props): JSX.Element => {
  return (
    <div className={styles.controls}>
      {children}
    </div>
  );
}

Form.Fields = Fields;
Form.Controls = Controls;

export default Form;
