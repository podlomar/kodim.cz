import { ReactNode, createElement, Fragment } from 'react';
import {
  Jsml,
  JsmlNode,
  getTag,
  getAttrs,
  getChildren,
  isElement,
} from 'kodim-cms/esm/jsml.js';
import { JsmlComponents, baseJsmlComponents } from './components';

export const renderJsmlNode = (components: JsmlComponents, node: JsmlNode): ReactNode => {
  if (!isElement(node)) {
    return node;
  }

  const tag = getTag(node);
  const attrs = getAttrs(node);
  const children = getChildren(node);

  const component = components[tag];

  if (component === undefined) {
    return createElement(
      tag,
      attrs,
      ...children.map((child) => renderJsmlNode(components, child)),
    );
  }

  return component(tag, attrs, children);
};

interface Props {
  components?: JsmlComponents,
  jsml: Jsml,
}

const JsmlContainer = ({ components, jsml }: Props): JSX.Element => createElement(
  Fragment,
  null,
  ...jsml.map(
    (node) => renderJsmlNode({
      ...baseJsmlComponents,
      ...components,
    }, node),
  ),
);

export default JsmlContainer;
