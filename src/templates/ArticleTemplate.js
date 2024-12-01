import React from "react";
import { graphql, Link } from "gatsby";
// import "./ArticleTemplate.css";

const ArticleTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;

  // 最新記事と関連記事（仮データとして使用）
  const latestArticles = [
    { title: "最新記事1", slug: "/news/latest-1" },
    { title: "最新記事2", slug: "/news/latest-2" },
  ];

  const relatedArticles = [
    { title: "関連記事1", slug: "/news/related-1" },
    { title: "関連記事2", slug: "/news/related-2" },
  ];

  return (
    <div className="article-page">
      {/* グローバルナビゲーション */}
      <header className="global-header">
        <nav className="navigation">
          <Link to="/">ホーム</Link>
          <Link to="/about">サイトについて</Link>
          <Link to="/categories">カテゴリ</Link>
        </nav>
        <div className="search-bar">
          <input type="text" placeholder="検索..." />
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="content-wrapper">
        {/* 左サイドバー：最新記事 */}
        <aside className="sidebar latest-articles">
          <h3>最新記事</h3>
          <ul>
            {latestArticles.map((article, index) => (
              <li key={index}>
                <Link to={article.slug}>{article.title}</Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* 中央の本文 */}
        <main className="article-content">
          <h1>{frontmatter.title}</h1>
          <p className="date">{frontmatter.date}</p>
          <div
            className="article-body"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </main>

        {/* 右サイドバー：関連記事 */}
        <aside className="sidebar related-articles">
          <h3>関連記事</h3>
          <ul>
            {relatedArticles.map((article, index) => (
              <li key={index}>
                <Link to={article.slug}>{article.title}</Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* フッター */}
      <footer className="global-footer">
        <p>© 2024 ヒューマノイドニュース. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
      }
      html
    }
  }
`;

export default ArticleTemplate;