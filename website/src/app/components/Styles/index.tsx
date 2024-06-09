import React from "react";

interface Props {
  css: string[];
}

const Styles = ({ css }: Props): JSX.Element => {  
  return (
    <>
      {css.map((style, index) => (
        <style key={index} dangerouslySetInnerHTML={{ __html: style }} />
      ))}
    </>
  );
};

export default Styles;
