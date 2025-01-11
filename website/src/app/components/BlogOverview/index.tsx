import React, { type JSX } from "react";
import styles from "./styles.module.scss";
import { BlogDivision } from "kodim-cms/esm/content/blog-division";
import BlogArticleCard from "../BlogArticleCard";

interface Props {
  division: BlogDivision;
}

const BlogOverview = ({ division }: Props): JSX.Element => {
  return (
    <div className={styles.articles}>
      {division.articles.map((article) => (
        article.draft ? null : <BlogArticleCard key={article.name} article={article} />
      ))}
    </div>
  );
};

export default BlogOverview;
