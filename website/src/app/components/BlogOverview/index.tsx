import React from "react";
import BlogArticleCard from "../BlogArticleCard";
import { BlogSite } from "kodim-cms/esm/content/site";
import styles from "./styles.module.scss";

interface Props {
  site: BlogSite;
}

const BlogOverview = ({ site }: Props): JSX.Element => {
  return (
    <div className={styles.articles}>
      {site.articles.map((article) => (
        article.draft ? null : <BlogArticleCard key={article.name} article={article} />
      ))}
    </div>
  );
};

export default BlogOverview;
