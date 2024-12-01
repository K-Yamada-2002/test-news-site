import React from "react";
import { graphql, Link } from "gatsby";

const IndexPage = ({ data }) => {
  const articles = data.allMarkdownRemark.edges;

  return (
    <main>
      <h1>ニュースサイト</h1>
      <ul>
        {articles.map(({ node }) => (
          <li key={node.id}>
            <Link to={`/news/${node.frontmatter.slug}`}>
              <h2>{node.frontmatter.title}</h2>
            </Link>
            <p>{node.excerpt}</p>
          </li>
        ))}
      </ul>
    </main>
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
          }
          excerpt
        }
      }
    }
  }
`;

export default IndexPage;