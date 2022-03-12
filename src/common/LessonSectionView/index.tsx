import { JsmlAttrs, JsmlNode } from 'kodim-cms/esm/jsml';
import { ReactNode, createElement } from 'react';
import { useParams } from 'react-router-dom';
import { ServerAppContext, useData } from '../AppContext';
import ContentAlert from '../ContentAlert';
import ExerciseError from '../ExerciseError';
import ExerciseView from '../ExerciseView';
import JsmlContainer from '../JsmlContainer';
import { JsmlComponents } from '../JsmlContainer/components';
import SiblingLink from '../SiblingLink';
import './styles.scss';

const components: JsmlComponents = {
  exc(tag: string, attrs: JsmlAttrs, children: JsmlNode[]): ReactNode {
    return createElement(
      ExerciseView,
      {
        num: Number(attrs.num),
        title: String(attrs.title),
        demand: Number(attrs.demand),
        path: String(attrs.path),
        hasSolution: Boolean(attrs.hasSolution),
        jsml: children,
      },
    );
  },
  excerr(tag: string, attrs: JsmlAttrs): ReactNode {
    return createElement(ExerciseError, { link: String(attrs.link) });
  },
};

interface Props {
  sectionLink: string;
}

const fetchSection = async (
  { cms, accessCheck }: ServerAppContext,
  courseLink: string,
  chapterLink: string,
  lessonLink: string,
  sectionLink: string,
) => cms.getRoot(accessCheck)
  .find(courseLink)
  .find(chapterLink)
  .find(lessonLink)
  .find(sectionLink)
  .fetch();

const LessonSectionView = ({ sectionLink }: Props) => {
  const params = useParams();
  const section = useData(
    [
      'root',
      params.courseLink!,
      params.chapterLink!,
      params.lessonLink!,
      sectionLink,
    ],
    (serverContext: ServerAppContext) => fetchSection(
      serverContext,
      params.courseLink!,
      params.chapterLink!,
      params.lessonLink!,
      sectionLink,
    ),
  );

  if (section.status === 'not-found') {
    return <article />;
  }

  if (section.status === 'forbidden') {
    return <article />;
  }

  return (
    <>
      {section.content.type === 'broken'
        ? (
          <ContentAlert type="error" title="Špatný formát sekce">
            <p>Lekce nejspíš odkazuje na neexistující sekci.</p>
          </ContentAlert>
        ) : <JsmlContainer components={components} jsml={section.content.jsml} />}

      {section.content.type === 'broken' ? null : (
        <div className="section-navlinks">
          {section.content.prev === null ? <div /> : (
            <SiblingLink
              entryRef={section.content.prev}
              direction="backward"
              label="předchozí"
              text={section.content.prev.title}
              iconColor="gray"
            />
          )}
          {section.content.next === null ? <div /> : (
            <SiblingLink
              entryRef={section.content.next}
              direction="forward"
              label="následující"
              text={section.content.next.title}
              iconColor="gray"
            />
          )}
        </div>
      )}
    </>
  );
};

export default LessonSectionView;
