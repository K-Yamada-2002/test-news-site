import React from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { graphql, Link } from "gatsby";
import "./ArticleTemplate.css";

import Layout from "/src/components/Layout";

const ArticleTemplate = ({ data }) => {
  const { markdownRemark } = data;
  const { frontmatter, html } = markdownRemark;
  const thumbnail = getImage(frontmatter.thumbnail);

  // 最新記事と関連記事
  const latestArticles =  data.latest.edges;
  const relatedArticles = data.related.edges;

  return (
    <Layout>
      {/* 左サイドバー：最新記事 */}
      <aside className="sidebar latest-articles">
        <h3>最新記事</h3>
        <ul>
          {latestArticles.map((article, index) => (
            <li key={index}>
              <Link to={`/news/${article.node.frontmatter.slug}`}>{article.node.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </aside>

      {/* 中央の本文 */}
      <main className="article-content">
        <h1>{frontmatter.title}</h1>
        <p className="date">{frontmatter.date}</p>
        <div className="thumbnail-wrapper">
          <GatsbyImage 
            className="thumbnail" 
            image={thumbnail} 
            alt={`${frontmatter.title}のサムネイル`} 
          />
        </div>
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
              <Link to={`/news/${article.node.frontmatter.slug}`}>{article.node.frontmatter.title}</Link>
            </li>
          ))}
        </ul>
      </aside>
    </Layout>
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