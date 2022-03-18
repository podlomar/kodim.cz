import './styles.scss';

interface Props {
  navElement: React.ReactNode,
  children: React.ReactNode,
}

const ArticleContent = ({ navElement, children }: Props) => {
  return (
    <div className="container article-content ">
      <aside className="article-content__nav">
        {navElement}
      </aside>
      <div className="article-content__section">
        {children}
      </div>
    </div>
  );
};

export default ArticleContent;
