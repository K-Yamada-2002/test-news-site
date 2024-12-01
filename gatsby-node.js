exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
      query {
        allMarkdownRemark {
          edges {
            node {
              frontmatter {
                slug
                tags
              }
            }
          }
        }
      }
    `);
  
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: `/news/${node.frontmatter.slug}`,
        component: require.resolve(`./src/templates/ArticleTemplate.js`),
        context: {
          slug: node.frontmatter.slug,
          tags: node.frontmatter.tags,
          thumbnail: node.frontmatter.thumbnail,
        },
      });
    });
  };