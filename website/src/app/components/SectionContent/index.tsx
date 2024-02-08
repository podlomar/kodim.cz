import React from "react"
import { Section } from "kodim-cms/esm/content/section";
import ReactHast from 'app/components/ReactHast';
import Exercises from 'app/components/Exercises';
import "highlight.js/scss/gml.scss";

interface Props {
  section: Section,
}

const SectionContent = ({ section }: Props): JSX.Element => {
  return (
    <>
      { section.blocks.map((block) => (
        block.type === 'hast'
          ? <ReactHast root={block.root} />
          : <Exercises excs={block.excs} />
      ))}
    </>
  );
};

export default SectionContent;
