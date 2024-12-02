/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Humanoid News`,
    siteUrl: `https://www.yourdomain.tld`
  },
  plugins: ["gatsby-plugin-image", "gatsby-plugin-sitemap", "gatsby-plugin-mdx", "gatsby-plugin-sharp", "gatsby-transformer-sharp", 
    {
    resolve: 'gatsby-transformer-remark', 
    options: {
      excerpt_separator: `<!-- end -->`, 
    },
  }, {
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
      "name": "content",
      "path": "./src/content/"
    },
    __key: "content"
  }, {
    resolve: `gatsby-remark-images`,
    options: {
      maxWidth: 600, // 画像の最大幅
    },
  }, {
    resolve: `gatsby-plugin-manifest`,
    options: {
      name: `Humanoid News`,
      short_name: `Humanoid News`,
      start_url: `/`,
      background_color: `#ffffff`,
      theme_color: `#333333`,
      display: `standalone`,
      icon: `static/favicon.jpg`, // ファビコン画像のパス
    },
  },
  `gatsby-plugin-react-helmet`, // ページごとにメタデータを設定可能にする]
  ]
};