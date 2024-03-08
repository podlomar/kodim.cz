import React from 'react';
import Icon from '../Icon';
import styles from './styles.module.scss';

interface Props {
  course?: boolean;
  outboundLink?: string | null;
}

const CzechitasIntro = (
  { course = false, outboundLink = null}: Props
): JSX.Element => {
  return (
    <div className={styles.czechitasIntro}>
      <Icon className={styles.czechitasIcon} name="czechitas" size="5rem" />
      <div>
        {course ? (
          <>
            <p>Tento kurz je vytvořen pro neziskovou organizaci <a href="https://www.czechitas.cz">Czechitas</a>, jejíž cílem je otevírat ženám svět informačních technologií.</p>
            <p>Na kurz je možné se přihlásit na <a href={outboundLink ?? "https://www.czechitas.cz"}>webu Czechitas</a>.</p>
          </>
        ) : (
          <p>Následující kurzy jsou vytvořeny pro neziskovou organizaci <a href="https://www.czechitas.cz">Czechitas</a>, jejíž cílem je otevírat ženám svět informačních technologií.</p>
        )}
      </div>
    </div>
  );
};

export default CzechitasIntro;
