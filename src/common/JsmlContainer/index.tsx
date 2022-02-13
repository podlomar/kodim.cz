import { ReactNode, createElement } from 'react';
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
      children.length > 0 ? children.map(
        (child) => renderJsmlNode(components, child),
      ) : undefined,
    );
  }

  return component(tag, attrs, children);
};

export const renderJsml = (components: JsmlComponents, jsml: Jsml): ReactNode[] => jsml.map(
  (node) => renderJsmlNode(components, node),
);

interface Props {
  components?: JsmlComponents,
  jsml: Jsml,
}

const JsmlContainer = ({ components, jsml }: Props): JSX.Element => (
  <>
    {
      renderJsml({
        ...baseJsmlComponents,
        ...components,
      }, jsml)
    }
  </>
);

export default JsmlContainer;
