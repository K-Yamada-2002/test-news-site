/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Humanoid News`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", "gatsby-transformer-remark", {
    resolve: 'gatsby-plugin-google-gtag',
    options: {
      trackingIds: [
        "GA-TRACKING_ID", // Google Analytics / GA
        "AW-CONVERSION_ID", // Google Ads / Adwords / AW
        "DC-FLOODIGHT_ID", // Marketing Platform advertising products (Display & Video 360, Search Ads 360, and Campaign Manager)
      ]
    },
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "content",
      "path": "./src/content/"
    },
    __key: "content"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "styles",
      "path": "./src/styles/"
    },
    __key: "styles"
  }, {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 600, // 画像の最大幅
    },
  },]
};