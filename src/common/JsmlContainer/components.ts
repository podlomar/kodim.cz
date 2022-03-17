import { unescape } from 'html-escaper';
import { ReactNode, createElement } from 'react';
import { JsmlAttrs, JsmlNode } from 'kodim-cms/esm/jsml.js';
import YouTubeVideo from '../YouTubeVideo';
// import ExerciseView from '../ExerciseView';
import Figure from '../Figure';
import Term from '../Term';
import CodePen from '../CodePen';

export interface JsmlComponents {
  [name: string]: (tag: string, attrs: JsmlAttrs, children: JsmlNode[]) => ReactNode;
}

export const baseJsmlComponents: JsmlComponents = {
  youtube(tag: string, attrs: JsmlAttrs): ReactNode {
    return createElement(YouTubeVideo, { uid: String(attrs.uid) });
  },
  codepen(tag: string, attrs: JsmlAttrs): ReactNode {
    return createElement(CodePen, {
      user: String(attrs.user), id: String(attrs.id), tab: String(attrs.tab),
    });
  },
  term(tag: string, attrs: JsmlAttrs): ReactNode {
    return createElement(Term, { cs: String(attrs.cs), en: String(attrs.en) });
  },
  fig(tag: string, attrs: JsmlAttrs): ReactNode {
    return createElement(
      Figure,
      {
        src: String(attrs.src),
        size: Number(attrs.size),
        alt: String(attrs.alt),
      },
    );
  },
  code(tag: string, attrs: JsmlAttrs, children: JsmlNode[]): ReactNode {
    return createElement(
      tag,
      attrs,
      children.map((node) => unescape(String(node))),
    );
  },
};
