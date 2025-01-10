import React from 'react';
import InfoBox from '../InfoBox';

interface Props {
  course?: boolean;
}

const CzechitasInfo = ({ course = false }: Props): JSX.Element => {
  return (
    <InfoBox icon="czechitas">
      {course ? (
        <>
          <p>Tento kurz je vytvořen pro neziskovou organizaci <a href="https://www.czechitas.cz">Czechitas</a>, jejíž cílem je otevírat ženám svět informačních technologií.</p>
          <p>Na kurz je možné se přihlásit na <a href="https://www.czechitas.cz">webu Czechitas</a>.</p>
        </>
      ) : (
        <p>Následující kurzy jsou vytvořeny pro neziskovou organizaci <a href="https://www.czechitas.cz">Czechitas</a>, jejíž cílem je otevírat ženám svět informačních technologií.</p>
      )}
    </InfoBox>
  );
};

export default CzechitasInfo;
