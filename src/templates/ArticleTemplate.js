import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, Link } from "gatsby";
// import "./ArticleTemplate.css";

const ArticleTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const thumbnail = getImage(frontmatter.thumbnail);

  // 最新記事と関連記事
  const latestArticles =  data.latest.edges;
  const relatedArticles = data.related.edges;

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
                <Link to={article.node.frontmatter.slug}>{article.node.frontmatter.title}</Link>
              </li>
            ))}
          </ul>
        </aside>

        {/* 中央の本文 */}
        <main className="article-content">
          <h1>{frontmatter.title}</h1>
          <p className="date">{frontmatter.date}</p>
          {thumbnail && (
            <GatsbyImage image={thumbnail} alt={`${frontmatter.title}のサムネイル`} />
          )}
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
                <Link to={article.node.frontmatter.slug}>{article.node.frontmatter.title}</Link>
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
  query($slug: String!, $tags: [String!]!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date(formatString: "YYYY-MM-DD")
        thumbnail {
          childImageSharp {
            gatsbyImageData(width: 800, layout: CONSTRAINED)
          }
        }
      }
      html
    }
    latest: allMarkdownRemark(
      sort: {frontmatter: {date: DESC}},
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
            date(formatString: "YYYY-MM-DD")
          }
        }
      }
    }
    related: allMarkdownRemark(
      filter: { frontmatter: { tags: { in: $tags } } }, 
      limit: 5
    ) {
      edges {
        node {
          frontmatter {
            title
            slug
          }
        }
      }
    }
  }
`;

export default ArticleTemplate;