import React from "react"
import dayjs from "dayjs"
import 'dayjs/locale/cs';
import Link from "next/link";
import { ArticleNavItem } from "kodim-cms/esm/content/article";
import styles from "./styles.module.scss";

interface Props {
  article: ArticleNavItem;
}

const BlogArticleCard = ({ article }: Props): JSX.Element => {
  const articleDate = dayjs(article.date).locale('cs').format("D. MMM YYYY");
  
  return (
    <div className={styles.lessonCard}>
      <div className={styles.main}>
        <Link href={article.path} className={styles.titleLink}>
          <h2 className={styles.title}>{article.title}</h2>
        </Link>
        <div className={styles.lead}>{article.lead}</div>
        <div className={styles.info}>
          <div className={styles.author}>
            <img
              className={styles.authorAvatar}
              src={article.author.avatar ?? '/img/avatar.svg'}
              alt={article.author.name}
            />
            <span>{article.author.name}</span>
          </div>
          <span>{articleDate}</span>
        </div>
      </div>
    </div>
  );
};

export default BlogArticleCard;
