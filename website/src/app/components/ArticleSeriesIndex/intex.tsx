import { type JSX } from "react";
import clsx from "clsx";
import { Article } from "kodim-cms/esm/content/article";
import styles from "./styles.module.scss";

interface Props {
  currentLink: string;
  seriesIndex: NonNullable<Article['seriesIndex']>;
}

const ArticleSeriesIndex = ({ currentLink, seriesIndex }: Props): JSX.Element => {
  const { title, lead, parts } = seriesIndex;

  return (
    <div className={styles.seriesIndex}>
      <p>Tento článek je součástí série <i>{title} &ndash; {lead}</i></p>
      <div className={styles.seriesIndexList}>
        {parts.map((item, index) => (
          <div key={index} className={styles.seriesIndexItem}>
            <div
              className={
                clsx(
                  styles.itemNumber,
                  item.link === currentLink && styles.numberCurrent,
                )
              }
            >
              {index + 1}
            </div>
            {item.link === currentLink ? (
              <div className={styles.itemTitleCurrent}><i>{item.title}</i>: {item.lead}</div>
            ) : (
              <div><a href={item.link}>{item.title}</a>: {item.lead}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
};

export default ArticleSeriesIndex;
