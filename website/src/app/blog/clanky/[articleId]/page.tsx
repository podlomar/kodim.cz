import React, { type JSX } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/cs';
import { cache } from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next'
import { openGraph } from 'app/open-graph';
import { cms } from 'lib/cms';
import { Article } from 'kodim-cms/esm/content/article';
import ArticleContent from 'app/components/ArticleContent/intex';
import Breadcrumbs from 'app/components/Breadcrumbs';
import { session } from 'app/session';
import { CmsAgent } from 'kodim-cms/esm/access-control/claim-agent';
import ReactHast from 'app/components/ReactHast';
import MainLayout from 'app/components/MainLayout';
import styles from './styles.module.scss';
import InfoBox from 'app/components/InfoBox';
import Styles from 'app/components/Styles';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    articleId: string;
  }>
}

const getArticle = cache(
  async (
    cmsAgent: CmsAgent,
    articleId: string,
  ): Promise<Article | null> => (
    cms().loadBlogArticle(cmsAgent, articleId)
  )
);

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const { articleId } = params;
  const { cmsAgent } = await session();
  const article = await getArticle(cmsAgent, articleId);

  if (article === null) {
    notFound();
  }

  return {
    title: article.title,
    description: article.lead,
    openGraph: {
      ...openGraph,
      type: 'article',
      title: article.title,
      description: article.lead,
      url: article.path,
    },
  }
}

const BlogArticlePage = async (props: Props): Promise<JSX.Element> => {
  const params = await props.params;
  const { articleId } = params;
  const { cmsAgent } = await session();
  const article = await getArticle(cmsAgent, articleId);
  if (article === null) {
    notFound();
  }

  const articleDate = dayjs(article.date).locale('cs').format('D. MMMM YYYY');

  return (
    <MainLayout showBrand>
      <div className="container">
        <Breadcrumbs crumbs={article.crumbs.slice(0, -1)} />
        <div className={styles.article}>
          <ArticleContent>
            <div className={styles.articleInfo}>
              <div className={styles.articleAuthor}>
                <img
                  className={styles.authorAvatar}
                  src={article.author.avatar ?? '/img/avatar.svg'}
                  alt={article.author.name}
                />
                {article.author.link === undefined
                  ? <span>{article.author.name}</span>
                  : <a href={article.author.link}>{article.author.name}</a>
                }
              </div>
              <span>{articleDate}</span>
            </div>
            <h1>{article.title}</h1>
            <div className={styles.articleLead}>{article.lead}</div>
            <Styles css={article.styles} />
            <ReactHast root={article.content} />
          </ArticleContent>
        </div>
        <InfoBox icon="newsletter">
          <p>
            Přihlaste se k odběru novinek a nezmeškejte žádný nový kurz, článek nebo akci.
          </p>
          <a href="/odber?topic=Články na blogu" className="btnBig">Přihlásit k odběru</a>
        </InfoBox>
      </div>
    </MainLayout>
  );
};

export default BlogArticlePage
