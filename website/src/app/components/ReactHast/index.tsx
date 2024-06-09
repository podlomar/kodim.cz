import { ReactNode, createElement, Fragment } from 'react';
import { Root, ElementContent } from 'hast';
import Figure from './components/Figure';
import Term from './components/Term';
import Box from './components/Box';
import { style2object } from './style2object';
import { find, html, hastToReact } from 'property-information';

type ComponentMap = { [TagName: string]: React.FunctionComponent<any> };

const componentMap: ComponentMap = {
  'fig': Figure,
  'term': Term,
  'box': Box,
};

const processElementContent = (elementContent: ElementContent): ReactNode => {
  if (elementContent.type === 'comment') {
    return null;
  }

  if (elementContent.type === 'text') {
    return elementContent.value;
  }

  const { tagName, properties, children } = elementContent;
  const style = properties !== undefined && 'style' in properties
    ? style2object(properties.style as string)
    : undefined;

  if (properties !== undefined) {
    const keys = Object.keys(properties);
    for (const key of keys) {
      const value = properties[key];
      if (key in hastToReact) {
        const prop = hastToReact[key];
        delete properties[key];
        properties[prop] = value;
      } else {
        const { attribute } = find(html, key);
        delete properties[key];
        properties[attribute] = value;
      }
    }
  }

  if (tagName in componentMap) {
    const Component = componentMap[tagName];
    return createElement(
      Component, { ...properties, style }, ...children.map(processElementContent)
    );
  }

  return createElement(
    tagName,
    { ...properties, style },
    ...children.map(processElementContent),
  );
};

interface Props {
  root: Root,
}

const ReactHast = ({ root }: Props): JSX.Element => {
  return createElement(
    Fragment, {}, ...root.children.map((child) => 
      child.type === 'doctype' ? null : processElementContent(child)
    )
  );
}

export default ReactHast;
