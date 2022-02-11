import { ReactNode, createElement } from 'react';
import { 
  Jsml,
  JsmlNode,
  getTag, 
  getAttrs, 
  getChildren, 
  isElement, 
} from 'kodim-cms/esm/jsml.js';
import YouTubeVideo from '../YouTubeVideo';
import ExerciseView from '../ExerciseView';
import Figure from '../Figure';
import { unescape } from 'html-escaper';
import Term from '../Term';
import { emitKeypressEvents } from 'readline';
import CodePen from '../CodePen';

export const renderJsmlNode = (node: JsmlNode): ReactNode => {
  if (!isElement(node)) {
    return node;
  }

  const children = getChildren(node);
  const tag = getTag(node);
  const attrs = getAttrs(node);

  if (tag === 'youtube') {
    return createElement(YouTubeVideo, { uid: String(attrs.uid) });
  }

  if (tag === 'codepen') {
    return createElement(CodePen, { 
      user: String(attrs.user), id: String(attrs.id), tab: String(attrs.tab),
    });
  }

  if (tag === 'term') {
    return createElement(Term, { cs: String(attrs.cs), en: String(attrs.en) });
  }

  if (tag === 'exc') {
    return createElement(
      ExerciseView, 
      { 
        num: Number(attrs.num),
        title: String(attrs.title),
        demand: Number(attrs.demand),
        path: String(attrs.path),
        hasSolution: Boolean(attrs.hasSolution),
        jsml: getChildren(node),
      }
    ) 
  }

  if (tag === 'fig') {
    return createElement(
      Figure,
      { 
        src: String(attrs.src),
        size: Number(attrs.size ?? 100),
        alt: String(attrs.alt)
      }
    ) 
  }

  if (tag === 'code') {
    return createElement(
      tag,
      attrs,
      children.map((node) => unescape(String(node)))
    );
  }
  
  return createElement(
    tag,
    attrs,
    children.length > 0 ? children.map(renderJsmlNode) : undefined,
  )
}

export const renderJsml = (jsml: Jsml): ReactNode[] => jsml.map(renderJsmlNode);