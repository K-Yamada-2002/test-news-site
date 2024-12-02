import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import "./index.css";

import Layout from "/src/components/Layout";

const IndexPage = ({ data }) => {
  const articles = data.allMarkdownRemark.edges;

  return (
    <Layout>
      {/* 記事一覧 */}
      <div className="article-grid">
          {articles.map(({ node }) => {
            const thumbnail = getImage(node.frontmatter.thumbnail);
            return (
              <div key={node.frontmatter.slug} className="article-card">
              <Link to={`/news/${node.frontmatter.slug}`} className="article-link">
                {/* サムネイル画像 */}
                <div className="thumbnail-wrapper">
                  <GatsbyImage className="thumbnail" image={thumbnail} alt={`${node.frontmatter.title}のサムネイル`} />
                </div>
                <h2>{node.frontmatter.title}</h2>
                <p className="date">{node.frontmatter.date}</p>
                <p className="excerpt">{node.frontmatter.summary}</p>
              </Link>
            </div>
            );
          })}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark(sort: {frontmatter: {date: DESC}}) {
      edges {
        node {
          id
          frontmatter {
            title
            slug
            date
            thumbnail {
              childImageSharp {
                gatsbyImageData(width: 400, layout: CONSTRAINED)
              }
            }
            summary
          }
        }
      }
    }
  }
`;

export default IndexPage;