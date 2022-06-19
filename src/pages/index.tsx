import { graphql, PageProps } from "gatsby";
import React from "react";
import Layout from "../components/layout";
import Posts from "../components/posts";

const IndexPage = ({ data }: PageProps<Queries.lastPostsQuery>) => {
  const posts = data.allAsciidoc.nodes;
  return (
    <Layout>
      <h1>概览</h1>
      <br />
      <Posts posts={posts} />
    </Layout>
  );
};

export default IndexPage;

export const lastPostsQuery = graphql`
  query lastPosts {
    allAsciidoc(
      sort: { fields: revision___date, order: DESC }
      filter: { pageAttributes: { draft: { ne: "true" } } }
      limit: 5
    ) {
      nodes {
        id
        document {
          main
          subtitle
          title
        }
        pageAttributes {
          category
          draft
          slug
        }
        revision {
          date
          number
          remark
        }
      }
    }
  }
`;
