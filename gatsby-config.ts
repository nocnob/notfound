import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  graphqlTypegen: true,
  siteMetadata: {
    siteUrl: "https://notfound.cn",
    title: "NotFound",
    description: "千里之行，始于足下",
  },
  plugins: [
    {
      resolve: "gatsby-plugin-baidu-analytics",
      options: {
        siteId: "2d5af1caa5dda0e60763cc156cf0ce5d",
        head: false,
      },
    },
    "gatsby-plugin-image",
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-transformer-asciidoc",
      options: {
        attributes: {
          icons: "font",
          showtitle: false,
        },
      },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "posts",
        path: "./src/pages/posts",
      },
      __key: "posts",
    },
  ],
};

export default config;
