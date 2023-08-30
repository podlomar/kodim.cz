import { ReactNode, createElement, Fragment } from 'react';
import { Root, ElementContent } from 'hast';
import Figure from './components/Figure';
import Term from './components/Term';

type ComponentMap = { [TagName: string]: React.FunctionComponent<any> };

const componentMap: ComponentMap = {
  'fig': Figure,
  'term': Term,
};

const processElementContent = (elementContent: ElementContent): ReactNode => {
  if (elementContent.type === 'comment') {
    return null;
  }

  if (elementContent.type === 'text') {
    return elementContent.value;
  }

  const { tagName, properties, children } = elementContent;
  if (tagName in componentMap) {
    const Component = componentMap[tagName];
    return createElement(
      Component, properties, ...children.map(processElementContent)
    );
  }

  return createElement(
    tagName,
    properties,
    ...children.map(processElementContent),
  );
};

interface Props {
  root: Root,
}

const ReactHast = ({ root }: Props): JSX.Element => createElement(
  Fragment, {}, ...root.children.map((child) => 
    child.type === 'doctype' ? null : processElementContent(child)
  ));

export default ReactHast;
